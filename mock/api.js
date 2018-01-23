/**
 * @fileOverview api
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

exports.routes = [
	{
		method: 'POST',
        path: '/common/getLoginUser.json',
        handler: function (request, reply) {
        	return reply(require('./json/api/getLoginUser.json'));
        }
	},
	{
		method: 'POST',
        path: '/storage/upload.json',
        handler: function (request, reply) {
        	return reply(
        		{
				    "code": 0,
				    "msg": "",
				    "data": {
				    	storageId: 1111,
				    	url: "http://omh2h1x76.bkt.clouddn.com/user.png"
				    }
				}
			);
        }
	},
	{
		method: 'POST',
        path: '/wechat/signature.json',
        handler: function (request, reply) {
        	return reply(
        		{
				    "code": 0,
				    "msg": "",
				    "data": {
				    	storageId: 1111,
				    	url: "http://omh2h1x76.bkt.clouddn.com/user.png"
				    }
				}
			);
        }
	},
	{
		method: 'get',
        path: '/mediaTransfer/arm2mp3.json',
        handler: function (request, reply) {
        	return reply(
        		{
				    "code": 0,
				    "msg": "",
				    "data": {
				    	storageId: 1111,
				    	mp3Url: "http://oqpq939qh.bkt.clouddn.com/1/9BhWzDAaX22kCd178GlnewFPU_-at2gDDziuIvrHkt6vcs8VBoHxXcPk54UCOsQ1.mp3"
				    }
				}
			);
        }
	},
	{
		method: 'POST',
        path: '/patient/bindWechat.json',
        handler: function (request, reply) {
        	return reply(
        		{
				    "code": 0,
				    "msg": ""
				}
			);
        }
	}
];