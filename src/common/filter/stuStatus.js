/**
 * @fileOverview 学员状态
 * @author Chenwen(chenwen@baijiahulian.com)
 */

'use strict';

import config from '../../modules/student/config';
/**
 * 学员状态
 * @param {number} index 状态值
 * @return {string}
 */
Vue.filter('stuStatus', function(index) {
    let statusTxt = '--';
    config.studentTypes.forEach((item) => {
        if (item.value == index) {
            statusTxt = item.text;
        }
    });

    return statusTxt;
});