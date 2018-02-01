/**
 * @fileOverview couponActivity api
 */

exports.routes = [
	{
		method: 'POST',
        path: '/couponActivity/list.json',
        handler: function (request, reply) {
            return reply(require('./json/couponActivity/list.json'));
        }
    },
    {
		method: 'POST',
        path: '/couponActivity/save.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
		method: 'GET',
        path: '/couponActivity/detail.json',
        handler: function (request, reply) {
            return reply(require('./json/couponActivity/detail.json'));
        }
    },
    {
		method: 'GET',
        path: '/couponActivity/delete.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
		method: 'GET',
        path: '/couponActivity/runActivity.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
		method: 'GET',
        path: '/couponActivity/pauseActivity.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    }
];