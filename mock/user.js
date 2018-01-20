exports.routes = [
    {
        method: 'POST',
        path: '/user/list.json',
        handler: function (request, reply) {
            console.log(request);
            var payload = request.payload;
            if (payload.roleType == 2) {
                return reply(require('./json/teacher/list.json'));
            } else {
                return reply(require('./json/user/list.json'));
            }
        }
    },
    {
        method: 'POST',
        path: '/user/modifyStatus.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
        method: 'POST',
        path: '/user/reset.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
        method: 'POST',
        path: '/user/saveOrUpdate.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
        method: 'POST',
        path: '/user/detail.json',
        handler: function (request, reply) {
            return reply(require('./json/user/detail.json'));
        }
    }
];