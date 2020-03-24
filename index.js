const fs = require('fs');
const http = require('http');
const contentTypes = {
  'css': 'text/css',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'png': 'image/png',
  'js': 'application/javascript'
};

const httpServer = http.createServer(function(req, res) {
  server(req, res);
}).listen(process.env.PORT || 5000);

const server = function(req, res) {
  const contentType = req.url.split('.').pop();

  if (contentTypes[contentType]){
    const filename = req.url.split('/').pop();

    fs.readFile('dist/coronavirus-tracker/' + (req.url.split('/')[1] === 'assets' ? 'assets/' : '') + filename, function(err, content) {
      if (err) {
        throw new Error(err);
      } else {
        res.writeHeader(200, {'Context-Type': contentTypes[contentType]});
        res.write(content);
        res.end();
      }
    });
  } else {
    fs.readFile('dist/coronavirus-tracker/index.html', function(err, html) {
      if (err) {
        throw new Error(err);
      } else {
        res.writeHeader(200, {'Context-Type': contentTypes.html});
        res.write(html);
        res.end();
      }
    });
  }
}
