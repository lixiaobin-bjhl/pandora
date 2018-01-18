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
         * @param {number} roleType
         * 
         * @param {boolean} 
         */
        hasAuth (roleType) {
            var userInfo = this.userInfo;

            if (!userInfo) {
                return false;
            }
           return roleType == userInfo.roleType;
        }
    }
}