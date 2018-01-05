/**
 * @file
 * @author chenwen (chenwen@baijiahulian.com)
 */

/**
 * 最多保留n小数
 * @param {number} number 数字
 * @param {number} n 保留最大位数
 */
Vue.filter('maxDigital', (number, n) => {
    if (typeof number !== 'number') {
        return number;
    }

    var arr = ('' + number).split('.');
    if (arr.length == 2 && arr[1].length > n) {
        return number.toFixed(n);
    }

    return number;
});