<template>
    <div class="loving">
        <div class="select" v-if="list.length">
            <mt-cell
                v-if="list.length === 1"
                :title="list[index].name+ '随访计划'" 
                label="项目时间: 2013/5/16" 
                @click.native="selectItem" 
                >
            </mt-cell>
            <mt-cell
                v-if="list.length > 1"
                :title="list[index].name+ '随访计划'" 
                label="项目时间: 2013/5/16" 
                @click.native="selectItem" 
                is-link>
            </mt-cell>
        </div>
        <div class="timeline">
            <loadmore :auto-fill="false"  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
                <Timeline pending v-if="list && list.length">
                    <timeline-item
                        v-for="item, n in list[index].carePlans"
                        :color="n == list[index].carePlans.length - 1 ? '#6BC0B8' : '#8492A6'"
                        :key="n">
                        <p class="time">{{item.noticeTime}}{{item.createTime|date('yyyy-MM-dd')}}</p>
                        <p class="content" 
                            :class="{'active': n == list[index].carePlans.length - 1 }">
                            <pre>{{item.noticeDesc}}</pre>
                        </p>
                    </timeline-item>
                </Timeline>
            </loadmore>
        </div>
        <div v-if="!list.length" class="none-list"><span>暂无数据</span></div>
        <div class="care-notice">关怀计划已全部发送，祝您早日康复!</div>
    </div>
</template>

<script>

    import setTitle from '../../common/function/setTitle';
    import Timeline from 'src/common/components/timeline';
    import { patientCarePlan } from 'src/modules/setting/request';
    import { Indicator, Loadmore } from 'mint-ui';

    export default {
        data () {
            return {
                list: [],
                index: this.$root.index || 0,
                pageNum: 1,
                pageSize: 20,
                allLoaded: false,
                isShowMore: false
            }
        },
        created () {
            setTitle('关怀计划');
        },
        mounted () {
            this.fetchList();
        },
        methods: {
            /**
             * 关怀计划 
             */
            fetchList (mid) {
                Indicator.open('加载中…');
                patientCarePlan()
                    .then((res)=> {
                        Indicator.close();
                        this.$refs.loadmore.onBottomLoaded(mid);
                        this.list = this.list.concat(res.data.list);
                        var pageInfo = res.pageInfo;
                        if (pageInfo.pageNum < Math.ceil(pageInfo.count / pageInfo.pageSize)) {
                            this.allLoaded = false;
                        } else {
                            this.allLoaded = true;
                        } 
                    }, ()=> {
                        Indicator.close();
                        this.$refs.loadmore.onBottomLoaded(mid);
                    });
            },
            /** 
             * 获取更多优惠券 
             */
            loadBottom (mid) {
                this.pageNum ++;
                this.fetchList(mid);
            },
            /**
             * 选择项目 
             */
            selectItem () {
                this.$root.index = this.index;
                this.$root.porjectOption = this.list;
                this.$router.push('/selectItem');
            },
            /**
             * 展示更多
             */
            showMore () {
                this.isShowMore = !this.isShowMore;
            }
        },
        components: {
            Timeline,
            Loadmore,
            TimelineItem: Timeline.Item
        }
     }
</script>

<style lang="scss">
    .app {
        height: 100%;
    }
</style>