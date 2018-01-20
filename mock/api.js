/**
 * @fileOverview api
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

exports.routes = [
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
        path: '/common/userInfo.json',
        handler: function (request, reply) {
			return reply(require('./json/api/userInfo.json'));
        }
	},
	{
		method: 'POST',
        path: '/login.do',
        handler: function (request, reply) {
			return reply(
        		{
				    "code": 0,
				    "msg": "",
				    "data": {}
				}
			);
        }
	},
	{
		method: 'POST',
        path: '/common/upload.json',
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
	},
	{
		method: 'POST',
        path: '/common/getLoginUser.json',
        handler: function (request, reply) {
        	return reply(
        		{
				    "code": 0,
					"msg": "",
					"data": {
						"mobile": 12312,
						"shortName": "天校大机构",
						"orgName": "广州军区总医院",
						"consulter":{
							"id": 1,
							"name": "小小",
							"avatar": "http://omh2h1x76.bkt.clouddn.com/user.png"
						}
					}
				}
			);
        }
	}
];