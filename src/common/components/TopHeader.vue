<!--
    @file 天校顶导
    @author chenwen(chenwen@baijiahulian.com)
-->

<template>
    <header>
        <ul>
            <li class="campus">
                <span class="name">{{ orgInfo.shortName }}</span>
            </li>
            <li class="role">
                <img :src="orgInfo.avatar|compressImage(30, 30)">
                <dropdown>
                    <span class="name" slot="text">{{ orgInfo.username }}</span>
                    <ul slot="action">
                        <li @click="logout" >退出登录</li>
                    </ul>
                </dropdown>
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
        height: 50px;
        text-align: right;
        background-color: #fff;
        border-bottom: 1px solid #e6e6e6;

        > ul {
            padding: 10px 0;
            > li {
                display: inline-block;
                height: 24px;
                line-height: 24px;
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
                &.download {
                    i {
                        display: inline-block;
                        width: 12px;
                        height: 18px;
                        background: url('//imgs.genshuixue.com/0baijiatools/8765b6bb3b04a6729db558d910c8bc5c/sidebarIcon.png');
                        background-size: 72px 90px;
                        background-position: -60px 0;
                        vertical-align: middle;
                        margin-right: 5px;
                    }
                    a {
                        vertical-align: middle;
                        color: #1A91F2;
                        &:hover {
                            color: #20a0ff;
                        }
                    }
                }
                &.campus {
                    > p {
                        display: inline-block;
                        margin-left: 6px;
                        color: #1A91F2;
                        font-size: 12px;
                        cursor: pointer;
                        &:hover {
                            color: #20a0ff;
                        }
                        i {
                            font-weight: bold;
                            margin-right: 3px;
                            vertical-align: middle;
                        }
                    }
                }
            }
        }

        ul,
        li {
            list-style: none;
        }
    }
</style>
