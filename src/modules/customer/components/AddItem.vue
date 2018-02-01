<template>
    <el-dialog 
        :title="project ? '编辑项目' : '添加项目'"
        width="550px"
        :visible.sync="$store.state.customer.showAddItemState"
        >
        <el-form
            :rules="rules" 
            ref="form"
            :model="form" 
            label-width="80px">
            <el-form-item label="项目名称" prop="projectId">
                <el-cascader
                v-model="form.projectId"
                :options="projectList"
                style="width: 360px;"
                :props="props"
                ></el-cascader>
            </el-form-item>
            <el-form-item 
                label="项目医生"
                prop="doctorId"
                >
                <el-select 
                    v-model="form.doctorId"
                    filterable
                    style="width: 360px;" 
                    placeholder="请选择顾问">
                    <el-option 
                        v-for="item, index in userListOption"
                        :label="item.staff.name"
                        :value="item.staff.id"
                        :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                prop="operatDate" 
                label="项目时间">
                <el-date-picker 
                    type="date"
                    :picker-options="operatDateOption"
                    placeholder="选择日期" 
                    v-model="form.operatDate" style="width: 360px;"></el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="cancel">取消</el-button>
            <el-button 
                @click="ok" 
                :disabled="loading" 
                type="primary">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>

    import {getProjectList, userList, addProject, updateProject} from '../request';
    import config from '../config';

    export default {
        computed: {
            id () {
                return this.$store.state.customer.id;
            },
            project () {
                return this.$store.state.customer.project;
            }
        },
        data() {
            return {
                loading: false,
                projectList: [],
                userListOption: [],
                rules: config.addItemRule,
                operatDateOption: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                },
                form: {
                    projectId: [],
                    doctorId: '',
                    operatDate: ''
                },
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'projects'
                }
            };
        },
        mounted () {
            this.getProjectOption();
            this.getUserListOption();
            var project = this.project;
            if (this.project) {
                this.form.doctorId = project.doctorInfo.id;
                this.form.projectId = [project.id, project.projectInfo.id];
                this.form.operatDate = new Date(project.operatDate);
            }
        },
        methods: {
            /**
             * 取咨询顾问列表
             */
            getUserListOption () {
                userList()
                    .then((res)=> {
                        this.userListOption = res.data.users;
                    });
            },
            /**
             * 获取项目列表 
             */
            getProjectOption () {
                getProjectList()
                    .then((res)=> {
                        var data = res.data.tree;
                        data.forEach((item)=> {
                            item.name = item.categoryName;
                        });
                        this.projectList = data;
                    });
            },
            cancel () {
                this.$store.commit('HIDE_ADD_ITEM_DETIAL');
            },
            ok () {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        var form = this.form;
                        var params = {
                            patientId: this.id,
                            id: form.projectId[1],
                            doctorId: form.doctorId,
                            operatDate: +form.operatDate
                        };
                        this.loading = true;
                        var request = this.project ? updateProject : addProject;
                        request(params)
                            .then((res)=> {
                                this.$emit('save');
                                toast('保存成功', 'success');
                                this.cancel();
                                this.loading = false;
                            }, ()=> {
                                this.loading = false;
                            });
                    } else {
                        toast('表单验证失败!');
                    }
                });
            }
        }
    }
</script>