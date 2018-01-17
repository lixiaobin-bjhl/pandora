/**
 * @fileOverview pandora-common-request
 * @author XiaoBin Li(lixiaobin8878@gmail.com)
 */

'use strict';

import  { post } from '../common/service';

/**
 * 获取用户信息
 * 
 * @return {Promise}
 */
export function getUserInfo() {
	return post('/common/userInfo.json', {});
}