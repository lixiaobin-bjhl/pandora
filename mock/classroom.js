exports.routes = [
    {
        method: 'POST',
        path: '/classroom/list.json',
        handler: function (request, reply) {
            return reply(require('./json/classroom/list.json'));
        }
    }
];