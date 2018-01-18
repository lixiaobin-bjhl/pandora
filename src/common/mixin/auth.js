/**
 * @file 权限 
 */

'use strict';

export default {
    computed: {
        userInfo () {
            return this.$store.state.userInfo;
        } 
    },
    methods: {
        /**
         * 判断当前角色是否有权限
         * 
         * @param {number|array} roleType
         * 
         * @param {boolean} 
         */
        hasAuth (roleType) {
            var userInfo = this.userInfo;

            if (!userInfo) {
                return false;
            }
            if (Object.prototype.toString.call(roleType) == '[object Array]') {
                return roleType.some((item)=> {
                    return item == userInfo.roleType;
                });
            }
            return roleType == userInfo.roleType;
        }
    }
}