/**
 * @fileOverview coupon api
 */

exports.routes = [
	{
		method: 'POST',
        path: '/coupon/list.json',
        handler: function (request, reply) {
            return reply(require('./json/coupon/list.json'));
        }
    },
    {
		method: 'GET',
        path: '/coupon/getCoupon.json',
        handler: function (request, reply) {
            return reply(require('./json/coupon/getCoupon.json'));
        }
    },
    {
		method: 'GET',
        path: '/coupon/useCoupon.json',
        handler: function (request, reply) {
            return reply(require('./json/api/success.json'));
        }
    },
    {
		method: 'GET',
        path: '/coupon/getShareCouponInfo.json',
        handler: function (request, reply) {
            return reply(require('./json/coupon/getShareCouponInfo.json'));
        }
    },
    {
		method: 'GET',
        path: '/coupon/generateShareInfo.json',
        handler: function (request, reply) {
            return reply(require('./json/coupon/generateShareInfo.json'));
        }
    },
    {
		method: 'POST',
        path: '/coupon/getPatientCouponStatistics.json',
        handler: function (request, reply) {
            return reply(require('./json/coupon/getPatientCouponStatistics.json'));
        }
    }
];