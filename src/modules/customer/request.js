/**
 * @fileOverview pandora-patient-api
 * @author XiaoBin Li(lixiaobin8878@gmail.com)
 */

'use strict';

import  { post, form, get } from 'src/common/service'

/** 
 * 获取客户列表
 * 
 * @param {number} params.pageNum 分页
 * @param {number} params.pageSize 分页大小
 * @param {string=} params.key 搜索关键词
 * @param {boolean} params.showCount 是否展示总数
 * 
 * @return {Promise} 
 */
export function getList (params) {
    return post('/patient/list.json', params);
}

export function getDetial (params) {
    return post('/patient/detail.json', params);
}

export function update (params) {
    return post('/patient/update.json', params);
}