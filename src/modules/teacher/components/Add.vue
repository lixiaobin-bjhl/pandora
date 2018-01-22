<template>
      <el-dialog 
        :title="title"
        width="640px"
        v-loading="loading"
        :visible.sync="$store.state.teacher.showAddTeacherState"
        >       
        <el-form 
            :model="form" 
            ref="form"
            label-width="80px"
            label-position="right"
            :class="{'detail-from': teacherItem}"
            :rules="(teacherItem && !isModified) || teacherItem ?  {} : addTeacherRule">
           <el-row :gutter="10">
               <el-col :span="24">
                    <el-form-item 
                        label="教师姓名" 
                        prop="name">
                        <template v-if="!teacherItem || isModified">
                            <el-input 
                            v-model.trim="form.name" 
                            :maxlength="20" 
                            placeholder="教师姓名(20字内)"></el-input>
                        </template>
                        <template v-else>
                            xxxx
                        </template> 
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="科目" prop="subjectType">
                        <template v-if="!teacherItem || isModified">
                            <el-select
                            placeholder="请选择科目"
                            v-model.trim="form.subjectType">
                                <el-option
                                    v-for="item,index in subjectOption"
                                    :label="item.name"
                                    :value="item.id"
                                    :key="index">
                                </el-option>
                            </el-select>
                        </template>  
                        <template v-else>
                            xxxx
                        </template> 
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="教师类型" prop="teacherType">
                        <template v-if="!teacherItem || isModified">
                            <el-select
                                placeholder="请选择教师类型"
                                v-model.trim="form.teacherType"></el-select>
                        </template>
                        <template v-else>
                            xxxx
                        </template> 
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="所属校区" prop="schoolId">
                        <template v-if="!teacherItem || isModified">
                            <campus-filter
                                placeholder="请选择校区"
                                v-model="form.schoolId"
                                :name="form.schoolName"
                                width="100%"
                                >
                            </campus-filter>
                        </template>
                        <template v-else>
                            xxxx
                        </template> 
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注" prop="remark">
                        <template v-if="!teacherItem || isModified">
                            <el-input v-model.trim="form.remark"
                                type="textarea" 
                                :maxlength="100" 
                                :autosize="{minRows: 2,maxRows: 5}" 
                                placeholder="请输入备注"></el-input>
                        </template>
                        <template v-else>
                            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                        </template> 
                    </el-form-item>
                </el-col>
           </el-row>
        </el-form>
        <div slot="footer" v-if="!teacherItem || isModified">
            <el-button @click="reset">重置</el-button>
            <el-button 
                :disabled="loading" 
                @click="ok" 
                type="primary">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

    import config from '../config';
    import { detail, saveOrUpdate} from '../../account/request';
    import CampusFilter from 'src/common/components/CampusFilter.vue';
    import subjectOption from '../../../common/config/subjectOption';
    
    var timer = null;

    export default   {
        computed: {
            teacherItem () {
                return this.$store.state.teacher.teacher;
            },
            isModified () {
                return this.$store.state.teacher.isModified;
            },
            title () {
                if (this.isModified) {
                    return '编辑教师';
                } else {
                    if (this.teacherItem) {
                        return '教师详情';
                    } else {
                        return '添加教师';
                    }
                }
            }
        },
        data () {
            return  {
                addTeacherRule: config.addTeacherRule,
                subjectOption,
                form: {
                    name: '',
                    subjectType: '',
                    schoolId: '',
                    remark: '',
                    teacherType: ''
                },
                loading: false,
                visiable: false
            }
        },
        mounted () {
            var teacherItem = this.teacherItem;
            if (teacherItem) {
                detail({
                    id: teacherItem.id
                })
                .then((res)=> {
                    Object.assign(this.form, res.data);                    
                });
            }
        },
        watch: {
            visiable (value) {
                if (!value) {
                    this.$emit('close');
                }
            }
        },
        methods: {
            /**
             * 重置输入 
             */
            reset () {
                this.$refs['form'].resetFields();
            },
            /**
             * 取消添加
             */
            cancel () {
                this.$store.commit('HIDE_ADD_TEACHER');
            },
            ok () {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        var teacherItem = this.teacherItem;
                        var isEdit = this.isModified ? true : false;
                        var form = this.form;
                        var params = {
                            name: form.name,
                            subjectType: form.subjectType,
                            schoolId: form.schoolId,
                            remark: form.remark,
                            teacherType: form.teacherType
                        };
                        if (isEdit) {
                            Object.assign(params, {
                                id: teacherItem.id
                            });
                        } else {
                            Object.assign(params, {
                                password: form.password
                            });
                        }
                        this.loading = true;
                        saveOrUpdate(params)
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
            }
        },
        components: {
            CampusFilter
        }
    }
</script>