/**
 * @file 获取当前时间是一年的第n周
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

/**
 * @param {Date} date 时间是第一年多少周
 */
export default function indexBy (date) {
    // 当前时间的第一天
    var yearFirstDay = new Date(date.getFullYear(), 0, 1);
    
    var d = (+date - +yearFirstDay) / (1000 * 60 * 60 * 24);

    return Math.ceil(d / 7) || 1;

}