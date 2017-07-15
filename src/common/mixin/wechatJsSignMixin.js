/**
 * @file mixins
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

import {getWechatJsSign} from '../request';
import wechatConfig from '../config/wechatConfig';

export default {
    methods: {
        /**
         * 获取微信js签名
         */
        getWechatJsSign () {
            return getWechatJsSign({
                url: location.href.split('#')[0]
            })
            .then((res)=> {
                var data = res.data;
                Object.assign(wechatConfig, {
                    signature: data.signature,
                    appId: data.appId || wechatConfig.appId,
                    timestamp: data.timestamp,
                    nonceStr: data.noncestr
                });
				window.wx.config(wechatConfig);	
                return data;
            });
        },
        /**
         * 预览图片 
         * @param {string} current 当前打开的图片
         * @param {jQuery} imgs 浏览图片集合
         */
        previewImage(current, imgs) {
            var urls = [];
            imgs.forEach((img, index) => {
                urls.push(img.dataset.url)
            });
            wx.previewImage({
                current: current,
                urls: urls
            });
        },
        /**
         * 使用地图打开位置
         * @param {number} lat 纬度
         * @param {number} lng 经度
         */
        openLocation (lat, lng, name, address) {
            wx.openLocation({
                latitude: lat, // 纬度，浮点数，范围为90 ~ -90
                longitude: lng, // 经度，浮点数，范围为180 ~ -180。
                name: name, // 位置名
                address: address, // 地址详情说明
                scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
            });
        },
        /**
         * 判读tag是否有权限
         */
        getOwnPermissions (tag) {
            var permissions = this.$root.permissions || [];
            var result = false;
            if(permissions.some((item)=> {
                return item.name == tag; 
            })) {
                result = true;
            }
            return result;
        }
    }
}

