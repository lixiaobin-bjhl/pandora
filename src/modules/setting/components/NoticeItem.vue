<template>
    <el-dialog 
        title="提醒事项" 
        width="720px"
        v-loading="loading"
        custom-class="notice-item-dialog"
        :visible.sync="$store.state.notice.showNoticeItem"
        > 
        <el-form :model="form" ref="form" :rules="rules">
            <el-form-item label="项目名称" v-if="project">
                {{project.name}}
            </el-form-item>
            <div class="unit-item" 
                v-for="item, index in carePlans" 
                :key="index">
                <template v-if="item.modify">
                    <el-form-item  label="术前术后">
                        <el-radio-group v-model="item.afterOperate">
                            <el-radio :label="false">术前</el-radio>
                            <el-radio :label="true">术后</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="发送时间">
                        <el-row>
                            <el-row>
                                <el-col :span="15">
                                    <el-input 
                                        type="number" 
                                        v-model="item.period"
                                        placeholder="请输入发送时间"></el-input>
                                </el-col>
                                <el-col :span="5">
                                    &nbsp;{{item.afterOperate?'术后': '术前'}}-天
                                </el-col>
                            </el-row>
                        </el-row>
                    </el-form-item>
                    <el-form-item prop="newPwd" label="提醒事项">
                        <el-row>
                            <el-col :span="15">
                                <el-input v-model.trim="item.noticeDesc"
                                    type="textarea" 
                                    :maxlength="200" 
                                    :autosize="{minRows: 2,maxRows: 5}" 
                                    placeholder="请输入提醒事项"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    
                    <el-row :gutter="10">
                        <el-col :offset="12">
                        <el-button 
                            size="small" 
                            @click="cancelModify(item)">取消</el-button>
                        <el-button 
                            size="small" 
                            type="primary" 
                            :disabled="loading" 
                            @click="ok(item)">确认</el-button>
                        </el-col>
                    </el-row>
                </template>

                <template v-else>
                    <el-form-item prop="newPwd" label="发送时间" class="el-form-text clearfix">
                            {{item.noticeTime}}
                            <span class="pull-right">
                                <span class="icon el-icon-edit-outline" @click="editItem(item)"></span>
                                <span class="icon el-icon-delete" @click="delItem(item)"></span>
                            </span>
                    </el-form-item>
                    <el-form-item prop="newPwd" label="提醒事项" class="el-form-text">
                            <pre>{{item.noticeDesc}}</pre>
                    </el-form-item>
                </template>
            </div>

            <template v-if="showAddForm">
                <el-form-item prop="afterOperate" required label="术前术后">
                    <el-radio-group v-model="form.afterOperate">
                        <el-radio :label="false">术前</el-radio>
                        <el-radio :label="true">术后</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="period" label="发送时间" required>
                    <el-row>
                        <el-col :span="15">
                            <el-input 
                                type="number" 
                                v-model="form.period"
                                placeholder="请输入发送时间"></el-input>
                        </el-col>
                        <el-col :span="5">
                            &nbsp;{{form.afterOperate?'术后': '术前'}}-天
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item prop="noticeDesc" label="提醒事项" required>
                    <el-row>
                        <el-col :span="15">
                            <el-input v-model.trim="form.noticeDesc"
                                type="textarea" 
                                :maxlength="200" 
                                :autosize="{minRows: 2,maxRows: 5}" 
                                placeholder="请输入提醒事项"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-row :gutter="10">
                    <el-col :offset="13">
                        <el-button 
                            @click="cancelAdd" 
                            size="small">取消</el-button>
                        <el-button 
                            type="primary" 
                            size="small" 
                            :disabled="loading" 
                            @click="ok">确认</el-button>
                    </el-col>
                </el-row>
            </template>
            <div class="add-item-btn">
                <span @click="addItem">
                    <span class="el-icon-circle-plus"></span>
                    添加事项
                    </span>
            </div>
        </el-form>
        <div slot="footer">
            <el-button @click="cancel" type="primary">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>

    import config from '../config';
    import { modifyPwd, deleteCarePlan, saveOrUpdate, projectCarePlan} from '../request';

    export default   {
        data () {
            return  {
                rules: config.addCarePlanRules,
                carePlans: [],
                form: {
                    afterOperate: '',
                    period: '',
                    noticeDesc: ''
                },
                showAddForm: false,
                loading: false,
                visiable: false
            }
        },
        computed: {
            project () {
                return this.$store.state.notice.projectItem ;
            }
        },
        mounted () {
            this.projectCarePlan();
        },
        methods: {
            /**
             * 获取项目详情 
             */
            projectCarePlan () {
                this.loading = true;
                projectCarePlan({
                    id: this.project.projectId
                })
                .then((res)=> {
                    this.loading = false;
                    var data = res.data;
                    this.carePlans = data.carePlans;
                }, ()=> {
                    this.loading = false;
                });
            },
            /**
             * 添加项目 
             */
            addItem () {
                this.showAddForm = true;
            },
            cancelAdd () {
                this.$refs.form.resetFields();
                this.showAddForm = false;
            },
            /**
             * 编辑项目 
             */
            editItem (item) {
                this.$set(item, 'modify', true);
            },
            cancelModify (item) {
                this.$set(item, 'modify', false);
            },
            /**
             * 删除项目
             */
            delItem (item) {
                this.$confirm('确认删除该项目?', '提示', {
                    type: 'warning'
                }).then(() => {
                    deleteCarePlan({
                        id: item.id
                    })
                    .then(()=> {
                        toast('保存成功', 'success');
                    });
                });
            },
            /**
             * 取消项目设置
             */
            cancel () {
                this.$store.commit('HIDE_NOTICE_ITEM');
            },
            ok (item) {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        var project = this.project;
                        var form = this.form;
                        var params = {
                            afterOperate: form.afterOperate,
                            period: form.period,
                            noticeDesc: form.noticeDesc
                        };
                        // 编辑
                        if (item.id) {
                            var noticeDesc = item.noticeDesc;
                            var period = item.period;

                            if (period < 0) {
                                toast('发送时间不能小于等于0');
                                return;
                            } else if (period > 99999) {
                                toast('发送时间不能超过99999');
                                return;
                            } else if (!noticeDesc){
                                toast('请输入提醒事项');
                                return;
                            }
                            Object.assign(params, {
                                id: item.id,
                                afterOperate: item.afterOperate,
                                period: item.period,
                                noticeDesc: noticeDesc
                            });
                        }
                        this.loading = true;
                        saveOrUpdate(params)
                            .then((res)=> {
                                this.loading = false;
                                this.showAddForm = false;
                                this.projectCarePlan();
                                if (item.id) {
                                    this.cancelModify(item);
                                }  
                                toast('保存成功', 'success');
                            }, () => {
                                this.loading = false;
                            });
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                });
            }
        }
    }
</script>