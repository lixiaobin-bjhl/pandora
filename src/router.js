import Vue from 'vue';
import Router from 'vue-router';
import Teacher from './modules/teacher/index';
import Account from './modules/Account/index';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/account'
        },
        {
            path: '/account',
            name: 'account',
            component: Account
        },
        {
            path: '/teacher',
            name: 'teacher',
            component: Teacher
        }
    ]
});