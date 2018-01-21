

import {post, postWithJson} from '../../common/service';

export function getList (params) {
    return postWithJson('/courseapply/list.json', params);
}

export function audit (params) {
    return post('/courseapply/audit.json', params);
}