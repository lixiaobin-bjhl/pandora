/**
 * @fileOverview chairty-function-redirect
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import getUrlSearch from './getUrlSearch';

var search = getUrlSearch();

export default function (url) {

    var openId = search.openId;
    
    if (openId) {
        if (url.indexOf('?') > -1) {
            url += '&openId=' + openId;
        } else {
            url += '?openId=' + openId;
        }
    }
    window.location.href = url;
};