<template>
    <transition name="slide-right" appear>
        <div class="material-detail-wrap">
            <div class="wrap-content" v-loading.fullscreen.lock="fullscreenLoading">
                <el-row class="module-title">
                    <el-col :span="12">
                        <breadcrumb-nav
                            :data="breadcrumb"
                            @back="enterList"
                        ></breadcrumb-nav>
                    </el-col>
                    <el-col :span="12">
                        <el-button 
                            type="primary" 
                            size="medium" 
                            @click="modifyCustomer">编辑客户</el-button>
                        <el-button
                            size="medium" 
                            @click="addItem">添加项目</el-button>
                    </el-col>
                </el-row>
                <div class="module-content">
                    <section class="profile">
                        <ul>
                            <li>
                                <img class="avatar90" :src="'https://imgs.genshuixue.com/25267315_nlv2x0kt.png' | compressImage(90, 90)">
                                <name-gender :name="profile.name" :isFemale="profile.gender == 1" :hideGender="profile.gender === null"></name-gender>
                                <p class="phone">{{ profile.mobile|phone}}</p>
                            </li>
                            <li class="key-info info-list">
                                <h3>主要信息</h3>
                                <ul>
                                    <li>
                                        <label>课程顾问</label>
                                        <span>{{ profile.cascadeId || '--' }}</span>
                                    </li>
                                    <li>
                                        <label>咨询顾问</label>
                                        <span>{{ profile.cascadeId || '--' }}</span>
                                    </li>
                                    <li>
                                        <label>客户来源</label>
                                        <span>{{ profile.cascadeId || '--' }}</span>
                                    </li>
                                    <li>
                                        <label>添加时间</label>
                                        <span>{{ profile.cascadeId || '--' }}</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </section>
                    <section class="info">
                        <h1>基本信息</h1>
                        <el-row>
                            <el-col :span="12">
                                <label>微信昵称</label><span>123</span>
                            </el-col>
                            <el-col :span="12">
                                <label>客户姓名</label><span>123</span>
                            </el-col>
                            <el-col :span="12">
                                <label>客户手机</label><span>123</span>
                            </el-col>
                            <el-col :span="12">
                                <label>客户性别</label><span>123</span>
                            </el-col>
                            <el-col :span="12">
                                <label>客户生日</label><span>123</span>
                            </el-col>
                            <el-col :span="12">
                                <label>客户年龄</label><span>123</span>
                            </el-col>
                            <el-col :span="12">
                                <label>客户来源</label><span>123</span>
                            </el-col>
                            <el-col :span="12">
                                <label>咨询顾问</label><span>123</span>
                            </el-col>
                            <el-col :span="12">
                                <label>公众号</label><span>123</span>
                            </el-col>
                            <el-col :span="12">
                                <label>添加时间</label><span>123</span>
                            </el-col>
                        </el-row> 
                        <h1>卡劵信息(10)</h1>
                        <el-radio-group v-model="type">
                            <el-radio-button label="1">未使用(2)</el-radio-button>
                            <el-radio-button label="2">已使用(1)</el-radio-button>
                            <el-radio-button label="3">已过期(1)</el-radio-button>
                        </el-radio-group> 
                        <div>
                            <ul>
                                <li>脱毛免费体验劵</li>
                                <li>有效期:123132</li>
                                <li>使用规则:123132</li>
                                <li>
                                    <el-button @click="couponDetail">详情</el-button>
                                    <el-button type="primary" @click="useCoupon">使用</el-button>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import BreadcrumbNav from '../../../common/components/BreadcrumbNav.vue';
    import hideScroll from '../../../common/function/hideScroll';
    import NameGender from '../../../common/components/NameGender.vue';

    export default {
        data () {
            return {
                 breadcrumb: ['客户档案', '档案详情'],
                 fullscreenLoading: false,
                 type: '1',
                 profile: {
                     name: '李小斌',
                     gender: 1,
                     mobile: 13211112222
                 }
            }
        },
       
        computed: {
           
        },
        components: {
            BreadcrumbNav,
            NameGender
        },
        created () {
            // 详情页打开时，隐藏当窗口缩小时列表页出现的滚动条

            // this.getDetail();
            // // 从合同次卡打开的学员详情，定位的次卡tab
            // if (this.$store.state.student.detailFrom == 'timesCard') {
            //     this.currentInfo = 'TimesCard';
            // }
        },
        methods: {
            /**
             * 编辑客户 
             */
            modifyCustomer () {
                this.$store.commit('SHOW_ADD_CUSTOMER_DETIAL');
            },
            /**
             * 添加项目 
             */
            addItem () {
                this.$store.commit('SHOW_ADD_ITEM_DETIAL');
            },
            /**
             * 优惠卷详情 
             */
            couponDetail () {
                this.$store.commit('SHOW_COUPON_DETIAL');
            },
            /**
             * 使用优惠券 
             */
            useCoupon () {
                this.$confirm('确认使用优惠券?客户将在机构公众号收到使用提醒', '提醒', {
                    type: 'warning'
                })
                .then(() => {
                    console.log(12312);
                })
            },
            /**
             * 获取详情
             */
            getDetail () {
                this.fullscreenLoading = true;
                let params = {};
                params[this.detailcommonConfig.idName] = this.materialId;

                post(this.detailcommonConfig.getUrl, params)
                    .then((res) => {
                        this.info = res.data;
                        this.updateData(this.info);
                        this.fullscreenLoading = false;
                    })
                    .catch(() => {
                        this.fullscreenLoading = false;
                        setTimeout(this.enterList);
                    });
            },
            
            /**
             * 返回列表页
             */
            enterList () {
                this.$store.commit('HIDE_CUSTOMER_DETIAL');
            },

            /**
             * 打开添加跟进记录窗口
             */
            showAddFollowRecord () {
                this.addFollowRecordVisible = true;

                // 输入框获取焦点
                this.$nextTick(() => {
                    this.$refs.addFollowRecord.$children[0].$el.children[0].focus();
                });
            },

            /**
             * 添加跟进记录成功后刷新跟进记录列表和最近跟进时间
             */
            refreshFollowRecord () {
                this.currentInfo = 'FollowRecordList';
                this.broadcast('FollowRecordList', 'refresh');
                this.getDetail();
            },

            /**
             * 编辑学员/线索
             */
            edit () {
                this.$emit('editmaterial', {
                    id: this.materialId,
                    from: 'detailPage'
                });
            },

            /**
             * 转给同事
             */
            pass () {
                this.$emit('passtocolleague', this.materialId);
            },

            /**
             * 转为学员
             */
            setStudent () {
                this.$emit('setstudent', this.materialId);
            },

            /**
             * 删除学员/线索
             */
            remove () {
                this.$emit('remove', this.materialId);
            },

            /**
             * 释放线索
             */
            free () {
                this.$emit('free', this.materialId);
            },

            /**
             * 领取线索
             */
            fetch () {
                this.$emit('fetch', this.materialId);
            },

            /**
             * 标记线索为有效/无效
             *
             * @param {number} index 0-有效，1-无效
             */
            markInvalid (index) {
                this.$emit('setinvalid', {
                    id: this.materialId,
                    isValid: index
                })
            },

            /**
             * 查看学员余额
             */
            showBalance () {
                this.$store.commit('SHOW_BALANCE', this.materialId);
            }
        },
        destroyed () {
            hideScroll(false);
            this.enterList();
        }
    }
</script>