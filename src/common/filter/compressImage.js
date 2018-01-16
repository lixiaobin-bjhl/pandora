/**
 * @fileOverview 裁剪图片
 */

'use strict';

let compressImage = require('../function/compressImage');

/**
 * 裁剪图片
 * @param {string} url
 * @param {number} width
 * @param {number} height
 * @return {string}
 */
Vue.filter('compressImage', function(url, width, height) {

	if (!width) {
		width = $(window).width();
	}

    let reg = /^\S*img\S*[gsx|genshuixue|tianxiao|baijiahulian]\S*/;
    let isCompressed = reg.test(url);

    if (isCompressed) {
        return compressImage(url, {
            width: width,
            height: height
        });
    }
    else {
        return url;
    }
});