import Vue from 'vue';
import Router from 'vue-router';

import Center from './components/Center';
import Profile from './components/Profile';
import Coupon from './components/Coupon';
import Loving from './components/Loving';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Center',
            component: Center
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        },
        {
            path: '/coupon',
            name: 'Coupon',
            component: Coupon
        },
        {
            path: '/loving',
            name: 'Loving',
            component: Loving
        }
    ]
});