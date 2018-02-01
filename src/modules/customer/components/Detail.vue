<template>
    <transition name="slide-right" appear>
        <div class="material-detail-wrap">
            <div class="wrap-content" v-loading.fullscreen.lock="loading">
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
                <div class="module-content" v-if="info">
                    <section class="profile">
                       <div class="follow-flag" v-if="info.subscribe">已关注</div> 
                        <ul>
                            <li>
                                <img class="avatar80" :src="info.avatar|compressImage(80, 80)">
                                <name-gender 
                                    :name="info.name" 
                                    :isFemale="info.genderInfo.gender == 2" 
                                    :hideGender="info.genderInfo.gender === 0">
                                </name-gender>
                                <p class="phone">{{ info.mobile|phone}}</p>
                            </li>
                            <li class="key-info info-list">
                                <h3>主要信息</h3>
                                <ul>
                                    <li>
                                        <label>客户年龄</label>
                                        <span>{{ info.birthYearPeriod || '--' }}</span>
                                    </li>
                                    <li>
                                        <label>咨询顾问</label>
                                        <span>{{ info.consulterInfo.name || '--' }}</span>
                                    </li>
                                    <li>
                                        <label>客户来源</label>
                                        <span>{{ info.sourceInfo.name || '--' }}</span>
                                    </li>
                                    <li>
                                        <label>添加时间</label>
                                        <span>{{ info.createTime|date('yyyy-MM-dd')}}</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </section>
                    <section class="info">
                        <div class="info-wrap">
                            <h1>基本信息</h1>
                            <el-row>
                                <el-col :span="12">
                                    <label>微信昵称</label><span>{{info.wechatName}}</span>
                                </el-col>
                                <el-col :span="12">
                                    <label>客户姓名</label><span>{{info.name}}</span>
                                </el-col>
                                <el-col :span="12">
                                    <label>客户手机</label><span>{{info.mobile || '--'}}</span>
                                </el-col>
                                <el-col :span="12">
                                    <label>客户性别</label><span>{{info.genderInfo.name}}</span>
                                </el-col>
                                <el-col :span="12">
                                    <label>客户生日</label>
                                    <span>{{info.birthday |date('yyyy-MM-dd')}}</span>
                                </el-col>
                                <el-col :span="12">
                                    <label>客户年龄</label><span>{{info.birthYearPeriod || '--'}}</span>
                                </el-col>
                                <el-col :span="12">
                                    <label>客户来源</label><span>{{info.sourceInfo.name || '--'}}</span>
                                </el-col>
                                <el-col :span="12">
                                    <label>咨询顾问</label><span>{{info.consulterInfo.name || '--'}}</span>
                                </el-col>
                                <el-col :span="12">
                                    <label>公众号</label><span>{{info.subscribe ? '已关注': '未关注'}}</span>
                                </el-col>
                                <el-col :span="12">
                                    <label>添加时间</label><span>{{info.createTime|date('yyyy-MM-dd')}}</span>
                                </el-col>
                            </el-row>
                        </div> 
                        <h1>卡劵信息({{info.couponCnt}})</h1>
                        <el-radio-group v-model="type" size="small">
                            <el-radio-button label="1">未使用({{info.effectCoupons.cnt}})</el-radio-button>
                            <el-radio-button label="2">已使用({{info.usedCoupons.cnt}})</el-radio-button>
                            <el-radio-button label="3">已过期({{info.expiredCoupons.cnt}})</el-radio-button>
                        </el-radio-group>
                        <div class="coupon-list">
                            <template v-if="type == 1">
                                <el-row :gutter="10" 
                                    v-if="info.effectCoupons.datas.length">
                                    <el-col :span="12" 
                                        v-for="item, index in info.effectCoupons.datas" 
                                        :key="index">
                                        <div class="coupon">
                                            <span class="circle-solid left"></span>
                                            <span class="circle-solid right"></span>
                                            <h1 class="hospotial">欧若拉医疗美容医院</h1>
                                            <div>
                                                <ul class="coupon-detail">
                                                    <h1 class="title">{{item.couponName}}</h1>
                                                    <li>
                                                        <label>有效期</label>
                                                        <div>
                                                            {{item.beginTime | date('yyyy-MM-dd')}}~
                                                            {{item.endTime | date('yyyy-MM-dd')}}
                                                        </div>    
                                                    </li>
                                                    <li>
                                                        <label>使用规则</label>
                                                        <div><pre>{{item.ruleDesc}}</pre></div>
                                                    </li>
                                                </ul>
                                                <div class="btns">
                                                    <el-button 
                                                        type="default" 
                                                        size="small" 
                                                        @click="couponDetail(item)">详情</el-button>
                                                    <el-button 
                                                        type="primary" 
                                                        size="small" 
                                                        @click="useCoupon(item)">使用</el-button>
                                                </div> 
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <div class="none-list" 
                                    v-if="!info.effectCoupons.datas.length">
                                    <span>暂无未使用优惠劵</span>
                                </div>
                            </template>

                             <template v-if="type == 2">
                                <el-row :gutter="10" 
                                    v-if="info.usedCoupons.datas.length">
                                    <el-col :span="12" 
                                        v-for="item, index in info.usedCoupons.datas" 
                                        :key="index">
                                        <div class="coupon">
                                            <span class="circle-solid left"></span>
                                            <span class="circle-solid right"></span>
                                            <h1 class="hospotial">欧若拉医疗美容医院</h1>
                                            <div>
                                                <ul class="coupon-detail">
                                                    <h1 class="title">{{item.couponName}}</h1>
                                                    <li>
                                                        <label>有效期</label>
                                                        <div>
                                                            {{item.beginTime | date('yyyy-MM-dd')}}~
                                                            {{item.endTime | date('yyyy-MM-dd')}}
                                                        </div>    
                                                    </li>
                                                    <li>
                                                        <label>使用规则</label>
                                                        <div><pre>{{item.ruleDesc}}</pre></div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <div class="none-list" 
                                    v-if="!info.effectCoupons.datas.length">
                                    <span>暂无已使用优惠劵</span>
                                </div>
                            </template>

                             <template v-if="type == 3">
                                <el-row :gutter="10" 
                                    v-if="info.expiredCoupons.datas.length">
                                    <el-col :span="12" 
                                        v-for="item, index in info.expiredCoupons.datas" 
                                        :key="index">
                                        <div class="coupon">
                                            <span class="circle-solid left"></span>
                                            <span class="circle-solid right"></span>
                                            <h1 class="hospotial">欧若拉医疗美容医院</h1>
                                            <div>
                                                <ul class="coupon-detail">
                                                    <h1 class="title">{{item.couponName}}</h1>
                                                    <li>
                                                        <label>有效期</label>
                                                        <div>
                                                            {{item.beginTime | date('yyyy-MM-dd')}}~
                                                            {{item.endTime | date('yyyy-MM-dd')}}
                                                        </div>    
                                                    </li>
                                                    <li>
                                                        <label>使用规则</label>
                                                        <div><pre>{{item.ruleDesc}}</pre></div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <div class="none-list" 
                                    v-if="!info.effectCoupons.datas.length">
                                    <span>暂无已过期优惠劵</span>
                                </div>
                            </template>
                        </div>
                        <h1>项目使用({{info.patientProjects.cnt}})</h1>
                        <div class="timeline">
                            <Timeline pending v-if="info.patientProjects.datas.length">
                                <timeline-item
                                    v-for="item, index in info.patientProjects.datas"
                                    v-if="(index >= 3 && isShowMore ) || index < 3" 
                                    :key="index" >
                                    <p class="time clearfix">
                                        {{item.operatDate|date('yyyy-MM-dd')}}&nbsp;&nbsp;{{item.projectInfo.name}}
                                        <span class="pull-right icon-opt">
                                            <icon name="edit" scale="2" @click.native="updateProject(item)"></icon>
                                            <icon name="delete" scale="2" @click.native="deleteProject(item)"></icon>
                                        </span>
                                    </p>
                                    <p class="content">
                                        医生：<span class="text-gray-light">{{item.doctorInfo.name}}</span>
                                    </p>
                                </timeline-item>
                                <TimelineItem  
                                    color="#6BC0B8" 
                                    v-if="info.patientProjects.datas.length > 3">
                                    <a href="javascript:;" 
                                    @click="showMore">
                                    {{isShowMore ? '收起更多': '展开更多'}}</a>
                                </TimelineItem>
                            </Timeline>
                            <div class="none-list" v-else><span>暂无项目信息</span></div>
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
    import { getDetial, deleteProject, useCoupon } from '../request';
    import Timeline from 'src/common/components/timeline';

    export default {
        data () {
            return {
                 breadcrumb: ['客户档案', '档案详情'],
                 loading: false,
                 isShowMore: false,
                 type: '1',
                 info: null
            }
        },
        computed: {
            id () {
                return this.$store.state.customer.id;
            }
        },
        components: {
            BreadcrumbNav,
            Timeline,
            TimelineItem: Timeline.Item,
            NameGender
        },
        mounted () {
            this.getDetial();
            this.bindEvent();
        },
        methods: {
            /**
             * 删除项目 
             */
            deleteProject (item) {
                this.$confirm('确认删除项目', '提醒', {
                    type: 'warning'
                })
                .then(() => {
                   deleteProject({
                       id: item.id
                   })
                   .then(()=> {
                       toast('保存成功', 'success');
                       this.getDetial();
                   });
                });
            },
            /**
             * 更新项目
             */
            updateProject (item) {
                this.$store.commit('SHOW_ADD_ITEM_DETIAL', {
                    id: this.id,
                    project: item
                });
            },
            showMore () {
                this.isShowMore = !this.isShowMore;
            },
            /**
             * 绑定事件 
             */
            bindEvent () {
                this.$on('updatedetail', ()=> {
                    this.getDetial();
                });
            },
            /**
             * 编辑客户 
             */
            modifyCustomer () {
                this.$store.commit('SHOW_ADD_CUSTOMER_DETIAL', this.id);
            },
            /**
             * 添加项目 
             */
            addItem () {
                this.$store.commit('SHOW_ADD_ITEM_DETIAL', {
                    id: this.id,
                    project: null
                });
            },
            /**
             * 优惠卷详情 
             */
            couponDetail (item) {
                this.$store.commit('SHOW_COUPON_DETIAL', item);
            },
            /**
             * 使用优惠券 
             */
            useCoupon (item) {
                this.$confirm('确认使用优惠券?客户将在机构公众号收到使用提醒', '提醒', {
                    type: 'warning'
                })
                .then(() => {
                    useCoupon({
                        id: item.id
                    })
                    .then(()=> {
                        toast('保存成功', 'success');
                        this.getDetial();
                    })
                });
            },
            /**
             * 获取详情
             */
            getDetial () {
                this.loading = true;
                getDetial({
                    id: this.id
                })
                    .then((res) => {
                        this.info = res.data;
                        this.loading = false;
                    })
                    .catch(() => {
                        this.loading = false;
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