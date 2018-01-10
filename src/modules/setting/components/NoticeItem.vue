<template>
    <el-dialog 
        title="提醒事项" 
        width="720px"
        custom-class="notice-item-dialog"
        :visible.sync="$store.state.notice.showNoticeItem"
        > 
        <el-form :model="form" ref="form" :rules="addAccountRule">
            <div class="unit-item" 
                v-for="item, index in itemUnits" :key="index">
                <template v-if="item.modify">
                    <el-form-item prop="newPwd" label="发送时间" required>
                        <el-row>
                            <el-col :span="15">
                                <el-input placeholder="请输入发送时间"></el-input>
                            </el-col>
                            <el-col :span="5">
                                &nbsp;术后-天
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item prop="newPwd" label="提醒事项" required>
                        <el-row>
                            <el-col :span="15">
                                <el-input v-model.trim="form.remark"
                                    :disabled="accountItem ? true: false" 
                                    type="textarea" 
                                    :maxlength="100" 
                                    :autosize="{minRows: 2,maxRows: 5}" 
                                    placeholder="请输入备注"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    
                    <el-row :gutter="10">
                        <el-col :offset="12">
                        <el-button @click="cancelModify(item)">取消</el-button>
                        <el-button type="primary" :disabled="loading" @click="ok">确认</el-button>
                        </el-col>
                    </el-row>
                </template>

                <template v-else>
                    <el-form-item prop="newPwd" label="发送时间" class="el-form-text clearfix">
                            术前1天
                            <span class="pull-right">
                                <span class="icon el-icon-edit-outline" @click="editItem(item)"></span>
                                <span class="icon el-icon-delete" @click="delItem(item)"></span>
                            </span>
                    </el-form-item>
                    <el-form-item prop="newPwd" label="提醒事项" class="el-form-text">
                            术后会有一定红肿，是正常情况。术后会有一定红肿，是正常情况。
                                                术后会有一定红肿，是正常情况。术后会有一定红肿，是正常情况。
                            术后会有一定红肿，是正常情况。术后会有一定红肿，是正常情况。
                    </el-form-item>
                </template>
            </div>

            <el-form-item prop="newPwd" label="术前术后">
                <el-radio-group v-model="form.radio">
                    <el-radio :label="3">术前</el-radio>
                    <el-radio :label="6">术后</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="newPwd" label="发送时间" required>
                <el-row>
                    <el-col :span="15">
                        <el-input placeholder="请输入发送时间"></el-input>
                    </el-col>
                    <el-col :span="5">
                        &nbsp;术后-天
                    </el-col>
                 </el-row>
            </el-form-item>
            <el-form-item prop="newPwd" label="提醒事项" required>
                <el-row>
                    <el-col :span="15">
                        <el-input v-model.trim="form.remark"
                            :disabled="accountItem ? true: false" 
                            type="textarea" 
                            :maxlength="100" 
                            :autosize="{minRows: 2,maxRows: 5}" 
                            placeholder="请输入备注"></el-input>
                    </el-col>
                 </el-row>
            </el-form-item>

             <el-row :gutter="10">
                <el-col :offset="12">
                   <el-button @click="cancel">取消</el-button>
                   <el-button type="primary" :disabled="loading" @click="ok">确认</el-button>
                </el-col>
            </el-row>
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
    import { modifyPwd } from '../request';

    export default   {
        props: {
            accountItem: {}
        },
        data () {
            return  {
                addAccountRule: config.addAccountRule,
                form: {
                    newPwd: '',
                },
                itemUnits: [
                    {}, {}
                ],
                loading: false,
                visiable: false
            }
        },
        methods: {
            /**
             * 添加项目 
             */
            addItem () {

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
                });
            },
            /**
             * 取消项目设置
             */
            cancel () {
                this.$store.commit('HIDE_NOTICE_ITEM');
            },
            ok () {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        var accountItem = this.accountItem;
                        var form = this.form;
                        var params = {
                             id: accountItem.id,
                             newPwd: form.newPwd
                        };
                        modifyPwd(params)
                            .then((res)=> {
                                this.visiable = false;
                                this.$emit('save');
                                this.$refs.modal.close();
                                toast('保存成功', 'success');
                            }, () => {
                                this.changeLoading();
                            });
                    } else {
                        this.$Message.error('表单验证失败!');
                        this.changeLoading();
                    }
                });
            }
        }
    }
</script>