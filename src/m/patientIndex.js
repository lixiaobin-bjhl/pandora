
import { getLoginUser } from './request'
import redirect from '../common/function/redirect'
import 'mint-ui/lib/style.css'
import { Indicator } from 'mint-ui'
import Vue from 'vue'
import Toast from 'mint-ui/lib/toast'

window.toast = function(msg) {
    Toast(msg);
}


const app = new Vue({
    render(h) {
        return (<div id = "app" class = "app">
                </div>
        )
    }
}).$mount('#app');

Indicator.open({
  text: 'Loading...',
  spinnerType: 'fading-circle'
});

function init () {
    getLoginUser()
        .then((res)=>{
            var data = res.data;
            var url = '';
            if (data.mobile) {
                url = 'chat.html';
            } else {
                url = 'bindTel.html';
            }
            redirect(url);
        });
}
init();




