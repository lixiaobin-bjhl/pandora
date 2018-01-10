<template>
    <div class="login">
        <el-row  type="flex"  align="middel">
            <el-col :xs="{span: 18, offset: 3}" :lg="{span: 6, offset: 9}">
                <el-card>
                    <h1>账号登录</h1>
                    <el-form :model="form" :rules="rules" ref="form" @keyup.enter.native='!loading && login()'>
                        <el-form-item prop="name">
                            <el-col :span="24">
                                <el-input v-model.trim="form.name" placeholder="手机号">
                                    <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
                                </el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-col :span="24">
                                <el-input v-model.trim="form.password" type="password" placeholder="密码">
                                    <i slot="prefix" class="el-input__icon el-icon-menu"></i>
                                </el-input>
                            </el-col>
                        </el-form-item>
                        <el-row>
                            <el-col :span="24">
                                <el-button type="primary" style="width: 100%" class="login-btn" :loading="loading" @click="login">登录</el-button>
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

<style lang="scss">
    html {
        height: 100%;
    }
    body {
         background: url('assets/img/login1.jpg') no-repeat;
         background-size: 100% 100%;
         height: 100%;
    }
    .login {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
        .el-card {
            opacity: 0.95;
            background: #FFFFFF;
            border: 1px solid #D3DCE6;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.12), 0 0 6px 0 rgba(0,0,0,0.04);
            border-radius: 10px;
        }
        h1 {
            text-align: center;
            font-size: 20px;
            margin-bottom: 20px;
            font-weight: normal;
        }
        .login-btn {
            margin-top: 20px;
        }
    }
</style>