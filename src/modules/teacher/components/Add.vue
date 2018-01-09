<template>
      <el-dialog 
        :title="teacherItem ? '查看教师' : '添加教师'"
        width="500px" 
        :visible.sync="$store.state.teacher.showAddTeacherState"
        >       
        <el-form :model="form" ref="form" :rules="addTeacherRule" label-position="top">
           <el-row :gutter="10">
               <el-col :span="24">
                    <el-form-item label="教师姓名" prop="teacherName">
                        <el-input 
                        v-model.trim="form.teacherName" 
                        :disabled="teacherItem ? true: false" 
                        :maxlength="20" 
                        placeholder="教师姓名(20字内)"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="科目" prop="teacherName">
                        <el-select
                            :disabled="teacherItem ? true: false"
                            v-model.trim="form.teacherName"></el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label=" ">
                        <el-select
                            :disabled="teacherItem ? true: false"
                            v-model.trim="form.teacherName">
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="教师类型" prop="userName">
                        <el-select 
                        :disabled="teacherItem ? true: false" 
                        v-model.trim="form.teacherName"></el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="所属校区" prop="userName">
                        <el-input
                        :disabled="teacherItem ? true: false"
                        v-model.trim="form.userName" 
                        :maxlength="20" 
                        placeholder="请输入所属校区"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model.trim="form.remark"
                            :disabled="teacherItem ? true: false" 
                            type="textarea" 
                            :maxlength="100" 
                            :autosize="{minRows: 2,maxRows: 5}" 
                            placeholder="请输入备注"></el-input>
                    </el-form-item>
                </el-col>
           </el-row>
        </el-form>
        <div slot="footer">
            <el-button @click="cancel">取消</el-button>
            <el-button 
                :disabled="loading || teacherItem? true : false" 
                @click="ok" 
                type="primary">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

    import config from '../config';
    import { add, edit, detail } from '../request';
    
    var timer = null;

    export default   {
        computed: {
            teacherItem () {
                return this.$store.state.teacher.teacher;
            }
        },
        data () {
            return  {
                fetchAgencyLoading: false,
                addTeacherRule: config.addTeacherRule,
                roleOptions: config.roleOptions,
                rtmOptions: config.rtmOptions,
                agencyList: [],
                agencyAllOption: [
                    {
                        id: -1,
                        name: '全部' 
                    }
                ],
                agencyName: '',
                form: {
                    teacherName: '',
                    userName: '',
                    password: '',
                    roleType: '',
                    remark: '',
                    rtmType: '',
                    agencyIds: []
                },
                loading: false,
                visiable: false
            }
        },
        mounted () {
            var teacherItem = this.teacherItem;
            // if (teacherItem) {
            //     Object.assign(this.form, teacherItem);
            //     detail({
            //         id: teacherItem.id
            //     })
            //     .then((res)=> {
            //         var data = res.data;
            //         var agencys = [];
            //         // 全部范围控制
            //         if (data.hasAllAgency) {
            //             agencys = [].concat(this.agencyAllOption);
            //         } else {
            //             agencys = data.agencys;
            //         }
            //         this.agencyList = agencys.map((item)=> {
            //             return {
            //                 id: item.agencyId ||item.id,
            //                 name: item.agencyName || item.name
            //             };
            //         });
            //         setTimeout(()=> {
            //             this.form.agencyIds = agencys.map((item)=> {
            //                 return item.agencyId || item.id;
            //             });
            //         });
            //     });
            // }
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
             * 远程搜索经销商数据 
             */
            fetchAgencyList (query) {
                var query = typeof query === 'string' ? query : this.agencyName;
                clearTimeout(timer);
                this.fetchAgencyLoading = true;
                timer = setTimeout(()=> {
                    searchAgency({
                        pageNum: 1,
                        query: query.trim()
                    })
                    .then((res)=> {
                        this.fetchAgencyLoading = false;
                        this.agencyList = this.agencyAllOption.concat(res.data);
                    }, ()=> {
                        this.fetchAgencyLoading = false;
                    });
                }, 100);
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
                        var isEdit = teacherItem ? true : false;
                        var form = this.form;
                        var params = {
                            teacherName: form.teacherName,
                            userName: form.userName,
                            roleType: form.roleType,
                            remark: form.remark,
                            agencyIds: form.agencyIds.join(','),
                            rtmType: form.rtmType
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
    }
</script>