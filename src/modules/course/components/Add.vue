<template>
    <el-dialog 
        title="添加课程" 
        width="900px"
        :visible.sync="$store.state.course.showAddCourseState"
        > 
        <el-form 
            :model="form"
            v-loading="loading"
            ref="form"
            label-position="right"
            label-width="100px"
            :class="{'detail-from': courseItem}"
            :rules="courseItem ? {} : addCourseRules"
            >
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item
                        prop="name" 
                        label="课程名称">
                        <el-input 
                            v-model.trim="form.name" 
                            :maxlength="30" 
                            placeholder="请输入课程名称">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                     <el-form-item
                        prop="schoolId" 
                        label="校区">
                        <campus-filter
                            placeholder="请选择校区"
                            v-model="form.schoolId"
                            :name="form.schoolName"
                            width="100%"
                            >
                        </campus-filter>
                     </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="cover" 
                        label="封面">
                        <el-upload 
                            :before-upload="checkUploadImg"
                            :show-file-list="false"
                            :on-success="uploadImgSuccess"
                            :on-error="uploadImgError"
                            action="/uploadService/fileUpload.json">
                            <div class="upload-btn">
                                <div v-if="form.cover" 
                                    class="cover-url" 
                                    :style="{background: 'url('+form.cover+')'}">
                                    <a href="javascript:;">修改</a>
                                </div>
                                <div v-if="!form.cover" class="add-btn-link">
                                    <span class="el-icon-circle-plus"></span>
                                    <i>选择图片</i>
                                </div>
                            </div>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="teacherId" 
                        label="主讲老师">
                         <user-filter
                            placeholder="请选择主讲老师"
                            :role-type="2"
                            v-model="form.teacherId"
                            :name="form.teacherName"
                            width="100%"
                            >
                        </user-filter>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="科目" prop="subjectType">
                        <el-select
                            v-model.trim="form.subjectType">
                            <el-option
                            v-for="item,index in subjectOption"
                            :label="item.name"
                            :value="item.id"
                            :key="index">
                        </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="classRoomId" 
                        label="教室">
                        <classroom-filter
                            placeholder="请选择教室"
                            :room-type="2"
                            v-model="form.classRoomId"
                            :name="form.classRoomName"
                            width="100%"
                            >
                        </classroom-filter>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="enableRepeat"
                        required 
                        label="课程周期">
                            <el-input 
                                readonly 
                                @click.native.stop="toggleRepeat($event)" 
                                v-model="repeatMsg"
                                placeholder="请设置课节重复信息">
                            </el-input>
                            <transition name="md-fade-bottom">
                                <down-card 
                                    v-show="showRepeatCard" 
                                    :x="posX"
                                    :y="posY" 
                                    :min-width="150" 
                                    v-on:closeCard="closeCard">
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
                        prop="startDay"
                        v-if="!form.enableRepeat"
                        label="上课日期">
                        <el-date-picker
                            v-model="form.startDay"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="timeRange" 
                        label="上课时间段">
                        <el-time-picker
                            is-range
                            v-model="form.timeRange"
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
                        label="时长" v-if="form.timeRange">
                        {{(form.timeRange[1]-form.timeRange[0])/1000/60|minute}}
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
            <transition 
                v-if="roomConflicts.length && teacherConflicts.length" 
                name="el-zoom-in-top" mode="out-in" appear>
                <div>
                    <div class="course-warning">
                        <h3>
                            <span class="el-icon-warning"></span>教师发生冲突
                        </h3>
                        <ul>
                            <li v-for="item, index in teacherConflicts" 
                            :key="index">该课程与{{item.courseName}} {{item.startTime|date('HH:mm')}}~{{item.endTime|date('HH:mm')}}发生冲突，请重新排课。</li>
                        </ul>
                    </div>
                    <div class="course-warning">
                        <h3>
                            <span class="el-icon-warning"></span>教室发生冲突
                        </h3>
                        <ul>
                            <li v-for="item, index in teacherConflicts" 
                            :key="index">该课程与{{item.courseName}} {{item.startTime|date('HH:mm')}}~{{item.endTime|date('HH:mm')}}发生冲突，请重新排课。</li>
                        </ul>
                    </div>
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
    import { detail, add, conflictCheck } from '../request';
    import CampusFilter from 'src/common/components/CampusFilter.vue';
    import UserFilter from 'src/common/components/UserFilter.vue';
    import ClassroomFilter from 'src/common/components/ClassroomFilter.vue';
    import DownCard from '../../../common/components/DownCard';
    import SetRepeat from '../../../common/components/SetRepeat';
    import subjectOption from 'src/common/config/subjectOption';

    export default   {
        data () {
            return  {
                addCourseRules: config.addCourseRules,
                form: {
                    name: '',
                    schoolId: '',
                    teacherId: '',
                    classRoomId: '',
                    subjectType: '',
                    remark: '',
                    startDay: '',
                    startTime: '',
                    timeRange: '',
                    endTime: '',
                    enableRepeat: '',
                    repeatUnit: '',
                    weekDays: '',
                    repeatRange: '',
                    repeatCount: '' 
                },
                teacherConflicts: [],
                roomConflicts: [],
                subjectOption,
                repeatInfo: null,
                posX: 0,
                posY: 0,
                showRepeatCard: false,
                loading: false
            }
        },
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
        mounted () {
            var courseItem = this.courseItem;
            if (courseItem) {
                detail({
                    id: courseItem.id
                })
                .then((res)=> {
                    Object.assign(this.form, res.data);
                });
            }
        },
        methods: {
            /**
             * 上传前校验图片
             */
            checkUploadImg (file) {
                const isRightFormat = ['image/jpg', 'image/jpeg', 'image/png'].indexOf(file.type) > -1;
                const isLt5M = file.size / 1024 / 1024 < 5;
                 this.loading = true;
                if (!isRightFormat) {
                    this.loading = false;
                    toast('上传头像图片只能是jpeg、jpg、png格式!', 'error');
                    return false;
                }
                if (!isLt5M) {
                    this.loading = false;
                    toast('上传图片大小不能超过5MB!', 'error');
                    return false;
                }
                return isRightFormat && isLt5M;
            },
            /**
             * 图片上传成功处理 
             */
            uploadImgSuccess (res) {
                this.loading = false;
                if (!res.code) {
                    var data = res.data;
                    this.$set(this.form, 'cover', data.url);
                    this.$set(this.form, 'storageId', data.storageId);
                    this.$refs.form.validateField('cover');
                } else {
                    toast('图片上传失败', 'error');
                }
            },
            /**
             * 图片上传失败处理 
             */
            uploadImgError (item) {
                this.loading = false;
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
                    this.form.enableRepeat = repeatInfo.repeatType ? 1 : 0;
                    this.form.repeatUnit = repeatInfo.repeatType  -1;

                    // 按天重复
                    if (repeatInfo.repeatType == 1) {
                        this.form.repeatCount = repeatInfo.repeatDayCounts;
                        this.form.repeatRange = repeatInfo.grepDayNum;
                    } else if (repeatInfo.repeatType == 2) {
                        this.form.repeatCount = repeatInfo.repeatWeekCounts;
                        this.form.repeatRange = repeatInfo.grepWeekNum;
                        this.form.weekDays = repeatInfo.repeatDays.map((item) => {
                            return item.label;
                        }).join(',');
                    }
                    this.repeatInfo = repeatInfo;
                    this.$refs.form.validateField('enableRepeat');
                    this.closeCard();
                } else {
                    this.form.enableRepeat = 0;
                }
            },
            /**
             * 检测课节是否有冲突 
             */
            conflictCheck () {
                var form = this.form;
                var teacherId = form.teacherId;
                var classRoomId = form.classRoomId;
                var timeRange = form.timeRange;
                var startDay = form.startDay;
                var repeatCount = form.repeatCount;
                var fillFull = false;

                var defer = new Promise((resolve) => {
                    if (teacherId && classRoomId && timeRange) {
                        if (form.enableRepeat === 0 && startDay) {
                            fillFull = true;
                        } 
                        else if (form.enableRepeat && repeatCount) {
                            fillFull = true;
                        }
                    }
                    // 信息填满了，开始检测
                    if (fillFull) {
                        conflictCheck({
                            teacherId: form.teacherId,
                            classRoomId: form.classRoomId,
                            startDay: form.startDay ? +form.startDay : '',
                            startTime: Vue.filter('date')(form.timeRange[0], 'HH:mm'),
                            endTime: Vue.filter('date')(form.timeRange[1], 'HH:mm'),
                            enableRepeat: form.enableRepeat,
                            repeatUnit: form.repeatUnit,
                            weekDays: form.weekDays,
                            repeatRange: form.repeatRange,
                            repeatCount: repeatCount,
                        })
                        .then((res)=> {
                            var data = res.data;
                            var teacherConflicts = data.teacherConflicts.conflictList;
                            var roomConflicts = data.roomConflicts.conflictList;

                            this.teacherConflicts = teacherConflicts || [];
                            this.roomConflicts = roomConflicts || [];
                            if (teacherConflicts.length || roomConflicts.length) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        });
                    } else {
                        resolve(false);
                    }
                });
                return defer;
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
                        var courseItem = this.courseItem;
                        var form = this.form;
                        
                        this.conflictCheck()
                            .then((res)=> {
                                if (res) {
                                    this.$confirm('该课程与其它课程有冲突，确认提交', '提示', {
                                        type: 'warning'
                                    })
                                    .then(() => {
                                        var params = {
                                            name: form.name,
                                            schoolId: form.schoolId,
                                            cover: form.cover,
                                            teacherId: form.teacherId,
                                            classRoomId: form.classRoomId,
                                            subjectType: form.subjectType,
                                            remark: form.remark,
                                            startDay: form.startDay ? +form.startDay : '',
                                            startTime: Vue.filter('date')(form.timeRange[0], 'HH:mm'),
                                            endTime: Vue.filter('date')(form.timeRange[1], 'HH:mm'),
                                            enableRepeat: form.enableRepeat,
                                            repeatUnit: form.repeatUnit,
                                            weekDays: form.weekDays,
                                            repeatRange: form.repeatRange,
                                            repeatCount: form.repeatCount,
                                            scheduleRule: this.repeatMsg
                                        };
                                        this.loading = true;
                                        add(params)
                                            .then((res)=> {
                                                this.$emit('save');
                                                this.loading = false;
                                                toast('保存成功', 'success');
                                                this.cancel();
                                            }, () => {
                                                this.loading = false;
                                            });
                                        });
                                }
                            })
                    } 
                    else {
                        toast('表单验证失败!');
                    }
                });
            }
        },
        watch: {
            form: {
                handler () {
                    this.conflictCheck();
                },
                deep: true
            }
        },
        components: {
            DownCard,
            CampusFilter,
            UserFilter,
            ClassroomFilter,
            SetRepeat
        }
    }
</script>