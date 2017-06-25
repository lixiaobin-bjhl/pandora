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
	}
];