/**
 * @file 对象数组的某个属性值组成字符串
 * @author chenwen (chenwen@baijiahulian.com)
 */

import getKeyArray from '../functions/getKeyArray';

/**
 * 对象数组的属性值拼接为字符串
 *
 * @param {Array} arr 数组
 * @param {string} key 属性名
 */
Vue.filter('arrToStr', (arr, key) => {
    let valArr = getKeyArray(arr, key);

    return valArr.join(', ');
});