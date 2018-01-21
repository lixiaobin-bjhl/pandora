exports.routes = [
    {
        method: 'POST',
        path: '/lesson/list.json',
        handler: function (request, reply) {
            return reply(require('./json/lesson/list.json'));
        }
    },
    {
        method: 'POST',
        path: '/lesson/detail.json',
        handler: function (request, reply) {
            return reply(require('./json/lesson/detail.json'));
        }
    },
    {
        method: 'POST',
        path: '/lesson/edit.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
        method: 'POST',
        path: '/lesson/lessonConflict.json',
        handler: function (request, reply) {
            return reply(require('./json/lesson/lessonConflict.json'));
        }
    }
];