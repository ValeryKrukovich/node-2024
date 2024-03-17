const csvFilePath = './csv/input.csv';
const txtFilePath = './csv/output.txt';

import fs from 'fs';
import csvtojson from 'csvtojson';

// Create a read stream for the CSV file
const readStream = fs.createReadStream(csvFilePath, { encoding: 'utf8' });

// Create a write stream for the TXT file
const writeStream = fs.createWriteStream(txtFilePath, { encoding: 'utf8' });

// Convert CSV to JSON line by line and write to TXT file
csvtojson()
  .fromStream(readStream)
  .subscribe(
    (jsonObj) => {
      // Convert JSON object to string and write to TXT file
      writeStream.write(JSON.stringify(jsonObj) + '\n');
    },
    (error) => {
      console.error('Error reading CSV:', error);
    },
    () => {
      // Close write stream when finished
      writeStream.end();
      console.log('Conversion completed successfully.');
    }
  );
