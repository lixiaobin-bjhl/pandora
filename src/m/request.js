/**
 * @fileOverview pandora-m-request
 * @author XiaoBin Li(lixiaobin8878@gmail.com)
 */

'use strict';

import  { post, form, get } from '../common/service'

/** 
 * 获取上传产品token 
 */
export function uptoken () {
    return get('/qiniu/uptoken');
}

/**
 * 上传图片
 * @param {string} params.token 上传token
 * @param {Object} params.file 上传图片本身
 */
export function upload (params) {
    return post('/storage/upload.json', params)
}

/**
 * 绑定用户信息
 * 
 * @param {string} params.name 用户名
 * @param {string} params.mobile 手机
 * @param {number} params.age 年龄
 * 
 * @return {Promise}
 */
export function bindWechat (params) {
    return post('/patient/bindWechat.json', {
        name: params.name,
        mobile: params.mobile,
        age: params.age
    });
}
