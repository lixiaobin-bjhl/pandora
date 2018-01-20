exports.routes = [
    {
        method: 'POST',
        path: '/school/list.json',
        handler: function (request, reply) {
            return reply(require('./json/campus/list.json'));
        }
    },
    {
        method: 'POST',
        path: '/school/fuzzyQuery.json',
        handler: function (request, reply) {
            return reply(require('./json/campus/fuzzyQuery.json'));
        }
    },
    {
        method: 'POST',
        path: '/school/saveOrUpdate.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
        method: 'POST',
        path: '/school/del.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    }
];