var express = require('express'),
    app = express(),
    path = require('path');

var config = {
    port: 3000,
    www: path.resolve( __dirname + '/../../client/build'),
    favicon: path.resolve( __dirname + '/../favicon.ico')
};

var app = require('express')(),
   server = require('http').createServer(app);

app.use(express['static'](config.www));
app.use(express.favicon(config.favicon));

server.listen(config.port);

app.get('/', function (req, res) {
    res.sendfile(config.www + '/index.html');
});

var gameserver = require('./Gameserver.js').create(server);
