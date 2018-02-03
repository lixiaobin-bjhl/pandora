<!--
    @file 天校顶导
    @author chenwen(chenwen@baijiahulian.com)
-->

<template>
    <header>
        <ul>
            <li class="campus">
                <span class="name">{{ userInfo.orgName || '--' }}</span>
            </li>
            <li class="role">
                <el-dropdown :hide-on-click="false">
                    <span class="el-dropdown-link pointer">
                        <img v-if="user.avatar" :src="userInfo.avatar|compressImage(30, 30)"> {{ userInfo.name || '--' }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
        </ul>
    </header>
</template>

<script>

    import Dropdown from './Dropdown.vue';

    export default {
        data () {
            return {
                scrollX: document.documentElement.scrollLeft || document.body.scrollLeft,
                scrollY: 0
            }
        },
        computed: {
            userInfo () {
                return this.$store.state.userInfo || {};
            }
        },
        components: {
            Dropdown
        },
        methods: {
            /**
             * 切换校区/账号
             */
            switchType (type) {
                if (this.$store.commit) {
                    this.$store.commit('OPEN_SWITCH', type);
                }
                else {
                    this.$store.dispatch('OPEN_SWITCH', type);
                }
            },

            /**
             * 退出登录
             */
            logout () {
                window.location.href = '/user/logout.json';
            }
        }
    }
</script>

<style lang="scss">
    header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9;
        height: 60px;
        text-align: right;
        background-color: #fff;
        box-sizing: border-box;
        border-bottom: 1px solid #e6e6e6;
        > ul {
            padding: 10px 0;
            > li {
                display: inline-block;
                height: 25px;
                line-height: 25px;
                padding: 0 20px;
                &:not(:last-child) {
                    border-right: 1px solid #e6e6e6;
                }
                img {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin-right: 10px;
                    vertical-align: middle;
                }
            }
            .name {
               color: #1F2D3D;
            }
        }
    }
</style>
