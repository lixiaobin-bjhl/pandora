
import { getLoginUser } from './request';

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
            window.location.href = url;
        });
}
init();


