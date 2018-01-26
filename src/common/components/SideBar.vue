<template>
    <div id="sidebar">
        <h3 class="logo"></h3>
        <div class="menu">
            <ul>
                <li v-for="item, index in options" 
                    :class="{'active': setActiveTab(item.url)}" 
                    :key="index" 
                    @click="forward(item)">
                   <icon :name="item.icon" scale="2"></icon><span>{{ item.text }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentTab: window.location.hash.slice(3),
                options: [{
                        text: "客户档案",
                        icon: 'customer',
                        url: "customer"
                    },
                    {
                        text: "活动管理",
                        icon: 'coupon',
                        url: "discounts"
                    },
                    {
                        text: "关怀计划",
                        icon: 'loving',
                        url: "setting"
                    }
                ]
            };
        },
        methods: {
            /**
             * 标注当前tab
             */
            setActiveTab(url) {
                return url.indexOf(this.currentTab) > -1;
            },
            /**
             * 前往对应模块
             */
            forward(item) {
                let url = item.url;
                this.currentTab = url;
                if (this.$router.push) {
                    this.$router.push(url);
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    #sidebar {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 10;
        width: 200px;
        height: 100%;
        background-color: #485465;
        h3 {
            height: 59px;
            background: url("//imgs.genshuixue.com/0baijiatools/cb8a1b5479723b3305e4897a3785bbb4/logo.png") center center;
            background-size: 160px 50px;
            margin: 0;
        }
        .menu {
            position: absolute;
            top: 60px;
            bottom: 0;
            width: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            /* scrollbar for chrome */
            &::-webkit-scrollbar {
                width: 0;
            }
            &:hover {
                // width: 155px;
                &::-webkit-scrollbar {
                    width: 8px;
                }
                &::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, 0.3);
                    background-clip: content-box; // border-radius: 6px;
                    border-right: 5px solid transparent;
                }
                &::-webkit-scrollbar-track {
                    background-color: transparent;
                }
            }
        }
        li {
            display: block;
            height: 56px;
            padding: 0 15px;
            line-height: 56px;
            color: #C0CCDA ;
            cursor: pointer;
            transition: all, .8s;
            .svg-icon {
                vertical-align: middle;
                color: #C0CCDA;
                margin-right: 10px;
            }
            span {
                vertical-align: middle;
            }
            &:hover {
                background: #5E6D82;
            }
            &.active {
                background: #5E6D82;
                color: #fff;
                .svg-icon {
                    color: #20A0FF
                }
            }
        }
    }
</style>