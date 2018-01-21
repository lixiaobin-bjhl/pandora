<template>
    <el-dialog 
        title="编辑课节" 
        width="600px"
        :visible.sync="$store.state.timetable.showLessonDetailState"
        > 
        <el-form 
            :model="form" 
            ref="form"
            v-loading="loading"
            label-position="right"
            label-width="100px"
            :rules="addLessonRule"
            >
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-form-item 
                        prop="schoolId"
                        label="校区">
                        <campus-filter 
                            width="100%"
                            :role-type="2"
                            v-model="form.schoolId"
                            :name="form.schoolName"
                            >
                        </campus-filter>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item 
                        prop="teacherId"
                        label="主讲老师">
                        <user-filter 
                            width="100%"
                            :role-type="2"
                            v-model="form.teacherId"
                            :name="form.teacherName"
                            >
                        </user-filter>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item 
                        prop="roomId" 
                        label="教室">
                        <classroom-filter
                            width="100%"
                            v-model="form.roomId"
                            :name="form.roomName"
                            ></classroom-filter>
                    </el-form-item>
                </el-col>
               
                <el-col :span="24">
                    <el-form-item 
                        prop="startTime" 
                        label="上课日期">
                        <el-date-picker
                            v-model="form.date"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
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
                <el-col :span="24" style="text-align:left;">
                    <el-form-item 
                        prop="newPwd" 
                        label="时长" v-if="form.value4">
                        {{(form.value4[1]-form.value4[0])/1000/60|minute}}
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注" prop="remark">
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
    import ClassroomFilter from 'src/common/components/ClassroomFilter.vue';
    import UserFilter from 'src/common/components/UserFilter.vue';
    import { detail, edit, lessonConflict } from '../request';
    import CampusFilter from 'src/common/components/CampusFilter.vue';

    export default   {
        computed: {
            lessonId () {
                return this.$store.state.timetable.lessonId;
            }
        },
        data () {
            return  {
                addLessonRule: config.addLessonRule,
                form: {
                    teacherId: '',
                    teacherName: '',
                    date: '',
                    remark: '',
                    timeRange: [],
                    roomId: '',
                    roomName: '',
                    schoolId: '',
                    schoolName: '',
                    startTime: '',
                    endTime: '',
                    subjectType: '',
                    subjectTypeStr: ''
                },
                teacherConflicts: [],
                roomConflicts: [],
                isConflict: false,
                repeatInfo: null,
                posX: 0,
                posY: 0,
                showRepeatCard: false,
                loading: false
            }
        },
        mounted () {
            var lessonId = this.lessonId;
            if (lessonId) {
                detail({
                    lessonId: lessonId
                })
                .then((res)=> {
                    var data = res.data;
                    Object.assign(this.form, data);
                    var startTime = new Date(data.startTime);
                    this.form.date = new Date(
                        startTime.getFullYear(), 
                        startTime.getMonth(), 
                        startTime.getDate()
                    );
                    this.form.timeRange = [data.startTime, data.endTime];
                });
                this.lessonConflict();
            }
        },
        methods: {
            lessonConflict () {
                lessonConflict({
                    lessonId: this.lessonId
                })
                .then((res)=> {
                    var data = res.data;
                    var teacherConflicts = data.teacherConflicts.conflictList;
                    var roomConflicts = data.roomConflicts.conflictList;

                    this.teacherConflicts = teacherConflicts || [];
                    this.roomConflicts = roomConflicts || [];
                });
            },
            /**
             * 取消重置密码 
             */
            cancel () {
                this.$store.commit('HIDE_LESSON_DETAIL');
            },
            ok () {
                this.$refs['form'].validate((valid) => {
                    if (valid) {

                        var form = this.form;
                        var date = form.date;
                        var timeRange = form.timeRange;
                        var startTime = new Date(timeRange[0]);
                        var endTime = new Date(timeRange[1]);

                        var params = {
                            id: this.lessonId,
                            schoolId: form.schoolId,
                            classRoomId: form.roomId,
                            teacherId: form.teacherId,
                            startTime: +new Date(
                                date.getFullYear(), 
                                date.getMonth(), 
                                date.getDate(),
                                startTime.getHours(),
                                startTime.getMinutes()
                            ),
                            endTime: +new Date(
                                date.getFullYear(), 
                                date.getMonth(), 
                                date.getDate(),
                                endTime.getHours(),
                                endTime.getMinutes()
                            ),
                            remark: form.remark
                        };
                        this.loading = true;
                        edit(params)
                            .then((res)=> {
                                this.$emit('save');
                                toast('保存成功', 'success');
                                this.cancel();
                            }, () => {
                                this.loading = false;
                            });
                    } else {
                        this.$Message.error('表单验证失败!');
                        this.changeLoading();
                    }
                });
            }
        },
        components: {
            ClassroomFilter,
            CampusFilter,
            UserFilter
        }
    }
</script>