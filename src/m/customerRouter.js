import Vue from 'vue';
import Router from 'vue-router';

import Center from './components/Center';
import Customer from './components/Customer';
import Profile from './components/Profile';
import Coupon from './components/Coupon';
import CarePlan from './components/CarePlan';
import SelectItem from './components/SelectItem';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'customer',
            component: Customer,
            children: [
                {
                    path: 'center',
                    component: Center
                },
                {
                    path: 'profile',
                    component: Profile
                },
                {
                    path: 'coupon',
                    component: Coupon
                },
                {
                    path: 'carePlan',
                    component: CarePlan
                },
                {
                    path: 'selectItem',
                    component: SelectItem
                }
            ]
        }
    ],
});