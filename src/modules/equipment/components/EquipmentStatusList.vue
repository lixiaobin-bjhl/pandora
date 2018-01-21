<template>
      <el-dialog 
        title="报装详情"
        width="640px"
        custom-class="equipment-status-list"
        :visible.sync="$store.state.equipment.showEquipmentStatusListState"
        >
        <div class="status-time-line" v-if="list && list.length"> 
            <ul class="caption">
                <li>时间</li>
                <li>状态</li>
            </ul> 
            <Timeline pending>
                <timeline-item
                    color="#46a0f0"
                    v-for="item, index in list"
                    v-if="(index >= 3 && isShowMore ) || index < 3" 
                    :key="index" >
                    <p class="time">{{item.auditTime|date('yyyy-MM-dd')}}<br>{{item.auditTime|date('HH:mm')}}</p>
                    <p class="status-str">{{item.statusStr}}</p>
                    <p class="content">申请人：{{applyItem.applyUserName}}     校区：{{applyItem.schoolName}}    套数：{{applyItem.applyCount}}<pre>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</pre></p>
                </timeline-item>
                <TimelineItem  
                    color="#46a0f0" 
                    v-if="list.length >= 3">
                    <a href="javascript:;" 
                    @click="showMore">
                    {{isShowMore ? '收起更多': '展开更多'}}</a>
                </TimelineItem>
            </Timeline>
        </div>
        <div class="none-list" v-if="list && !list.length"><span>暂没有报装记录</span></div>

        <el-form 
            :model="form" 
            ref="form"
            :rules="auditRules"
            v-if="addStatus && $root.hasAuth(3)"
            label-width="80px"
            label-position="right" 
            >
            <el-form-item label="审批状态" prop="status">
                <el-select
                v-model="form.status"
                clearable
                style="width: 180px;" 
                placeholder="请选择审批状态">
                    <el-option label="采购确认" :value="5"></el-option>
                    <el-option label="已发货" :value="6"></el-option>
                    <el-option label="已安装" :value="7"></el-option>
                </el-select>
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
        <div slot="footer" 
            v-if="addStatus && $root.hasAuth(3)">
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
    import {add, auditList} from '../request';
    import config from '../config';

    export default {
        data () {
            return {
                addStatus: true,
                loading: false,
                isShowMore: false,
                list: [],
                auditRules: config.auditRules,
                form: {
                    status: '',
                    remark: ''
                }
            }
        },
        computed: {
            applyItem () {
                return this.$store.state.equipment.applyItem;
            }
        },
        mounted () {
            this.getAuditList();
        },
        methods: {
            /**
             * 获取审核状态列表 
             */
            getAuditList () {
                auditList({
                    applyId: this.applyItem.id
                })
                .then((res)=> {
                    this.list = res.data;
                })
            },
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
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        var applyItem = this.applyItem;
                        var form = this.form;
                        var params = {
                           id: applyItem.id,
                           status: form.status,
                           remark: form.remark
                        };
                        this.loading = true;
                        add(params)
                            .then((res)=> {
                                this.$emit('save');
                                this.loading = false;
                                toast('保存成功', 'success');
                                this.cancel();
                            }, ()=> {
                                this.loading = false;
                            });
                    } else {
                        toast('表单验证失败!');
                    }
                });
            },
            /**
             * 取消添加状态 
             */
            cancel () {
               this.$store.commit('HIDE_EQUIPMENT_STATUS_LIST');
            }
        },
        components: {
            Timeline,
            TimelineItem: Timeline.Item
        }
    };
</script>