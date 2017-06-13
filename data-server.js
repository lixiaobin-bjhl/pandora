/**
 * @fileOverview mock数据服务器
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

var Hapi = require('hapi')
var Inert = require('inert')
var routes = require('./mock/routes').routes
var dataServer = new Hapi.Server();

dataServer.register(Inert, function() {});

dataServer.connection({
    host: '0.0.0.0',
    port: '8183'
})

routes.forEach(function(item) {
    dataServer.route(item);
})

dataServer.start();

console.log('http://127.0.0.1:8183');
