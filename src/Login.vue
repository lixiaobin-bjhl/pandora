<template>
    <div class="login">
        <div>
            <h1>华图教育<span>双师</span>排课系统</h1>
            <div class="container">
                <h2>用户登录</h2>
                <el-form :model="form" :rules="rules" ref="form" @keyup.enter.native='!loading && login()'>
                    <el-form-item prop="name">
                        <el-col :span="24">
                            <el-input v-model.trim="form.name" placeholder="手机号">
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
                    <el-form-item prop="code">
                        <el-col :span="12">
                            <el-input v-model.trim="form.password" type="password" placeholder="验证码">
                                <icon slot="prefix" scale="2.3" style="color:#ddd" name="verify-code"></icon>
                            </el-input>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <img src="./assets/img/huatu.png">
                            <span class="change-code">看不清，<a href="javascript:;">换一张</a></span>
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
    export default {
        data() {
            return {
                loading: false,
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
                    ]
                },
                form: {
                    name: '',
                    password: ''
                }
            };
        },
        methods: {
            login () {
                this.$refs['form'].validate(async (valid) => {
                    if (valid) {
                        await this.$store.dispatch('login', this.form);
                        var search = getUrlSearch();
                        if (search.nextUrl) {
                            window.location.href = search.nextUrl;
                            return;
                        }
                        window.location.href = '/center/course?orgNum=' + this.$route.query.orgNum;
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