<template>
    <div class="login">
        <img class="logo" src="./assets/img/logo.png">
        <div>
            <h1>华图教育<span>双师</span>排课系统</h1>
            <div class="container">
                <img class="plane" src="./assets/img/plane.png">
                <h2>用户登录</h2>
                <el-form :model="form" :rules="rules" ref="form" @keyup.enter.native='!loading && login()'>
                    <el-form-item prop="name">
                        <el-col :span="24">
                            <el-input 
                                v-model.trim="form.name" 
                                :maxlength="30" 
                                placeholder="账号">
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
                    <el-form-item prop="code" v-if="form.name && false">
                        <el-col :span="12">
                            <el-input v-model.trim="form.code" 
                                :maxlength="6" placeholder="验证码">
                                <icon slot="prefix" scale="2.3" style="color:#ddd" name="verify-code"></icon>
                            </el-input>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <img src="code">
                            <span class="change-code" @click="changeCode">看不清，<a href="javascript:;">换一张</a></span>
                        </el-col> 
                    </el-form-item>
                    <el-form-item prop="　">
                        <el-row>
                            <el-col :span="24">
                                <el-button type="primary"
                                style="width: 100%" 
                                class="login-btn" 
                                :loading="loading" 
                                @click="login">登录</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>

    import {login} from './common/request';
    import getUrlSearch from 'src/common/function/getUrlSearch';

    export default {
        data() {
            return {
                loading: false,
                code: '',
                rules: {
                    name: [
                        {
                            required: true,
                            message: '请输入账号'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: '请输入密码'
                        }
                    ],
                    code: [
                        {
                            required: true,
                            message: '请输入验证码'
                        }
                    ]
                },
                form: {
                    name: '',
                    code: '',
                    password: ''
                }
            };
        },
        methods: {
            /**
             * 获取验证码
             */
            getVerifyCode () {
                this.code = '/code/getVerifyCode.do?name=' + this.form.name
            },
            /**
             * 切换验证码 
             */
            changeCode () {
                this.getVerifyCode();
            },
            /**
             * 登录 
             */
            login () {
                this.$refs['form'].validate(async (valid) => {
                    if (valid) {
                        var form =  this.form;
                        var code = form.code;
                        var params = {
                            name: form.name,
                            password: form.password
                        };
                        if (code) {
                            Object.assign(params, {
                                code: code
                            });
                        }
                        login(params)
                            .then(()=> {
                                var search = getUrlSearch();
                                if (search.nextUrl) {
                                    window.location.href = search.nextUrl;
                                    return;
                                }
                                window.location.href = '/main.html';
                            });
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="scss">

    @import './assets/scss/login';
    
</style>