exports.routes = [
    {
        method: 'POST',
        path: '/teacher/list.json',
        handler: function (request, reply) {
            return reply(require('./json/teacher/list.json'));
        }
    }
];