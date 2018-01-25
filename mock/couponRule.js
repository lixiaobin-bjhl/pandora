/**
 * @fileOverview couponRule api
 */

exports.routes = [
	{
		method: 'POST',
        path: '/couponRule/list.json',
        handler: function (request, reply) {
            return reply(require('./json/couponRule/list.json'));
        }
    },
    {
		method: 'POST',
        path: '/couponRule/save.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
		method: 'POST',
        path: '/couponRule/delete.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
		method: 'POST',
        path: '/couponRule/checkRepeat.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    }
];