/**
 * account api 
 */

'use strict';

import {postWithJson, post} from 'src/common/service';

/**
 * 获取账号列表
 * 
 * @param {string=} params.query 用户姓名 
 * @param {Array=} params.schoolIds 校区ids
 * @param {number} params.roleType 账号类型
 * @param {Object=} params.pageSize 
 * 
 * @return {Promise}
 */
export function getUserList (params) {
    return postWithJson('/user/list.json', params)
}

/**
 * 修改账号启用/禁用状态
 * 
 * @param {number} params.id 用户id 
 * @param {number} params.status 1启用  2禁用
 * 
 * @return {Promise}
 */
export function modifyStatus (params) {
    return post('/user/modifyStatus.json', params)
}

/**
 * 修改密码
 * 
 * @param {number} params.id 用户id 
 * @param {string} params.password 密码
 * 
 * @return {Promise}
 */
export function reset (params) {
    return post('/user/reset.json', params)
}

/**
 * 获取用户详情
 * 
 * @param {number} params.id 用户id 
 * 
 * @return {Promise}
 */
export function detail (params) {
    return post('/user/detail.json', params)
}

/**
 * 添加or编辑
 * 
 * @param {number} params.id 用户id 
 * @param {string} params.name 用户名
 * @param {number} params.schoolId 校区名
 * @param {number} params.password 密码
 * @param {number} params.chargerId 负责人id
 * 
 * @return {Promise}
 */
export function saveOrUpdate (params) {
    return post('/user/saveOrUpdate.json', params)
}