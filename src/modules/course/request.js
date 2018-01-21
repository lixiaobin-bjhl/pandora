

import {post, postWithJson} from '../../common/service';

/**
 * 获取教室列表
 * 
 * @param {string} params.query
 * @param {string} params.subjectType
 * @param {string} params.isOnline
 * @param {Object=} params.pageDto 
 * 
 * @return {Promise}
 */
export function getList (params) {
    return postWithJson('/course/list.json', params);
}

export function updateOnlineStatus (params) {
    return post('/course/updateOnlineStatus.json', params);
}

export function updateTopStatus (params) {
    return post('/course/updateTopStatus.json', params);
}

/**
 * 获取课程详情
 * 
 * @param {number} params.id
 * 
 * @return {Promise}
 */
export function detail (params) {
    return post('/course/detail.json', params);
}

/**
 * 获取课程详情
 * 
 * 
 * @return {Promise}
 */
export function add (params) {
    return post('/course/add.json', params);
}