
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Card from './components/Card';

Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
  render(h) {
        return (<div id = "app" class = "app">
                    
                    <Card></Card> 
                </div>
        )
    },
  components: { Chat }
}).$mount('#app');
