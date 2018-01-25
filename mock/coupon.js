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
		method: 'POST',
        path: '/coupon/getCoupon.json',
        handler: function (request, reply) {
            return reply(require('./json/coupon/getCoupon.json'));
        }
    },
    {
		method: 'POST',
        path: '/coupon/getShareCouponInfo.json',
        handler: function (request, reply) {
            return reply(require('./json/coupon/getShareCouponInfo.json'));
        }
    }
];