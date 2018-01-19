<template>
    <el-dialog 
        title="添加课程" 
        width="900px"
        :visible.sync="$store.state.course.showAddCourseState"
        > 
        <el-form 
            :model="form" 
            ref="form"
            label-position="right"
            label-width="100px"
            :class="{'detail-from': courseItem}"
            :rules="courseItem ? {} : addAccountRule"
            >
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item
                        prop="newPwd" 
                        label="课程名称">
                        <el-input 
                            v-model.trim="form.newPwd" 
                            :maxlength="30" 
                            placeholder="请输入课程名称">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="校区" prop="teacherName">
                        <el-select
                            placeholder="请选择校区"
                            v-model.trim="form.teacherName">
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="newPwd" 
                        label="封面">
                        <el-upload 
                            :before-upload="checkUploadImg"
                            :show-file-list="false"
                            :on-success="uploadImgSuccess"
                            :on-error="uploadImgError"
                            action="/common/upload.json">
                            <div class="upload-btn">
                                <div v-show="form.coverUrl" 
                                    class="cover-url" 
                                    :style="{backgroundImage:`url(${form.coverUrl})`}">
                                    <a href="javascript:;">修改</a>
                                </div>
                                <div v-if="!form.coverUrl" class="add-btn-link">
                                    <span class="el-icon-circle-plus"></span>
                                    <i>选择图片</i>
                                </div>
                            </div>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="newPwd" 
                        label="主讲老师">
                        <el-select 
                            v-model.trim="form.newPwd" 
                            :maxlength="50" 
                            placeholder="请选择主讲老师"></el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="科目" prop="teacherName">
                        <el-select
                            :disabled="courseItem ? true: false"
                            v-model.trim="form.teacherName"></el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="newPwd" 
                        label="教室">
                        <el-select v-model.trim="form.newPwd" :maxlength="50" placeholder="请选择教室">
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
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
                                        <el-button type="default" size="small" @click.native="closeCard()">取消</el-button>
                                        <el-button type="primary" size="small" @click.native="setRepeat()">确定</el-button>
                                    </div>
                                </down-card>
                            </transition>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="newPwd" 
                        label="上课日期">
                        <el-date-picker
                            v-model="form.value1"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
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
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="newPwd" 
                        label="时长" v-if="form.value4">
                        {{(form.value4[1]-form.value4[0])/1000/60|minute}}
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="详情" prop="remark">
                        <el-input v-model.trim="form.remark"
                            type="textarea" 
                            :maxlength="200" 
                            :autosize="{minRows: 2,maxRows: 5}" 
                            placeholder="请输入课程详情"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <transition v-if="isConflict" name="el-zoom-in-top" mode="out-in" appear>
                <div class="course-warning">
                    <h3>
                        <span class="el-icon-warning"></span>课程发生冲突
                    </h3>
                    <ul>
                        <li>该课程与《APP一对一》第137节课于12月13日 05:00-18:00发生冲突，请重新排课。</li>
                        <li>该课程与《APP一对一》第137节课于12月13日 05:00-18:00发生冲突，请重新排课。</li>
                    </ul>
                </div>
            </transition>
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
                isConflict: false,
                repeatInfo: null,
                posX: 0,
                posY: 0,
                showRepeatCard: false,
                loading: false
            }
        },
        methods: {
            /**
             * 上传前校验图片
             */
            checkUploadImg (file) {
                const isRightFormat = ['image/jpg', 'image/jpeg', 'image/png'].indexOf(file.type) > -1;
                const isLt5M = file.size / 1024 / 1024 < 5;
                this.$set(this, 'uploadImgLoading', true);
                if (!isRightFormat) {
                    this.$set(this, 'uploadImgLoading', false);
                    toast('上传头像图片只能是jpeg、jpg、png格式!', 'error');
                    return false;
                }
                if (!isLt5M) {
                    this.$set(this, 'uploadImgLoading', false);
                    toast('上传图片大小不能超过5MB!', 'error');
                    return false;
                }
                return isRightFormat && isLt5M;
            },
            /**
             * 图片上传成功处理 
             */
            uploadImgSuccess (res) {
                this.$set(this, 'uploadImgLoading', false);
                if (!res.code) {
                    var data = res.data;
                    this.$set(this.form, 'coverUrl', data.url);
                    this.$set(this.form, 'storageId', data.storageId);
                } else {
                    toast('图片上传失败', 'error');
                }
            },
            /**
             * 图片上传失败处理 
             */
            uploadImgError (item) {
                this.$set(item, 'uploadImgLoading', false);
            },
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
             * RepeatRule数据格式与通用版不一致，adapt一下
             */
            adaptRepeatRule(repeatRule) {
                var result = {};
                // 按周重复
                if (repeatRule.repeatType == 2) {
                    Object.assign(result, {
                        timeGranularityCode: 4,
                        reapeatCount: repeatRule.repeatWeekCounts,
                        weekDays: repeatRule.repeatDays.map((item)=> {
                            return item.value
                        }),
                        internal: repeatRule.grepWeekNum
                    })
                // 按日重复
                } else if (repeatRule.repeatType == 1) {
                    Object.assign(result, {
                        timeGranularityCode: 5,
                        reapeatCount: repeatRule.repeatDayCounts,
                        weekDays: [],
                        internal: repeatRule.grepDayNum
                    });
                }
                return result;
            },
            /**
             * 取消重置密码 
             */
            cancel () {
                this.$store.commit('HIDE_ADD_COURSE');
            },
            ok () {
                this.isConflict = true;
                return;
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