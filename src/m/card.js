/**
 * @file 定制版-移动端学生个人中心入口文件
 */

'use strict';

import Vue from 'vue';
import FastClick from 'fastclick';
import './card.scss';
import Card from './components/Card.vue';
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
                    <Card></Card> 
                </div>
        )
    }
}).$mount('#app');

FastClick.attach(document.body);
