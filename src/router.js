import Vue from 'vue';
import Router from 'vue-router';

import Customer from './modules/customer/index';
import Discounts from './modules/discounts/index';
import Setting from './modules/Setting/index';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/customer'
        },
        {
            path: '/customer',
            name: 'Customer',
            component: Customer
        },
        {
            path: '/discounts',
            name: 'Discounts',
            component: Discounts
        },
        {
            path: '/setting',
            name: 'Setting',
            component: Setting
        }
    ]
});