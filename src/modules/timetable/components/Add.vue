<template>
    <el-dialog 
        title="编辑课节" 
        width="600px"
        :visible.sync="$store.state.timetable.showLessonDetailState"
        > 
        <el-form 
            :model="form" 
            ref="form"
            label-position="right"
            label-width="100px"
            :rules="addLessonRule"
            >
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-form-item 
                        prop="newPwd"
                        label="主讲老师">
                        <teacher-filter 
                            width="100%"
                            name="老师1"
                            v-model="form.teacherId"></teacher-filter>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item 
                        prop="newPwd" 
                        label="教室">
                        <classroom-filter
                            width="100%"
                            name="xxxx"
                            v-model="form.classroomId"></classroom-filter>
                    </el-form-item>
                </el-col>
               
                <el-col :span="24">
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
                <el-col :span="24">
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
    import ClassroomFilter from 'src/common/components/ClassroomFilter.vue';
    import TeacherFilter from 'src/common/components/TeacherFilter.vue';

    export default   {
        computed: {
            lessonId () {
                return this.$store.state.lessonId;
            }
        },
        data () {
            return  {
                addLessonRule: config.addLessonRule,
                form: {
                    teacherId: 1,
                    newPwd: '',
                    classroomId: 1
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
             * 取消重置密码 
             */
            cancel () {
                this.$store.commit('HIDE_LESSON_DETAIL');
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
            ClassroomFilter,
            TeacherFilter
        }
    }
</script>