/**
 * @fileOverview 分钟格式化
 * @author Chenwen(chenwen@baijiahulian.com)
 */

'use strict';

/**
 * 分钟格式化，**小时**分钟
 * @param {number} total 分钟总数
 */
Vue.filter('minuteStr', function(total) {
    if (typeof total != 'number') {
        return '--';
    }

    let hour = Math.floor(total / 60);
    let minute = total % 60;

    if (hour) {
        let hourStr = hour + '小时';
    }
    if (minute) {
        let minuteStr = minute + '分钟';
    }
    return hour || minute
        ? hourStr + minuteStr
        : '0小时';
});