

'use strict';

import jsonp from '../../common/function/jsonp';
import {post, postWithJson} from '../../common/service';

/**
 * 百度地址suggestion
 *
 * @param {Object} data
 * @property {string} data.query 输入建议关键字（支持拼音）
 * @property {string} data.region 所属城市/区域名称或代号 - 市
 * @property {string?} data.output 返回数据格式，可选json、xml两种
 *
 * @return {Promise}
 */
export function getAddressSuggestion (data) {
    return jsonp(
        '//api.map.baidu.com/place/v2/suggestion',
        {
            query: data.query,
            region: '中国',
            output: 'json',
            ak: 'FYFvMwLbOQfdZdbT49KGAG6k'
        }
    );
}

/**
 * 获取申请列表
 * 
 * @param {number=} params.schoolId 校区id
 * @param {number=} params.applyUserId 申请人
 * @param {number=} params.status 申请状态
 * @param {Object=} params.pageDto 分页信息
 * 
 *  @return {Promise} 
 */
export function getApplyList (params) {
    return postWithJson('/apply/list.json', params);
}

/**
 * 撤回申请
 * 
 * @param {number=} params.id 申请id
 * 
 * @return {Promise} 
 */
export function revoke (params) {
    return post('/apply/revoke.json', params);
}

/**
 * 审批
 * 
 * @param {number} params.id 审批id
 * @param {number} params.status 审批状态
 * @param {string} params.remark 审批备注
 * 
 * @return {Promise} 
 */
export function audit (params) {
    return post('/apply/audit.json', params);
}

/**
 * 添加进度
 * 
 * @param {number} params.applyId 申请id
 * @param {number} params.status 审批状态
 * @param {string} params.remark 审批备注
 * 
 * @return {Promise} 
 */
export function add (params) {
    return post('/apply/add.json', params);
}

/**
 * 获取跟进状态列表
 * 
 * @param {number} params.applyId 申请id
 * 
 * @return {Promise} 
 */
export function auditList (params) {
    return post('/audit/list.json', params);
}

/**
 * 申请报装
 * 
 * @param {number} params.schoolId 申请校区
 * @param {number} params.applyCount 申请个数
 * @param {number} params.applyUserId
 * @param {string} params.address 申请地址
 * @param {string} params.remark
 * 
 * @return {Promise} 
 */
export function apply (params) {
    return post('/apply/apply.json', params);
}

/**
 * 编辑申请报装
 * 
 * @param {number} params.schoolId 申请校区
 * @param {number} params.applyCount 申请个数
 * @param {number} params.applyUserId
 * @param {string} params.address 申请地址
 * @param {string} params.remark
 * 
 * @return {Promise} 
 */
export function reApply (params) {
    return post('/apply/reApply.json', params);
}