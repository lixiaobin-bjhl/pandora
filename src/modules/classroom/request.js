/**
 * account api 
 */

'use strict';

import { postWithJson, post } from 'src/common/service';

/**
 * 获取教室列表
 * 
 * @param {string} query
 * @param {Object=} params.pageDto 
 * 
 * @return {Promise}
 */
export function getList(params) {
    return postWithJson('/classRoom/list.json', params)
}

/**
 * 搜索教室列表
 * 
 * @param {string} query
 * @param {Object=} params.pageDto 
 * 
 * @return {Promise}
 */
export function fuzzyQuery(params) {
    return postWithJson('/classRoom/fuzzyQuery.json', params)
}

/**
 * 修改状态
 * 
 * @param {number} params.id
 * @param {status} params.status
 * 
 * @return {Promise}
 */
export function modifyStatus(params) {
    return postWithJson('/classRoom/modifyStatus.json', params)
}