<template>
    <div class="login">
        <ul class="logo">
            <li><img src="./assets/img/logo.svg"></li>
            <li>xxxxxx</li>
        </ul>
        <h1>账号登录</h1>
        <el-form 
            :model="form" 
            :rules="rules"
            v-loading="loading"
            ref="form" 
            @keyup.enter.native='!loading && login()'>
            <el-form-item prop="name">
                <el-col :span="24">
                    <el-input v-model.trim="form.name" :maxlength="11" placeholder="手机号">
                        <icon slot="prefix" scale="2.5" style="color:#ddd" name="mobilephone"></icon>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item prop="password">
                <el-col :span="24">
                    <el-input v-model.trim="form.password" type="password" placeholder="密码">
                        <icon slot="prefix" scale="2.5" style="color:#ddd" name="lock"></icon>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item prop="　">
                <el-row>
                    <el-col :span="24">
                        <el-button 
                            type="primary" 
                            style="width: 100%" 
                            class="login-btn"
                            :disabled="loading"
                            :loading="loading" 
                            @click="login">登录</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    import {login} from 'src/common/request';
    import md5 from 'md5';

    export default {
        data() {
            return {
                loading: false,
                rules: {
                    name: [
                        {
                            required: true,
                            message: '请输入手机号码'
                        },
                        {
                            validator: (rule, value, callback) => {
                                if (!/^1\d{10}$/.test(value)) {
                                    callback(new Error('手机号码格式不正确'));
                                } else {
                                    callback();
                                }
                            },
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: '请输入密码'
                        }
                    ]
                },
                form: {
                    name: '',
                    password: ''
                }
            };
        },
        methods: {
            login() {
                this.$refs['form'].validate((valid) => {
                    var form = this.form;
                    this.loading = true;
                    login({
                        mobile: form.name,
                        password: md5(form.password)
                    })
                    .then(()=> {
                        this.loading = false;
                        window.location.href = '/main.html';
                    }, ()=> {
                        this.loading = false;
                    })
                });
            }
        }
    }
</script>

<style lang="scss">
    @import './assets/scss/login';
</style>