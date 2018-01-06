/**
 * @file 电话号码格式化
 */


'use strict';

/**
 * 电话号码格式化（3-4-4格式）
 * @param {number} phoneNumber 电话号码
 */
Vue.filter('phone', function(phoneNumber) {
    let phoneStr = ('' + phoneNumber).trim();

    if (phoneStr && phoneStr.length == 11) {
        return phoneStr.substr(0, 3) + '-' + phoneStr.substr(3, 4) + '-' + phoneStr.substr(7, 4);
    }
    else {
        return phoneNumber;
    }
});