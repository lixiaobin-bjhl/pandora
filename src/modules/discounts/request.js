/**
 * @fileOverview pandora-discounts-api
 * @author XiaoBin Li(lixiaobin8878@gmail.com)
 */

'use strict';

import  { post, form, get } from 'src/common/service'

/** 
 * 获取活动列表
 * 
 * @param {number} params.pageNum 分页
 * @param {number} params.pageSize 分页大小
 * @param {string=} params.nameKey 搜索关键词
 * 
 * @return {Promise} 
 */
export function getActivityList (params) {
    return post('/couponActivity/list.json', params);
}

/**
 * 删除优惠活动 
 */
export function delActivity (params) {
    return get('/couponActivity/delete.json', params);
}

/**
 * 优惠活动详情 
 */
export function activityDetail (params) {
    return get('/couponActivity/detail.json', params);
}

/**
 * 运行优惠活动
 */
export function runActivity(params) {
    return get('/couponActivity/runActivity.json', params);
}

/**
 * 暂停优惠活动
 */
export function pauseActivity(params) {
    return get('/couponActivity/pauseActivity.json', params);
}

/**
 * 获取优惠券规则列表 
 */
export function getCouponRuleList (params) {
    return post('/couponRule/list.json', params);
}

/**
 * 获取优惠券规则列表 
 */
export function saveCouponActivity (params) {
    return post('/couponActivity/save.json', params);
}


/**
 * 获取优惠券规则列表 
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
    return get('/couponRule/delete.json', params);
}


