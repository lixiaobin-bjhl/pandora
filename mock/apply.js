exports.routes = [
    {
        method: 'POST',
        path: '/apply/list.json',
        handler: function (request, reply) {
            return reply(require('./json/apply/list.json'));
        }
    },
    {
        method: 'POST',
        path: '/apply/audit.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
        method: 'POST',
        path: '/apply/add.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
        method: 'POST',
        path: '/audit/list.json',
        handler: function (request, reply) {
            return reply(require('./json/apply/auditList.json'));
        }
    },
    {
        method: 'POST',
        path: '/apply/apply.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
        method: 'POST',
        path: '/apply/reApply.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    }
];