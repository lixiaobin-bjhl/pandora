/**
 * @fileOverview mock数据服务器
 */

const Hapi = require('hapi');
const routes = require('../mock/routes').routes;
const dataServer = new Hapi.Server();

dataServer.connection({
    host: 'localhost',
    port: '5001'
});

dataServer.route(routes);

dataServer.start((err) => {
    console.log('Server started at:' + dataServer.info.uri);
});