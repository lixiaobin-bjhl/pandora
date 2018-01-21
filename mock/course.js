exports.routes = [
    {
        method: 'POST',
        path: '/course/list.json',
        handler: function (request, reply) {
            return reply(require('./json/course/list.json'));
        }
    },
    {
        method: 'POST',
        path: '/course/updateOnlineStatus.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
        method: 'POST',
        path: '/course/updateTopStatus.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
        method: 'POST',
        path: '/course/detail.json',
        handler: function (request, reply) {
            return reply(require('./json/course/detail.json'));
        }
    },
    {
        method: 'POST',
        path: '/course/add.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
        method: 'POST',
        path: '/course/conflictCheck.json',
        handler: function (request, reply) {
            return reply(require('./json/course/conflictCheck.json'));
        }
    }
];