exports.routes = [
    {
        method: 'POST',
        path: '/courseapply/audit.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
        method: 'POST',
        path: '/courseapply/list.json',
        handler: function (request, reply) {
            return reply(require('./json/courseapply/list.json'));
        }
    }
];