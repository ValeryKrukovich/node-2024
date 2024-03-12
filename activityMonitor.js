const { exec } = require('child_process');
const fs = require('fs');

const logFilePath = 'activityMonitor.log';
const refreshRate = 100; // 10 times per second
const logInterval = 60000; // Once per minute

function getSystemInfo(callback) {
  const command = process.platform === 'win32'
    ? 'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"'
    : 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
  
  exec(command, (error, stdout) => {
    if (error) {
      console.error('Error retrieving system information:', error.message);
      callback(null);
      return;
    }

    const output = stdout.toString().trim();

    if (!output) {
      console.error('Empty output from shell command.');
      callback(null);
      return;
    }

    const [processName, cpu, memory] = output.split(' ');

    const systemInfo = {
      processName: processName.trim(),
      cpu: parseFloat(cpu),
      memory: parseFloat(memory),
    };

    callback(systemInfo);
  });
}

function logSystemInfo(info) {
  const timestamp = Math.floor(Date.now() / 1000);
  const logMessage = `${timestamp} : ${info.processName} - CPU: ${info.cpu}%, Memory: ${info.memory.toFixed(2)}%`;

  try {
    fs.appendFileSync(logFilePath, logMessage + '\n', { flag: 'a+' });
  } catch (error) {
    console.error('Error writing to the log file:', error.message);
  }
}

function updateDisplay() {
  getSystemInfo((systemInfo) => {
    if (systemInfo) {
      process.stdout.write(`\r${systemInfo.processName} - CPU: ${systemInfo.cpu}%, Memory: ${systemInfo.memory.toFixed(2)}%`);
      logSystemInfo(systemInfo);
    }

    setTimeout(updateDisplay, refreshRate);
  });
}

// Create log file if it doesn't exist
try {
  fs.writeFileSync(logFilePath, '');
} catch (error) {
  console.error('Error creating the log file:', error.message);
}

// Start updating display
updateDisplay();

// Log system information once per minute
setInterval(() => {
  getSystemInfo((systemInfo) => {
    if (systemInfo) {
      logSystemInfo(systemInfo);
    }
  });
}, logInterval);
