/**
 * @fileOverview service util
 * @author XiaoBin Li(lixiaobin8878@gmail.com)
 */

'use strict';

import axios from 'axios';
var querystring = require('querystring');


/**
 * 添加ajax response interceptor
 */
axios.interceptors.response.use(function (res) {
    let data = res.data;
    let code = data.code;

    if (typeof data === 'string') {
        data = JSON.parse(data);
    }
    if (code === 0 || isNaN(code)) {
        return data;
    } else {
        // 未登录状态
        if (code === 2000000500  || code === 2001030500) {
            window.location.href = '/login.html';
            return;
        }
        if (showErrTip) {
           toast('系统异常', error);
        }
        return Promise.reject(data);
    }
}, function (error) {
    return Promise.reject(error);
});


/**
 * 错误处理
 *
 * @inner
 * @param {Object} response 返回的 JSON 数据
 * @return {Object}
 */
function errorHandler(response) {
    var code = response.code;
}

/**
 * 发送 post 请求
 *
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @return {Promise}
 */
export function post(url, data = {}) {
    return axios.post(url, querystring.stringify(data));
}

export function postWithJson (url, data = {}) {
    return axios.post(url, data);
}

/**
 * post form参数请求
 *
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @return {Promise}
 */
export function form(url, data = {}) {
    return axios.post(url, 
        querystring.stringify(data), 
        {
            headers: { 
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );
}

/**
 * 发送 delete 请求
 *
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @return {Promise}
 */
export function del(url, data = {}) {
    return axios.delete(url, {
        params: data
    });
}

/**
 * 发送 get 请求
 *
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @return {Promise}
 */
export function get(url, data = {}) {
    return axios.get(url, {
        params: data
    });
}

/**
 * 发送 update 请求
 *
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @return {Promise}
 */
export function put(url, data = {}) {
    return axios.put(url, data);
}