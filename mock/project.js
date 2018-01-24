/**
 * @fileOverview project api
 */

exports.routes = [
	{
		method: 'POST',
        path: '/project/projectCategory.json',
        handler: function (request, reply) {
            return reply(require('./json/project/projectCategory.json'));
        }
    }
];