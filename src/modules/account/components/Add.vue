<template>
      <el-dialog 
        :title="title"
        width="640px"
        v-loading="loading"
        :visible.sync="$store.state.account.showAddAccountState"
        >       
        <el-form 
            :model="form" 
            ref="form"
            label-width="80px"
            label-position="right"
            :class="{'detail-from': accountItem}"
            :rules="(accountItem && !isModified) || accountItem ?  {} : addAccountRule">
           <el-row :gutter="10">
               <el-col :span="24">
                    <el-form-item 
                        label="账号" 
                        prop="name">
                        <template v-if="!accountItem || isModified">
                            <el-input v-model.trim="form.name" 
                        :disabled="accountItem && !isModified ?  true: false" :maxlength="50" placeholder="账号(50字内)"></el-input>
                        </template>
                        <template v-else>
                            {{form.name}}
                        </template>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="!accountItem">
                    <el-form-item label="密码" prop="password">
                        <el-input 
                            v-model.trim="form.password"
                            type="password" 
                            :maxlength="50" 
                            placeholder="请输入密码"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="校区" prop="schoolId">
                        <template v-if="!accountItem || isModified">
                           <campus-filter
                            placeholder="请选择校区"
                            v-model="form.schoolId"
                            :name="form.schoolName"
                            width="100%"
                            >
                           </campus-filter>
                        </template>
                        <template v-else>
                            {{form.schoolName}}
                        </template>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注" prop="remark">
                        <template v-if="!accountItem || isModified">
                            <el-input v-model.trim="form.remark"
                                type="textarea" 
                                :maxlength="200" 
                                :autosize="{minRows: 2,maxRows: 5}" 
                                placeholder="请输入备注"></el-input>
                        </template>
                        <template v-else>
                            <pre>{{form.remark}}</pre>
                        </template>
                    </el-form-item>
                </el-col>
           </el-row>
        </el-form>
        <div slot="footer" v-if="!accountItem || (accountItem && isModified)">
            <el-button @click="cancel">取消</el-button>
            <el-button 
                :disabled="loading" 
                @click="ok" 
                type="primary">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

    import config from '../config';
    import { saveOrUpdate, detail } from '../request';
    import subjectOption from '../../../common/config/subjectOption';
    import CampusFilter from 'src/common/components/CampusFilter.vue';
    
    var timer = null;

    export default   {
        data () {
            return  {
                addAccountRule: config.addAccountRule,
                subjectOption,
                form: {
                    name: '',
                    schoolId: '',
                    schoolName: '',
                    password: '',
                    remark: ''
                },
                loading: false,
                visiable: false
            }
        },
        computed: {
            accountItem () {
                return this.$store.state.account.account;
            },
            isModified () {
                return this.$store.state.account.isModified;
            },
            title () {
                if (this.isModified) {
                    return '编辑账号';
                } else {
                    if (this.accountItem) {
                        return '账号详情';
                    } else {
                        return '添加账号';
                    }
                }
            }
        },
        mounted () {
            var accountItem = this.accountItem;
            if (accountItem) {
                detail({
                    id: accountItem.id
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
                this.$store.commit('HIDE_ADD_ACCOUNT');
            },
            ok () {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        var accountItem = this.accountItem;
                        var isEdit = this.isModified ?  true : false;
                        var form = this.form;
                        var params = {
                            name: form.name,
                            schoolId: form.schoolId,
                            remark: form.remark
                        };
                        if (isEdit) {
                            Object.assign(params, {
                                id: accountItem.id
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
        },
        components: {
            CampusFilter
        }
    }
</script>