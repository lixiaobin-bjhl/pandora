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
    return post('/couponActivity/delete.json', params);
}

/**
 * 优惠活动详情 
 */
export function activityDetail (params) {
    return post('/couponActivity/detail.json', params);
}

/**
 * 运行优惠活动
 */
export function runActivity(params) {
    return post('/couponActivity/runActivity.json', params);
}

/**
 * 暂停优惠活动
 */
export function pauseActivity(params) {
    return post('/couponActivity/pauseActivity.json', params);
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
    return post('/couponRule/delete.json', params);
}


