exports.routes = [
    {
        method: 'POST',
        path: '/lesson/list.json',
        handler: function (request, reply) {
            return reply(require('./json/lesson/list.json'));
        }
    }
];