<template>
    <div class="login">
        <ul class="logo">
            <li><img src="./assets/img/logo.svg"></li>
            <li>xxxxxx</li>
        </ul>
        <h1>账号登录</h1>
        <el-form :model="form" :rules="rules" ref="form" @keyup.enter.native='!loading && login()'>
            <el-form-item prop="name">
                <el-col :span="24">
                    <el-input v-model.trim="form.name" :maxlength="30" placeholder="手机号">
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
                        <el-button type="primary" style="width: 100%" class="login-btn" :loading="loading" @click="login">登录</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                rules: {
                    name: [{
                        required: true,
                        message: '请输入账号'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码'
                    }]
                },
                form: {
                    name: '',
                    password: ''
                }
            };
        },
        methods: {
            login() {
                this.$refs['form'].validate(async(valid) => {
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
    * {
        margin: 0;
        padding: 0;
    }
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
        width: 580px;
        box-sizing: border-box;
        padding: 0 130px 34px 130px;
        opacity: 0.95;
        background: #FFFFFF;
        border: 1px solid #D3DCE6;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.12), 0 0 6px 0 rgba(0,0,0,0.04);
        border-radius: 10px;
        transform: translate(-50%, -50%);
        .el-input__prefix {
            .svg-icon {
                vertical-align: middle;
            }
        }
        .el-card {
            opacity: 0.95;
            background: #FFFFFF;
            border: 1px solid #D3DCE6;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
            border-radius: 10px;
        }
        h1 {
            text-align: center;
            font-size: 20px;
            margin-bottom: 20px;
            font-weight: normal;
        }
        .logo {
            margin: 75px 0 78px 0;
            img {
                margin-bottom: 15px;
            }
            li {
                list-style: none;
                text-align: center;
                font-size: 26px;
                color: #1F2D3D;
                letter-spacing: 0;
                line-height: 16px;
            }
        }
        .login-btn {
            margin-top: 20px;
        }
    }
</style>