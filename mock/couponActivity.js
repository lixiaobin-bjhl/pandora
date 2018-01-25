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
		method: 'POST',
        path: '/couponActivity/detail.json',
        handler: function (request, reply) {
            return reply(require('./json/couponActivity/detail.json'));
        }
    },
    {
		method: 'POST',
        path: '/couponActivity/delete.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
		method: 'POST',
        path: '/couponActivity/runActivity.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
		method: 'POST',
        path: '/couponActivity/pauseActivity.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    }
];