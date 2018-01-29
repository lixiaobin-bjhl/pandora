/**
 * @file mock router
 */

'use strict';

var routesConfig = [
    require('./api'),
    require('./user'),
    require('./project'),
    require('./coupon'),
    require('./couponRule'),
    require('./couponActivity'),
    require('./patient'),
    require('./carePlan')
];

var routes = [];

for (var i = 0, l = routesConfig.length; i < l; i++) {
    routes = routes.concat(routesConfig[i].routes);
}

exports.routes = routes;