import Vue from 'vue';
import Router from 'vue-router';

import CouponShare from './components/CouponShare';
import CouponShareResult from './components/CouponShareResult';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'CouponShare',
            component: CouponShare
        },
        {
            path: '/result',
            name: 'CouponShareResult',
            component: CouponShareResult
        }
    ]
});