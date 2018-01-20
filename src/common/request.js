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

/**
 * 登录
 * 
 * @param {string} params.name 用户名
 * @param {string} params.password 密码
 * @param {string=} params.code 验证码
 * 
 * @return {Promise}
 */
export function login (params) {
	return post('/login.do', params);
}

/**
 * 获取用户详情
 * 
 * @param {string} params.id 用户id
 * 
 * @return {Promise}
 */
export function detail (params) {
	return post('/user/detail.json', params);
}