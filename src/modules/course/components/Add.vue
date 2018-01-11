<template>
    <el-dialog 
        title="添加课程" 
        width="900px"
        :visible.sync="$store.state.course.showAddCourseState"
        > 
        <el-form :model="form" ref="form" :rules="addAccountRule">
            <el-form-item 
                prop="newPwd" 
                label="课程名称">
                <el-input v-model.trim="form.newPwd" :maxlength="50" placeholder="请输入课程名称"></el-input>
            </el-form-item>
            <el-form-item 
                prop="newPwd" 
                label="图片">
                <el-button>上传图片</el-button>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="科目" prop="teacherName">
                        <el-select
                            :disabled="courseItem ? true: false"
                            v-model.trim="form.teacherName"></el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="　">
                        <el-select
                            :disabled="courseItem ? true: false"
                            v-model.trim="form.teacherName">
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item 
                prop="newPwd" 
                label="主讲老师">
                <el-select v-model.trim="form.newPwd" :maxlength="50" placeholder="请选择主讲老师"></el-select>
            </el-form-item>
            <el-form-item 
                prop="newPwd" 
                label="校区">
                <el-select v-model.trim="form.newPwd" :maxlength="50" placeholder="请选择主讲老师"></el-select>
            </el-form-item>
            <el-form-item 
                prop="newPwd" 
                label="教室">
                <el-select v-model.trim="form.newPwd" :maxlength="50" placeholder="请选择主讲老师"></el-select>
            </el-form-item>
            <el-form-item 
                prop="newPwd" 
                label="课程周期">
                    <el-input readonly @click.native.stop="toggleRepeat($event)" v-model="repeatMsg"
                        placeholder="请设置课节重复信息">
                    </el-input>
                    <transition name="md-fade-bottom">
                        <down-card v-show="showRepeatCard" :x="posX" :y="posY" :min-width="150" v-on:closeCard="closeCard">
                            <div slot="main">
                                <set-repeat ref="setRepeatComp">
                                </set-repeat>
                            </div>
                            <div class="bottom" slot="bottom">
                                <el-button type="text" class="text-gray-light" style="padding:0" @click.native="closeCard()">取消</el-button>
                                <el-button type="text" style="padding:0" @click.native="setRepeat()">确定</el-button>
                            </div>
                        </down-card>
                    </transition>
            </el-form-item>
            <el-form-item 
                prop="newPwd" 
                label="上课日期">
                <el-date-picker
                    v-model="form.value1"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item 
                prop="newPwd" 
                label="上课时间段">
                <el-time-picker
                    is-range
                    v-model="form.value4"
                    format="HH:mm"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                </el-time-picker>
            </el-form-item>
            <el-form-item 
                prop="newPwd" 
                label="时长" v-if="form.value4">
                {{(form.value4[1]-form.value4[0])/1000/60|minute}}
            </el-form-item>
            <el-form-item label="详情" prop="remark">
                <el-input v-model.trim="form.remark"
                    :disabled="teacherItem ? true: false" 
                    type="textarea" 
                    :maxlength="100" 
                    :autosize="{minRows: 2,maxRows: 5}" 
                    placeholder="请输入课程详情"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="cancel">取消</el-button>
            <el-button :disabled="loading" @click="ok" type="primary">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

    import config from '../config';
    import { modifyPwd } from '../request';
    import DownCard from '../../../common/components/DownCard';
    import SetRepeat from '../../../common/components/SetRepeat';

    export default   {
        computed: {
            courseItem () {
                return null
            },
            repeatMsg() {
                let msg = '';
                var repeatInfo = this.repeatInfo;
                if (repeatInfo) {
                    if (repeatInfo.repeatType === 0) {
                        msg = '不重复';
                    } else if (repeatInfo.repeatType === 1) {
                        msg = `每间隔${repeatInfo.grepDayNum}天重复,重复${repeatInfo.repeatDayCounts}次`;
                    } else if (repeatInfo.repeatType === 2) {
                        let weekMsg = ``;
                        repeatInfo.repeatDays.forEach((item) => {
                            weekMsg += `${item.label},`
                        })
                        weekMsg = weekMsg.substr(0, weekMsg.length - 1);
                        msg = 
                            `每间隔${repeatInfo.grepWeekNum}周重复, 周${weekMsg}重复,重复${repeatInfo.repeatWeekCounts}次`;
                    }
                }
                return msg;
            }
        },
        data () {
            return  {
                addAccountRule: config.addAccountRule,
                form: {
                    newPwd: '',
                },
                repeatInfo: null,
                posX: 0,
                posY: 0,
                showRepeatCard: false,
                loading: false
            }
        },
        methods: {
            getEventPos(event, x) {
                this.posX = event.currentTarget.offsetLeft - x;
                this.posY = event.currentTarget.offsetTop + event.currentTarget.offsetHeight + 8;
            },
            /**
             * 切换重复选择框
             */
            toggleRepeat(event) {
                let showRepeatCard = !this.showRepeatCard;
                this.showRepeatCard = showRepeatCard;
                this.getEventPos(event);
            },
            /**
             * 关闭重复弹层选项
             */
            closeCard() {
                this.showRepeatCard = false;
            },
            /**
             * 获取重复信息
             */
            setRepeat() {
                let repeatInfo = this.$refs.setRepeatComp.getRepeatInfo();
                if (repeatInfo) {
                    this.repeatInfo = repeatInfo;
                    this.form.repeatRule = this.adaptRepeatRule(repeatInfo);
                    this.closeCard();
                }
            },
            /**
             * 取消重置密码 
             */
            cancel () {
                this.$store.commit('HIDE_ADD_COURSE');
            },
            ok () {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        var accountItem = this.accountItem;
                        var form = this.form;
                        var params = {
                             id: accountItem.id,
                             newPwd: form.newPwd
                        };
                        modifyPwd(params)
                            .then((res)=> {
                                this.visiable = false;
                                this.$emit('save');
                                this.$refs.modal.close();
                                toast('保存成功', 'success');
                            }, () => {
                                this.changeLoading();
                            });
                    } else {
                        this.$Message.error('表单验证失败!');
                        this.changeLoading();
                    }
                });
            }
        },
        components: {
            DownCard,
            SetRepeat
        }
    }
</script>