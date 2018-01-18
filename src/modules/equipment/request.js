

'use strict';

import jsonp from '../../common/function/jsonp';
import {post} from '../../common/service';

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
 *  @return {Promise} 
 */
export function getApplyList (params) {
    return post('/apply/list.json', params);
}