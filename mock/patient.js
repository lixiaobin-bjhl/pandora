/**
 * @fileOverview patient api
 */

exports.routes = [
	{
		method: 'POST',
        path: '/patient/list.json',
        handler: function (request, reply) {
            return reply(require('./json/patient/list.json'));
        }
    },
    {
		method: 'POST',
        path: '/patient/patientSources.json',
        handler: function (request, reply) {
            return reply(require('./json/patient/patientSources.json'));
        }
    },
    {
		method: 'POST',
        path: '/patient/detail.json',
        handler: function (request, reply) {
            return reply(require('./json/patient/detail.json'));
        }
    },
    {
		method: 'POST',
        path: '/patient/update.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
		method: 'POST',
        path: '/patient/addProject.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
		method: 'POST',
        path: '/patient/delPatientProject.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
		method: 'POST',
        path: '/patient/updateProject.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    }
];