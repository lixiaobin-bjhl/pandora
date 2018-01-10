<template>
      <el-dialog 
        :title="accountItem ? '查看账号' : '添加账号'"
        width="500px" 
        :visible.sync="$store.state.account.showAddAccountState"
        >       
        <el-form :model="form" ref="form" :rules="addAccountRule" label-position="top">
           <el-row :gutter="10">
               <el-col :span="24">
                    <el-form-item label="账号" prop="accountName">
                        <el-input v-model.trim="form.accountName" 
                        :disabled="accountItem ? true: false" :maxlength="50" placeholder="账号(50字内)"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="!accountItem">
                    <el-form-item label="密码" prop="password">
                        <el-input v-model.trim="form.password" :maxlength="50" placeholder="请输入密码"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="校区" prop="userName">
                        <el-input 
                        v-model.trim="form.userName"
                        :disabled="accountItem ? true: false" 
                        :maxlength="20" placeholder="请输入名字"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="负责人" prop="userName">
                        <el-input
                        :disabled="accountItem ? true: false"
                        v-model.trim="form.userName" 
                        :maxlength="20" 
                        placeholder="请输入负责人"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model.trim="form.remark"
                            :disabled="accountItem ? true: false" 
                            type="textarea" 
                            :maxlength="100" 
                            :autosize="{minRows: 2,maxRows: 5}" 
                            placeholder="请输入备注"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model.trim="form.remark"
                            :disabled="accountItem ? true: false" 
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
                :disabled="loading || accountItem? true : false" 
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
            accountItem () {
                return this.$store.state.account.account;
            }
        },
        data () {
            return  {
                fetchAgencyLoading: false,
                addAccountRule: config.addAccountRule,
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
                    accountName: '',
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
            var accountItem = this.accountItem;
            // if (accountItem) {
            //     Object.assign(this.form, accountItem);
            //     detail({
            //         id: accountItem.id
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
                this.$store.commit('HIDE_ADD_ACCOUNT');
            },
            ok () {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        var accountItem = this.accountItem;
                        var isEdit = accountItem ? true : false;
                        var form = this.form;
                        var params = {
                            accountName: form.accountName,
                            userName: form.userName,
                            roleType: form.roleType,
                            remark: form.remark,
                            agencyIds: form.agencyIds.join(','),
                            rtmType: form.rtmType
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