/**
 * @fileOverview 显示周几
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

import getWeekNum from '../function/getWeekNum'

/**
 * 显示周几
 * @param {number} date
 */
Vue.filter('week', function(date) {
	if (typeof date === 'number' && ('' + date).length === 1) {
		return getWeekNum(date);
	}
	if (!date) {
		return '';
	}
	var day = new Date(date).getDay();
 	return getWeekNum(day);
});