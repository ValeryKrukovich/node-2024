const http = require('http');
const { v4: uuidv4 } = require('uuid');

// Хранилище пользователей
let users = [];

// Создание HTTP-сервера
const server = http.createServer((req, res) => {
  // Установка заголовков для CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обработка запросов
  if (req.url === '/api/users' && req.method === 'GET') {
    // Возвращаем список пользователей
    const responseData = users.map(user => ({
      user,
      links: {
        self: `/api/users/${user.id}`,
        hobbies: `/api/users/${user.id}/hobbies`
      }
    }));
    const response = {
      data: responseData,
      error: null
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
  } else if (req.url === '/api/users' && req.method === 'POST') {
    // Создаем нового пользователя
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { name, email } = JSON.parse(body);
      if (!name || !email) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Name and email are required' }));
        return;
      }
      const newUser = {
        id: uuidv4(),
        name,
        email,
        hobbies: []
      };
      users.push(newUser);
      const response = {
        data: {
          user: newUser,
          links: {
            self: `/api/users/${newUser.id}`,
            hobbies: `/api/users/${newUser.id}/hobbies`
          }
        },
        error: null
      };
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    });
  } else if (req.url.match(/\/api\/users\/([^\/]+)$/)) {
    const userId = req.url.split('/')[3];
    const user = users.find(user => user.id === userId);
    if (req.method === 'DELETE') {
      // Удаляем пользователя по ID
      if (user) {
        users = users.filter(user => user.id !== userId);
        const response = {
          data: {
            success: true
          },
          error: null
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
      }
    } else if (req.url === `/api/users/${userId}/hobbies` && req.method === 'GET') {
      // Возвращаем список хобби для пользователя
      const response = {
        data: {
          hobbies: user ? user.hobbies : [],
          links: {
            self: `/api/users/${userId}/hobbies`,
            user: `/api/users/${userId}`
          }
        },
        error: null
      };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    } else if (req.url === `/api/users/${userId}/hobbies` && req.method === 'PATCH') {
      // Обновляем хобби пользователя
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const { hobbies } = JSON.parse(body);
        if (!user || !Array.isArray(user.hobbies)) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'User not found or hobbies not initialized' }));
          return;
        }
        if (!hobbies || !Array.isArray(hobbies) || hobbies.length === 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Hobbies array is required' }));
          return;
        }
        hobbies.forEach(hobby => {
          if (!user.hobbies.includes(hobby)) {
            user.hobbies.push(hobby);
          }
        });
        const response = {
          data: {
            hobbies: user.hobbies
          },
          error: null
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
      });
    }
  } else {
    // Не найден маршрут
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

// Слушаем порт 8000
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
