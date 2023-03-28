const http = require('http');
const url = require('url');
const querystring = require('querystring');
const jsonp = require('jsonp');

const server = http.createServer((req, res) => {
  const params = querystring.parse(url.parse(req.url).query);
  const callback = params.callback;
  const data = { name: 'John', age: 30 };
  jsonp(data, { param: 'callback' }, (err, result) => {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.end('Internal server error');
      return;
    }
    const response = callback + '(' + JSON.stringify(result) + ')';
    res.setHeader('Content-Type', 'text/javascript');
    res.end(response);
  });
});

// const server = http.createServer((request, response) => {
//   if (request.method === 'POST' && request.url === '/save_data') {
//     let body = '';

//     request.on('data', chunk => {
//       body += chunk.toString();
//     });

//     request.on('end', () => {
//       const data = JSON.parse(body).data;
//       console.log(data);

//       response.writeHead(200, { 'Content-Type': 'text/plain' });
//       response.end('Data saved successfully');
//     });
//   } else {
//     response.writeHead(404, { 'Content-Type': 'text/plain' });
//     response.end('404 Not Found');
//   }
// });

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});