
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'src/assets/scss/common/vendor.scss'
import Chat from './components/Chat'
import Toast from 'mint-ui/lib/toast'

window.toast = function(msg) {
    Toast(msg);
}

// filter

require('../common/filter/date');
require('../common/filter/compressImage');

Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
  render(h) {
        return (<div id = "app" class = "app">
                    
                    <chat></chat> 
                </div>
        )
    },
  components: { Chat }
}).$mount('#app');
