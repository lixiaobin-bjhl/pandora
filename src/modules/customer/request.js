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

/**
 * 医生列表
 */
export function userList (params) {
    return post('/user/list.json', params);
}

/**
 * 咨询来源列表
 */
export function patientSource (params) {
    return post('/patient/patientSources.json', params);
}

/**
 * 获取项目列表
 */
export function getProjectList (params) {
    return post('/project/projectCategory.json', params);
}

/**
 * 添加项目
 */
export function addProject (params) {
    return post('/patient/addProject.json', params);
}

/**
 * 删除项目
 */
export function deleteProject (params) {
    return post('/patient/delPatientProject.json', params);
}

/**
 * 更新项目
 */
export function updateProject (params) {
    return post('/patient/updateProject.json', params);
}

/**
 * 卡券列表
 */
export function couponRuleList (params) {
    return post('/couponRule/list.json', params);
}

/**
 * 添加优惠券规则
 */
export function couponRuleSave (params) {
    return post('/couponRule/save.json', params);
}

/**
 * 删除优惠券
 */
export function couponRuleDelete (params) {
    return post('/couponRule/delete.json', params);
}

/**
 * 检测优惠券是否重复
 */
export function couponRuleCheckRepeat (params) {
    return post('/couponRule/checkRepeat.json', params);
}