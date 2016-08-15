/**
*	模块依赖
*/
var express = require('express')
var path = require('path');

var app = express();
var port = process.env.PORT || 3000;

//设置静态文件
app.use(express.static(path.join(__dirname, '/static')));

//设置请求都返回index.html,angularjs的html5模式依赖此项配置
app.use(function(req, res) {
	res.sendFile(path.join(__dirname, '/static/index.html'));
});

//创建一个服务器
var server = app.listen(port, function() {
	console.log("chart room is on port: " + port);
});

var io = require('socket.io').listen(server);

//监听connection事件，如果有客户端连接上来，就会产生一个socket对象
//使用这个对象就可以和客户端通信
io.sockets.on('connection', function(socket) {
	socket.emit('connected');
});
