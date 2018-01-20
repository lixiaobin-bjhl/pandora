/**
 * account api 
 */

'use strict';

import { postWithJson, post } from 'src/common/service';

/**
 * 获取账号列表
 * 
 * @param {string=} params.query 校名名称
 * @param {number=} params.pageSize 分页大小
 * @param {number=} params.pageNum 分页码
 * 
 * @return {Promise}
 */
export function getList(params) {
    return postWithJson('/school/list.json', params)
}

/**
 * 编辑或添加校区
 * 
 * @param {string} params.name 校名名称
 * @param {number} params.address 
 * 
 * @return {Promise}
 */
export function saveOrUpdate(params) {
    return post('/school/saveOrUpdate.json', params)
}

/**
 * 删除校区
 * 
 * @param {string} params.id 校区id
 * 
 * @return {Promise}
 */
export function del(params) {
    return post('/school/del.json', params)
}