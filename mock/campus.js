exports.routes = [
    {
        method: 'POST',
        path: '/campus/list.json',
        handler: function (request, reply) {
            return reply(require('./json/campus/list.json'));
        }
    }
];