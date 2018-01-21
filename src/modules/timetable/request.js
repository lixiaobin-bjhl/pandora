

import {post, postWithJson} from '../../common/service';

export function list (params) {
    return postWithJson('/lesson/list.json', params);
}