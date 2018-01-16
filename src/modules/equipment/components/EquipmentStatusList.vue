<template>
      <el-dialog 
        title="报装详情"
        width="640px"
        custom-class="equipment-status-list"
        :visible.sync="$store.state.equipment.showEquipmentStatusListState"
        >
        <el-row>
            <el-col :span="8">
                <th>时间</th>
            </el-col>
            <el-col :span="6">
                <th>状态</th>
            </el-col>
            <el-col :span="10">
                <th>备注</th>
            </el-col>
        </el-row>

        <el-row class="status-item">
            <el-col :span="8">
                2018-10-12
            </el-col>
            <el-col :span="6">
                已完成
            </el-col>
            <el-col :span="10">
                <el-tooltip placement="top">
                    <div slot="content">
                        <pre>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</pre>
                    </div>
                    <div class="remark">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
                </el-tooltip>
            </el-col>
        </el-row>

        <el-row class="status-item">
            <el-col :span="8">
                2018-10-12
            </el-col>
            <el-col :span="6">
                已完成
            </el-col>
            <el-col :span="10">
                <el-tooltip placement="top">
                    <div slot="content">
                        <pre>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</pre>
                    </div>
                    <div class="remark">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
                </el-tooltip>
            </el-col>
        </el-row>

        <el-row class="status-item">
            <el-col :span="8">
                2018-10-12
            </el-col>
            <el-col :span="6">
                已完成
            </el-col>
            <el-col :span="10">
                <el-tooltip placement="top">
                    <div slot="content">
                        <pre>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</pre>
                    </div>
                    <div class="remark">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
                </el-tooltip>
            </el-col>
        </el-row>

        <el-row class="status-item">
            <el-col :span="8">
                2018-10-12
            </el-col>
            <el-col :span="6">
                已完成
            </el-col>
            <el-col :span="10">
                <el-tooltip placement="top">
                    <div slot="content">
                        <pre>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</pre>
                    </div>
                    <div class="remark">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
                </el-tooltip>
            </el-col>
        </el-row>
        <div class="add-btn-link" v-if="!addStatus" @click="add">
            <span class="el-icon-circle-plus"></span><i>更新状态</i>
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
                :disabled="loading || teacherItem? true : false" 
                @click="ok" 
                type="primary">确定</el-button>
        </div>
      </el-dialog>
</template>

<script>

    export default {
        data () {
            return {
                addStatus: false,
                form: {
                    status: '',
                    remark: ''
                }
            }
        },
        methods: {
            /**
             * 添加状态 
             */
            add () {
                this.addStatus = true;
            },
            /**
             * 取消添加状态 
             */
            cancel () {
                this.addStatus = false;
            }
        }
    };
</script>