/**
 * @fileOverview pandora-setting
 * @author XiaoBin Li(lixiaobin8878@gmail.com)
 */

'use strict';

import  { post, form, get } from 'src/common/service'

/** 
 * 患者的关怀计划
 * 
 * @param {number} params.pageNum 分页
 * @param {number} params.pageSize 分页大小
 * @param {string=} params.nameKey 搜索关键词
 * @param {number=} params.categoryId 所属分类id
 * 
 * @return {Promise} 
 */
export function patientCarePlan (params) {
    return get('/carePlan/patientCarePlan.json', params);
}

/** 
 * 添加或编辑
 * 
 * @param {number} params.id 关怀计划id
 * 
 * @return {Promise} 
 */
export function saveOrUpdate (params) {
    return post('/carePlan/saveOrUpdate.json', params);
}

/** 
 * 删除关怀计划
 * 
 * @param {number} params.id 关怀计划id
 * 
 * @return {Promise} 
 */
export function deleteCarePlan (params) {
    return post('/carePlan/delete.json', params);
}

/** 
 * 添加或修改关怀计划
 * 
 * @param {number} params.pageNum 分页
 * @param {number} params.pageSize 分页大小
 * @param {string=} params.nameKey 搜索关键词
 * @param {number=} params.categoryId 所属分类id
 * 
 * @return {Promise} 
 */
export function listProjectCarePlan (params) {
    return post('/carePlan/listProjectCarePlan.json', params);
}

/** 
 * 项目关怀计划详情
 * 
 * @param {number} params.id 项目ID
 * 
 * @return {Promise} 
 */
export function projectCarePlan (params) {
    return get('/carePlan/projectCarePlan.json', params);
}