

import {post} from '../../common/service';

export function list (params) {
    return post('/lesson/list.json', params);
}