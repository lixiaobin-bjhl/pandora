
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'src/assets/scss/common/vendor.scss'
import Chat from './components/Chat';

// filter

require('../common/filter/date');

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
