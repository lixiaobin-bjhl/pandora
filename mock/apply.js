exports.routes = [
    {
        method: 'POST',
        path: '/apply/list.json',
        handler: function (request, reply) {
            return reply(require('./json/apply/list.json'));
        }
    }
];