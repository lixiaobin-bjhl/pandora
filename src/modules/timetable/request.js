

import {post, postWithJson} from '../../common/service';

export function list (params) {
    return postWithJson('/lesson/list.json', params);
}

export function lessonConflict (params) {
    return postWithJson('/lesson/lessonConflict.json', params);
}

export function edit (params) {
    return postWithJson('/lesson/edit.json', params);
}

export function detail (params) {
    return postWithJson('/lesson/detail.json', params);
}