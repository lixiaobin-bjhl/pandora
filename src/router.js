import Vue from 'vue';
import Router from 'vue-router';
import Teacher from './modules/teacher/index';
import Account from './modules/account/index';
import Equipment from './modules/equipment/index';
import Course from './modules/course/index';
import Arrangement from './modules/arrangement/index';
import EquipmentGuide from './modules/equipment/guide';
import Timetable from './modules/timetable/index';


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
            name: 'equipmentGuide',
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
        },
        {
            path: '/timetable',
            name: 'timetable',
            component: Timetable
        }
    ]
});