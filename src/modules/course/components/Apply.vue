<template>
      <el-dialog 
        :title="isShowDetail ? '课程详情':'申请课程'"
        width="640px"
        custom-class="apply-course-dialog"
        :visible.sync="$store.state.course.showApplyCourseState"
        >
        <el-form 
            :model="form" 
            ref="form"
            label-width="100px"
            class="detail-from"
            label-position="right">
            <h2 v-if="!isShowDetail">课程信息</h2>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item
                        prop="newPwd" 
                        label="课程名称">
                        xxxxx
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="校区" prop="teacherName">
                        xxxxx
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="newPwd" 
                        label="封面">
                        <el-upload
                            :disabled="true"
                            action="/common/upload.json">
                            <div class="upload-btn">
                                <div v-show="form.coverUrl" 
                                    class="cover-url" 
                                    :style="{backgroundImage:`url(${form.coverUrl})`}">
                                    <a href="javascript:;">修改</a>
                                </div>
                            </div>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="newPwd" 
                        label="主讲老师">
                        xxxxx
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="科目" prop="teacherName">
                        xxxx
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="newPwd" 
                        label="教室">
                        xxxx
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="newPwd" 
                        label="上课日期">
                        2018-12-12
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="newPwd" 
                        label="上课时间段">
                        12:00~13:00
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="newPwd" 
                        label="时长" v-if="form.value4">
                        {{(form.value4[1]-form.value4[0])/1000/60|minute}}
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="详情" prop="remark">
                        <pre style="display: inline;">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</pre>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-form 
            :model="form" 
            ref="form"
            label-position="right"
            label-width="100px"
            :rules="rules"
            v-if="!isShowDetail"
            >
            <h2 class="apply-title">申请信息</h2>
            <el-form-item label="上课教室" prop="teacherName">
                <el-select
                    placeholder="请选择校区"
                    style="width: 280px;"
                    v-model.trim="form.teacherName">
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model.trim="form.remark"
                    type="textarea" 
                    :maxlength="200" 
                    :autosize="{minRows: 2,maxRows: 5}" 
                    placeholder="请输入申请备注"></el-input>
            </el-form-item>
         </el-form>
        <div slot="footer" v-if="!isShowDetail">
            <el-button @click="cancel">取消</el-button>
            <el-button 
                :disabled="loading" 
                @click="ok" 
                type="primary">确定</el-button>
        </div>
      </el-dialog>
</template>

<script>

    import { getAddressSuggestion } from '../request';

    export default {
        data () {
            return {
                loading: false,
                form: {},
                rules: {}
            }
        },
        computed: {
            applyItem () {
                return this.$store.state.course.course;
            },
            isShowDetail () {
                return this.$store.state.course.isShowDetail;
            }
        },
        mounted () {
            
        },
        methods: {
            /**
             * 选择地址
             */
            selectAddress (item) {
                setTimeout(()=> {
                    this.form.address = item.city + item.city + item.name;
                });
            },
            /**
             * 获取地址
             */
            getAddress (query, cb) {
                getAddressSuggestion({
                    query
                })
                .then((res)=> {
                    cb(res.result);
                });
            },
            /**
             * 取消添加
             */
            cancel () {
                this.$store.commit('HIDE_APPLY_COURSE');
            },
            ok () {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        var accountItem = this.accountItem;
                        var isEdit = accountItem ? true : false;
                        var form = this.form;
                        var params = {
                            accountName: form.accountName,
                            userName: form.userName,
                            roleType: form.roleType,
                            remark: form.remark,
                            agencyIds: form.agencyIds.join(','),
                            rtmType: form.rtmType
                        };
                        if (isEdit) {
                            Object.assign(params, {
                                id: accountItem.id
                            });
                        } else {
                            Object.assign(params, {
                                password: form.password
                            });
                        }
                        var request = isEdit ? edit : add;
                        request(params)
                            .then((res)=> {
                                this.visiable = false;
                                this.$emit('save');
                                this.$refs.modal.close();
                                toast('保存成功', 'success');
                            }, () => {
                                this.changeLoading();
                            });
                    } else {
                        toast('表单验证失败!');
                    }
                });
            }
        }
    };
</script>