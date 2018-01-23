/**
 * @file Vue-filter-compressImage 压缩七牛云图片
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import Vue from 'vue';
import compressImage from '../function/compressImage';

Vue.filter('compressImage', function (storageId, width, height) {
    var storageId = storageId || 'http://omh2h1x76.bkt.clouddn.com/user.png';
    return compressImage(storageId, {
        width: width,
        height: height
    });
});