import Vue from 'vue';
import Router from 'vue-router';
import Teacher from './modules/teacher/index';
import Account from './modules/Account/index';
import Equipment from './modules/equipment/index';
import Course from './modules/course/index';
import Arrangement from './modules/Arrangement/index';
import EquipmentGuide from './modules/Equipment/guide';


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
        },
        {
            path: '/equipment',
            name: 'equipment',
            component: Equipment
        },
        {
            path: '/equipment/guide',
            name: 'equipment',
            component: EquipmentGuide
        },
        {
            path: '/course',
            name: 'course',
            component: Course
        },
        {
            path: '/arrangement',
            name: 'arrangement',
            component: Arrangement
        }
    ]
});