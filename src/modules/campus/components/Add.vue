<template>
      <el-dialog 
        :title="campusItem ? '编辑校区' : '添加校区'"
        width="640px" 
        :visible.sync="$store.state.campus.showAddCampusState"
        >       
        <el-form 
            :model="form" 
            ref="form"
            label-width="100px"
            label-position="right"
            :rules="addCampusRule">
           <el-row :gutter="10">
               <el-col :span="24">
                    <el-form-item label="校区名称" prop="name">
                        <el-input 
                        v-model.trim="form.name" 
                        :maxlength="30" 
                        placeholder="校区名称(30字内)"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="地址" prop="address">
                        <el-autocomplete
                            class="inline-input"
                            v-model.trim="form.address"
                            :fetch-suggestions="getAddress"
                            placeholder="例如：湖北省武汉市珞喻路419号清和广场5楼"
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
                        <el-input 
                            v-model.trim="form.remark"
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
                :disabled="loading" 
                @click="ok" 
                type="primary">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    
    import config from '../config';
    import { saveOrUpdate } from '../request';
    import { getAddressSuggestion } from '../../equipment/request';
    
    var timer = null;

    export default   {
        computed: {
            campusItem () {
                return this.$store.state.campus.campus;
            }
        },
        data () {
            return  {
                fetchAgencyLoading: false,
                addCampusRule: config.addCampusRule,
                form: {
                    name: '',
                    address: '',
                    remark: ''
                },
                loading: false,
                visiable: false
            }
        },
        mounted () {
            var campusItem = this.campusItem;
            if (campusItem) {
                Object.assign(this.form, campusItem);
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
                this.$store.commit('HIDE_ADD_CAMPUS');
            },
            ok () {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        var campusItem = this.campusItem;
                        var isEdit = campusItem ? true : false;
                        var form = this.form;
                        var params = {
                            name: form.name,
                            address: form.address
                        };
                        if (isEdit) {
                            Object.assign(params, {
                                id: campusItem.id
                            });
                        }
                        saveOrUpdate(params)
                            .then((res)=> {
                                this.$emit('save');
                                this.cancel();
                                toast('保存成功', 'success');
                            });
                    } else {
                        toast('表单验证失败!');
                    }
                });
            }
        }
    }
</script>