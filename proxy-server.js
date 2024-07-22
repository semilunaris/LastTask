import http from 'http';
import httpProxy from 'http-proxy';

// Создание прокси-сервера
const proxy = httpProxy.createProxyServer({
  secure: false,  // Отключение проверки SSL-сертификатов
  changeOrigin: true  // Изменение заголовка Origin
});

// Обработка ошибок прокси-сервера
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err.message);
  console.error('Request URL:', req.url);
  console.error('Request Headers:', req.headers);

  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end(`Something went wrong while proxying ${req.url}`);
});

// Создание HTTP-сервера
const server = http.createServer((req, res) => {
  // Обработка CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-target-url, x-api-key, Cache-Control');

  // Обработка preflight-запросов
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Извлечение целевого URL из заголовка
  const targetUrl = req.headers['x-target-url'];
  if (!targetUrl) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Missing x-target-url header');
    return;
  }

  console.log(`Proxying request to: ${targetUrl}`);

  // Удаление заголовка x-target-url перед отправкой запроса
  delete req.headers['x-target-url'];

  // Перенаправление всех запросов через прокси на целевой сервер
  proxy.web(req, res, { target: targetUrl });
});

// Запуск сервера на порту 8080
server.listen(8080, () => {
  console.log('Proxy server is running on http://localhost:8080');
});