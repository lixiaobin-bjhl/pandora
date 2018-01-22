/**
 * @fileOverview user api
 */

exports.routes = [
	{
		method: 'POST',
        path: '/user/login.do',
        handler: function (request, reply) {
            return reply(require('./json/api/success'));
        }
	}
];