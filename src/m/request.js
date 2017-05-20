/**
 * @fileOverview pandora-m-request
 * @author XiaoBin Li(lixiaobin8878@gmail.com)
 */

'use strict';

import  { post, form } from '../common/service'

export function bindTel () {
    return form('/aaa', {
        name: "xiaobin"
    });
}



