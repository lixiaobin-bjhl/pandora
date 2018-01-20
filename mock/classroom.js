exports.routes = [
    {
        method: 'POST',
        path: '/classRoom/list.json',
        handler: function (request, reply) {
            return reply(require('./json/classroom/list.json'));
        }
    },
    {
        method: 'POST',
        path: '/classRoom/fuzzyQuery.json',
        handler: function (request, reply) {
            return reply(require('./json/classroom/list.json'));
        }
    },
    {
        method: 'POST',
        path: '/classRoom/modifyStatus.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    }
];