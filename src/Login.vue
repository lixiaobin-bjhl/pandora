<template>
    <div class="login container">
        <el-row 
            class="login-row" 
            type="flex"
            align="middle" 
            justify="center">
            <el-col :xs="{span: 18, offset: 3}" :lg="{span: 6, offset: 9}">
                <el-card>
                    <h1>账号登录</h1>
                    <el-form :model="form" :rules="rules" ref="form" @keyup.enter.native='!loading && login()'>
                        <el-form-item prop="name">
                            <el-col :span="24">
                                <el-input v-model.trim="form.name" placeholder="手机号">
                                    <i slot="suffix" class="el-input__icon el-icon-mobile-phone"></i>
                                </el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-col :span="24">
                                <el-input v-model.trim="form.password" type="password" placeholder="密码"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-row>
                            <el-col :span="24">
                                <el-button type="primary" class="login-btn" :loading="loading" @click="login">登录</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
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