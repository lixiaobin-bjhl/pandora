/**
 * @file 定制版-移动端学生个人中心入口文件
 * @author xuguanlong
 */

'use strict';

import Vue from 'vue';
import FastClick from 'fastclick';
import './bindTel.scss';
import BindTel from './components/BindTel.vue';
import Toast from 'mint-ui/lib/toast';
import 'mint-ui/lib/toast/style.css';

window.toast = function(msg) {
    Toast(msg);
}
const app = new Vue({
    render(h) {
        return (<div id = "app" class = "app">
                    <div class = "logo-wrapper">
                        <div class = "logo"></div>
                    </div>
                    <BindTel></BindTel> 
                </div>
        )
    }
}).$mount('#app');

FastClick.attach(document.body);
