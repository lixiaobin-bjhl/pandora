<template>
    <el-dialog 
        title="编辑客户"
        width="550px"
        :visible.sync="$store.state.customer.showAddCustomerState"
        >
        <el-form
            :rules="rules" 
            ref="form"
            :model="form" 
            :loding="loading"
            label-width="80px">
            <el-form-item label="微信昵称">
                {{form.wechatName}}
            </el-form-item>
            <el-form-item label="客户姓名" prop="name">
                <el-input 
                    v-model.trim="form.name"
                    :maxlength="30"
                    style="width: 360px;"></el-input>
            </el-form-item>
            <el-form-item label="客户手机" prop="mobile">
                <el-input
                    :maxlength="11"
                    v-model.trim="form.mobile" 
                    style="width: 360px;"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="form.gender">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="客户生日">
                <el-date-picker type="date" 
                    placeholder="选择日期" 
                    style="width: 360px;"
                    v-model="form.birthday"
                    :picker-options="birthdayOption"
                    ></el-date-picker>
            </el-form-item>
            <el-form-item label="客户年龄">
                {{form.birthYearPeriod}}
            </el-form-item>
            <el-form-item label="咨询顾问">
                <el-select 
                    v-model="form.patientConsulterId"
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
            <el-form-item label="客户来源">
                <el-select 
                    v-model="form.sourceId"
                    filterable
                    style="width: 360px;" 
                    placeholder="请选择来源">
                    <el-option 
                        v-for="item, index in patientSourceOption"
                        :label="item.name"
                        :value="item.id"
                        :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="cancel">取消</el-button>
            <el-button @click="ok"
                :disabled="loading"
                type="primary">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>

    import {getDetial, update, patientSource, userList} from '../request';
    import config from '../config';

    export default {
        computed: {
            id () {
                return this.$store.state.customer.id;
            }
        },
        data() {
            return {
                rules: config.modifyRule,
                form: {
                    wechatName: '',
                    name: '',
                    mobile: '',
                    gender: '',
                    birthday: '',
                    birthYearPeriod: '',
                    sourceId: '',
                    patientConsulterId: ''
                },
                userListOption: [],
                patientSourceOption: [],
                loading: false,
                birthdayOption: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                }
            };
        },
        mounted () {
            this.getDetial();
            this.getUserListOption();
            this.getPatientSourceOption();
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
             * 获取客户来源选项 
             */
            getPatientSourceOption () {
                patientSource()
                    .then((res)=> {
                        this.patientSourceOption = res.data.patients.list;
                    });
            },
            /**
             * 获取详情 
             */
            getDetial () {
                this.loading = true;
                getDetial({
                    id: this.id
                })
                .then((res)=> {
                    var data = res.data;
                    this.loading = false;
                    Object.assign(this.form, data);
                    this.form.gender = data.genderInfo.id;
                    if (data.birthday) {
                        this.form.birthday = new Date(data.birthday);
                    }
                    if (data.consulterInfo) {
                        this.form.patientConsulterId = data.consulterInfo.id;
                    }
                    if (data.sourceInfo) {
                        this.form.sourceId = data.sourceInfo.id;
                    }
                }, ()=> {
                    this.loading = false;
                });
            },
            cancel () {
                this.$store.commit('HIDE_ADD_CUSTOMER_DETIAL');
            },
            ok () {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        var form = this.form;
                        var params = {
                            id: this.id,
                            name: form.name,
                            mobile: form.mobile,
                            gender: form.gender,
                            birthday: form.birthday ? +form.birthday : '',
                            sourceId: form.sourceId,
                            patientConsulterId: form.patientConsulterId
                        }
                        this.loading = true;
                        update(params)
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