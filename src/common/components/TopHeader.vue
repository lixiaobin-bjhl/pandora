<!--
    @file 天校顶导
    @author chenwen(chenwen@baijiahulian.com)
-->

<template>
    <header class="clearfix">
        <div class="pull-left logo">华图双师排课系统</div>
        <ul>
            <li class="user">
                <span class="name">{{ orgInfo.shortName }}，欢迎您!</span>
                <span class="pointer">退出</span>  
            </li>
            <!-- <li class="role">
                <img :src="orgInfo.avatar|compressImage(30, 30)">
                <dropdown>
                    <span class="name" slot="text">{{ orgInfo.username }}</span>
                    <ul slot="action">
                        <li @click="logout" >退出登录</li>
                    </ul>
                </dropdown>
            </li> -->
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
        props: {
            orgInfo: {
                type: Object,
                default () {
                    return {
                      userName: '李小斌',
                      shortName: '李小斌',
                      avatar: 'http://imgs.genshuixue.com/0baijiatools/8765b6bb3b04a6729db558d910c8bc5c/sidebarIcon.png'
                    }
                }
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
                window.location.href = env.www + 'qrLogout.do';
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
        line-height: 60px;
        text-align: right;
        background-color: #F9F9F9;
        .logo {
            font-size: 24px;
            color: #409EFF;
            padding: 0 10px;
        }
        .user {
            color: #666;
            padding-right: 30px;
            .name {
                font-size: 16px;
                margin-right: 49px;
            }
        }
    }
</style>
