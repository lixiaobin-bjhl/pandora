
import { getLoginUser } from './request';
import redirect from '../common/function/redirect';
import Toast from 'mint-ui/lib/toast';

window.toast = function(msg) {
    Toast(msg);
}

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


