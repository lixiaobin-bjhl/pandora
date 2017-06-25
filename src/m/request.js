/**
 * @fileOverview pandora-m-request
 * @author XiaoBin Li(lixiaobin8878@gmail.com)
 */

'use strict';

import  { post, form, get } from '../common/service'

export function bindTel () {
    return form('/aaa', {
        name: "xiaobin"
    });
}

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





