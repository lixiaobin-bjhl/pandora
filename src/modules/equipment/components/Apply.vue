<template>
      <el-dialog 
        title="报装申请"
        width="500px"
        custom-class="equipment-status-list"
        :visible.sync="$store.state.equipment.showApplyEquipmentState"
        >
        <el-form :model="form" ref="form" :rules="rules" label-position="top">
           <el-row :gutter="10">
               <el-col :span="24">
                    <el-form-item label="校区" prop="accountName">
                        <el-input v-model.trim="form.accountName" 
                        :disabled="applyItem ? true: false" :maxlength="50" placeholder="账号(50字内)"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="教室个数" prop="userName">
                        <el-input 
                        v-model.trim="form.userName"
                        :disabled="applyItem ? true: false" 
                        :maxlength="20" placeholder="请输入名字"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="申报人" prop="userName">
                        <el-input 
                        v-model.trim="form.userName"
                        :disabled="applyItem ? true: false" 
                        :maxlength="20" placeholder="请输入名字"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="地址" prop="userName">
                        <el-autocomplete
                            class="inline-input"
                            v-model.trim="form.address"
                            :fetch-suggestions="getAddress"
                            placeholder="请输入内容"
                            style="width: 100%;"
                            :trigger-on-focus="false"
                            @select="selectAddress">
                            <template slot-scope="props">
                                <div class="name">{{ props.item.city }}{{props.item.district}}{{ props.item.name }}</div>
                            </template>
                        </el-autocomplete>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model.trim="form.remark"
                            :disabled="applyItem ? true: false" 
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
                :disabled="loading || applyItem? true : false" 
                @click="ok" 
                type="primary">确定</el-button>
        </div>
      </el-dialog>
</template>

<script>

    import { getAddressSuggestion } from '../request';

    export default {
        data () {
            return {
                loading: false,
                form: {},
                rules: {}
            }
        },
        computed: {
            applyItem () {
                return this.$store.state.equipment.equipment;
            }
        },
        mounted () {
            
        },
        methods: {
            /**
             * 选择地址
             */
            selectAddress (item) {
                setTimeout(()=> {
                    this.form.address = item.city + item.city + item.name;
                });
            },
            /**
             * 获取地址
             */
            getAddress (query, cb) {
                getAddressSuggestion({
                    query
                })
                .then((res)=> {
                    cb(res.result);
                });
            },
            /**
             * 取消添加
             */
            cancel () {
                this.$store.commit('HIDE_APPLY_EQUIPMENT');
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
    };
</script>