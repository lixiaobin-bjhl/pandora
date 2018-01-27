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
 * 更新用户头像
 */
export function updateAvatar (params) {
    return post('/patient/updateAvatar.json', params);
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
 * 优惠列表
 */
export function couponList (params) {
    return post('/coupon/list.json', params);
}

/**
 * 抢券
 */
export function getCoupon (params) {
    return post('/coupon/getCoupon.json', params);
}

/**
 * 获取分享优惠券信息
 */
export function getShareCouponInfo (params) {
    return post('/coupon/getShareCouponInfo.json', params);
}

/**
 * 生成优惠券分享链接
 */
export function generateShareInfo (params) {
    return post('/coupon/getShareCouponInfo.json', params);
}

/**
 * 获取用户优惠券使用情况统计
 */
export function getPatientCouponStatistics (params) {
    return post('/coupon/getPatientCouponStatistics.json', params);
}