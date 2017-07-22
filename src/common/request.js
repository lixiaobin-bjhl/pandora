/**
 * @fileOverview pandora-common-request
 * @author XiaoBin Li(lixiaobin8878@gmail.com)
 */

'use strict';

import  { post, form, get } from '../common/service';
import createNonceStr from './function/createNonceStr';
import createTimeStamp from './function/createTimeStamp';

/**
 * 获取微信签名
 * 
 * @param {params.url} url
 * 
 * @return {Promise}
 */
export function getWechatJsSign(params) {
	return post('/wechat/signature.json', {
        url: params.url,
        nonceStr: createNonceStr(),
        timestamp: createTimeStamp()
    });
}

/**
 * 获取语音mp3地址 
 * 
 * @param {params.url} url
 * 
 * @return {Promise}
 */
export function arm2mp3 (msgid) {
    return get('/mediaTransfer/arm2mp3.json', {
        msgContentId: msgid
    });
}