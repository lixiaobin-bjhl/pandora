/**
 * @fileOverview 课节时间显示标准
 * @author ChenWen(chenwen@baijiahulian.com)
 */


import getWeekNum from 'library/function/getWeekNum';

/**
 * 格式化时间
 * @param {number} startTime
 * @param {number} endTime
 * @return {string}
 */
Vue.filter('lessonDate', function(startTime, endTime) {
    if (!startTime) {
        return '--';
    }

    var startTimeObj = new Date(startTime);
    var date = Vue.filter('date');

    return date(startTime, 'yyyy.MM.dd')
        + ' 周' + getWeekNum(startTimeObj.getDay())
        + ' '
        + date(startTime, 'HH:mm')
        + ' - '
        + date(endTime, 'HH:mm');
});