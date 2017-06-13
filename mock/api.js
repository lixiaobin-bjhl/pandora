/**
 * @fileOverview api
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

exports.routes = [
	{
		method: 'GET',
        path: '/storage/upload.json',
        handler: function (request, reply) {
        	return reply(
        		{
				    "code": 0,
				    "msg": "",
				    "data": {
				    	storageId: 1111,
				    	url: "http://img.gsxservice.com/5047237_jicnr6qi.jpg"
				    }
				}
			);
        }
	},
	{
		method: 'POST',
        path: '/student/changeAvatar.json',
        handler: function (request, reply) {
        	return reply(
        		{
				    "msg":"",
				    "code": 0,
				    "data": 
				    {
				       "studentId":2//学生id
				    }
				}
			);
        }
	},
	{
		method: 'POST',
        path: '/org/info.json',
        handler: function (request, reply) {
        	return reply(require('./json/api/orgInfo.json'));
  		}
	},
	{
		method: 'POST',
        path: '/common/import.json',
        handler: function (request, reply) {
        	return reply(
        		{
				    "code": 0,
				    "msg": "",
				    "data": {
				    	taskId: 1122
				    }
				}
			);
        }
	},
	{
		method: 'POST',
        path: '/config/get.json',
        handler: function (request, reply) {
        	return reply(require('./json/api/config.json'));
        }
	},
	// 获取状态
	{
		method: 'POST',
		path: '/common/import/progress.json',
		handler: function (request, reply) {
			return reply(
				{
					"code": 0,
					"msg": "处理完成",
					"data": {
						taskId: 11,
						invalidDataSize: "1",
						validDataSize: "0",
						status: 1 //0-处理中 1-处理完成 2-系统异常
					}
				}
			);
		}
	}
	// {
	// 	method: 'POST',
 //        path: '/area/list.json',
 //        handler: function (request, reply) {
 //        	return reply(require('./json/api/areaList.json'));
 //  		}
	// }
];