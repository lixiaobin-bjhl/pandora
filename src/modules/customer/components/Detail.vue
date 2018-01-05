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
                </el-row>
                <!-- <div class="module-content">
                    <section class="profile">
                        <ul>
                            <li>
                                <img class="avatar90" :src="profile.imgUrl | compressImage(90, 90)">
                                <name-gender :name="profile.name" :isFemale="profile.gender == 1" :hideGender="profile.gender === null"></name-gender>
                                <p class="phone">{{ profile.mobile | phone}}</p>
                            </li>
                            <li class="tags">
                                <h3>标签</h3>
                                <p v-if="profile.tags.length">
                                    <el-tag
                                        v-for="tag in profile.tags"
                                        :key="tag"
                                        type="gray">{{ tag }}</el-tag>
                                </p>
                                <p class="no-tag" v-else>暂无标签</p>
                            </li>
                            <li class="key-info info-list">
                                <h3>关键信息</h3>
                                <ul v-if="type == 2">
                                    <li>
                                        <label>最后跟进日期</label>
                                        <span>{{ profile.lastFollowTime | date('yyyy-MM-dd') || '--' }}</span>
                                    </li>
                                    <li>
                                        <label>最后操作日期</label>
                                        <span>{{ profile.lastRemindTime | date('yyyy-MM-dd') || '--' }}</span>
                                    </li>
                                    <li>
                                        <label>剩余跟进时间</label>
                                        <span>{{ profile.remainingDayNum ? (profile.remainingDayNum + '天') : '--' }}</span>
                                    </li>
                                    <li>
                                        <label>来源</label>
                                        <span>{{ profile.consultSource || '--' }}</span>
                                    </li>
                                    <li>
                                        <label>跟进状态</label>
                                        <span>{{ profile.consultStatus || '--' }}</span>
                                    </li>
                                    <li>
                                        <label>意向级别</label>
                                        <span>{{ profile.intensionLevel || '--' }}</span>
                                    </li>
                                    <li>
                                        <label>课程顾问</label>
                                        <span>{{ profile.cascadeId || '--' }}</span>
                                    </li>
                                </ul>
                                <ul v-else>
                                    <li>
                                        <label>最后跟进日期</label>
                                        <span>{{ profile.lastFollowTime | date('yyyy-MM-dd') || '--' }}</span>
                                    </li>
                                    <li>
                                        <label>最后操作日期</label>
                                        <span>{{ profile.lastRemindTime | date('yyyy-MM-dd') || '--' }}</span>
                                    </li>
                                    <li>
                                        <label>班主任</label>
                                        <span>{{ profile.headTeacher || '--' }}</span>
                                    </li>
                                    <li>
                                        <label>来源</label>
                                        <span>{{ profile.source || '--' }}</span>
                                    </li>
                                    <li>
                                        <label>储值账户余额</label>
                                        <span v-if="profile.balance !== null" class="clickable-text clickable-text-blue" @click="showBalance">{{ profile.balance | currency }}</span>
                                        <span v-else>--</span>
                                    </li>
                                    <li>
                                        <label>状态</label>
                                        <span>{{ profile.status | stuStatus }}</span>
                                    </li>
                                    <li>
                                        <label>课程顾问</label>
                                        <span>{{ profile.cascadeId || '--' }}</span>
                                    </li>
                                    <li>
                                        <label>学生个人中心</label>
                                        <span>{{ profile.stuCenterBindStatus || '--' }}</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </section>
                    <section class="add-follow-record-wrap" v-if="canEdit">
                        <el-input v-if="!addFollowRecordVisible" placeholder="添加跟进记录..." @focus="showAddFollowRecord"></el-input>
                        <add-follow-record ref="addFollowRecord" v-if="addFollowRecordVisible" :type="type" :id="materialId" @addsuccess="refreshFollowRecord"></add-follow-record>
                    </section>
                    <section class="info">
                        <el-tabs v-model="currentInfo">
                            <el-tab-pane
                                v-for="item in detailcommonConfig.tabs"
                                :key="item.name"
                                :label="item.showName"
                                v-if="(item.auth && !$TX_NOAUTH[item.auth]) || !item.auth"
                                :name="item.name"
                            ></el-tab-pane>
                        </el-tabs>
                        <component :is="currentInfo" :id="materialId" :type="type" :info="componentInfo"></component>
                    </section>
                </div> -->
            </div>
        </div>
    </transition>
</template>

<script>
    import BreadcrumbNav from '../../../common/components/BreadcrumbNav.vue';
    import hideScroll from '../../../common/function/hideScroll';

    export default {
        data () {
            return {
                 breadcrumb: ['客户档案', '档案详情'],
                 fullscreenLoading: false,
            }
        },
       
        computed: {
           
        },
        components: {
            BreadcrumbNav
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
             * 格式化信息数据
             */
            updateData (data) {
                let basicInfo = [];
                let otherInfo = [];

                if (this.type == 2) {
                    this.profile.remainingDayNum = data.remainingDayNum;
                }
                else {
                    this.profile.balance = data.balance;
                    this.profile.status = data.status;
                    this.profile.headTeacher = data.headTeacher;
                    this.profile.stuCenterBindStatus = data.stuCenterBindStatus === 1 ? '已绑定' : '未绑定';
                }
                this.profile.lastRemindTime = data.lastRemindTime;
                this.profile.lastFollowTime = data.lastFollowTime;

                data.fields.forEach((field) => {
                    if (field.type == 1 && field.values && field.values.content) {
                        if (field.key == 'name') {
                            this.profile.name = field.values.content;
                        }

                        if (field.key == 'mobile') {
                            this.profile.mobile = field.values.content;
                        }
                    }

                    if (field.type == 2 && field.values && field.values.id !== null) {
                        if (field.key == 'sex') {
                            this.profile.gender = field.values.id;
                        }
                        if (['source', 'cascadeId', 'intensionLevel', 'consultStatus', 'consultSource'].indexOf(field.key) > -1) {
                            this.profile[field.key] = field.values.value;
                        }
                    }

                    if (field.type == 3 && field.values
                        && field.values.options && field.values.options[0]) {
                        var optionNames = [];
                        field.values.options.forEach((option) => {
                            optionNames.push(option.value);
                        });

                        field['optionStr'] = optionNames.join(', ');
                    }

                    if (field.type == 8 && field.key == 'avatarUrl,storageId'
                        && field.values) {
                        this.profile.imgUrl = field.values.url;
                    }

                    if (field.type == 10 && field.values && field.values.tags) {
                        this.profile.tags = field.values.tags;
                    }

                    if (field.key != 'avatarUrl,storageId') {
                        if (field.sectionId == 1) {
                            basicInfo.push(field);
                        }
                        else {
                            otherInfo.push(field);
                        }
                    }
                });

                // 提前清空，避免数据重复
                this.detailData = [];
                this.detailData.push({sectionId:1, label: '基本信息', data: basicInfo});
                this.detailData.push({sectionId:2, label: '其他信息', data: otherInfo});
            },

            /**
             * 返回列表页
             */
            enterList () {
                this.$store.commit('HIDE_CUSTOMER_DETAIL');
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