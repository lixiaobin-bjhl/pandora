<template>
    <div class="loving">
        <div class="select">
            <mt-cell 
                title="双眼皮随访计划" 
                label="周期: 2013/5/12-2015/6/6" 
                @click.native="selectItem" 
                is-link></mt-cell>
        </div>
        <div class="timeline">
            <Timeline pending v-if="list && list.length">
                <timeline-item
                    color="#6BC0B8"
                    v-for="item, index in list"
                    v-if="(index >= 3 && isShowMore ) || index < 3" 
                    :key="index" >
                    <p class="time">1976-12-12 12:55</p>
                    <p class="content">申请人：张艺     校区：厦门思明校区    套数：3</p>
                </timeline-item>
                <TimelineItem  
                    color="#6BC0B8" 
                    v-if="list.length >= 3">
                    <a href="javascript:;" 
                    @click="showMore">
                    {{isShowMore ? '收起更多': '展开更多'}}</a>
                </TimelineItem>
            </Timeline>
        </div>
        <div v-if="!list.length" class="none-list"><span>暂无数据</span></div>
    </div>
</template>

<script>

    import setTitle from '../../common/function/setTitle';
    import Timeline from 'src/common/components/timeline';

    export default {
        data () {
            return {
                list: [{}, {}],
                isShowMore: false
            }
        },
        created () {
            setTitle('关怀计划');
        },
        methods: {
            /**
             * 选择项目 
             */
            selectItem () {
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
            TimelineItem: Timeline.Item
        }
     }
</script>

<style lang="scss">
    .app {
        height: 100%;
    }
</style>