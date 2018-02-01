/**
 * @fileOverview careplan api
 */

exports.routes = [
    {
		method: 'POST',
        path: '/carePlan/delete.json',
        handler: function (request, h) {
        	return h(require('./json/api/success.json'));
        }
    },
    {
        method: 'POST',
        path: '/carePlan/saveOrUpdate.json',
        handler: function (request, h) {
        	return h(require('./json/api/success.json'));
        }
    },
    {
        method: 'POST',
        path: '/carePlan/patientCarePlan.json',
        handler: function (request, h) {
        	return h(require('./json/carePlan/patientCarePlan.json'));
        }
    },
    {
        method: 'POST',
        path: '/carePlan/listProjectCarePlan.json',
        handler: function (request, h) {
            return h(require('./json/carePlan/listProjectCarePlan.json'));
        }
    },
    {
        method: 'GET',
        path: '/carePlan/projectCarePlan.json',
        handler: function (request, h) {
        	return h(require('./json/carePlan/projectCarePlan.json'));
        }
    }
];