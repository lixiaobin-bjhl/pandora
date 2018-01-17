<template>
      <el-dialog 
        title="报装详情"
        width="640px"
        custom-class="equipment-status-list"
        :visible.sync="$store.state.equipment.showEquipmentStatusListState"
        >
        <div class="status-time-line"> 
            <ul class="caption">
                <li>时间</li>
                <li>状态</li>
            </ul> 
            <Timeline pending>
                <timeline-item
                    v-for="item, index in list"
                    v-if="(index >= 3 && isShowMore ) || index < 3" 
                    :key="index" >
                    <p class="time">1976-12-12<br>12:55</p>
                    <p class="status-str">提出申请</p>
                    <p class="content">申请人：张艺     校区：厦门思明校区    套数：3<pre>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</pre></p>
                </timeline-item>
                <TimelineItem>
                    <a href="javascript:;" 
                    @click="showMore">
                    {{isShowMore ? '收起更多': '展开更多'}}</a>
                </TimelineItem>
            </Timeline>
            <div class="none-list" v-if="list && !list.length"><span>暂没有报装记录</span></div>
        </div>

        <el-form 
            :model="form" 
            ref="form"
            v-if="addStatus"
            label-width="80px"
            label-position="right" 
            >
            <el-form-item label="状态">
                <el-input
                v-model="form.status"
                placeholder="请输入状态"
                style="width: 240px;"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input
                v-model="form.remark"
                type="textarea" 
                :maxlength="200" 
                :autosize="{minRows: 2,maxRows: 5}" 
                placeholder="请输入报装申请具体信息"
                ></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" v-if="addStatus">
            <el-button 
                @click="cancel">取消</el-button>
            <el-button 
                :disabled="loading ? true : false" 
                @click="ok" 
                type="primary">确定</el-button>
        </div>
      </el-dialog>
</template>

<script>

    import Timeline from 'src/common/components/timeline/index';

    export default {
        data () {
            return {
                addStatus: true,
                loading: false,
                isShowMore: false,
                list: [{},{},{},{},{},{},{}, {}, {}],
                form: {
                    status: '',
                    remark: ''
                }
            }
        },
        methods: {
            /**
             * 展示更多
             */
            showMore () {
                this.isShowMore = !this.isShowMore;
            },
            /**
             * 添加状态 
             */
            add () {
                this.addStatus = true;
            },
            ok () {
                
            },
            /**
             * 取消添加状态 
             */
            cancel () {
                this.addStatus = false;
            }
        },
        components: {
            Timeline,
            TimelineItem: Timeline.Item
        }
    };
</script>