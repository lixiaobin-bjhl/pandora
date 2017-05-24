/**
 * @file Vue-filter-date
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import date from '../date';
import Vue from 'vue';

Vue.filter('date', function (value, pattern) {
    return date.format(new Date(value), pattern);
});