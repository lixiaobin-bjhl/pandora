<template>
      <el-dialog 
        :title="isShowDetail ? '课程详情':'申请课程'"
        width="640px"
        custom-class="apply-course-dialog"
        :visible.sync="$store.state.course.showApplyCourseState"
        >
        <el-form 
            :model="form" 
            ref="form"
            label-width="100px"
            class="detail-from"
            label-position="right">
            <h2 v-if="!isShowDetail">课程信息</h2>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item
                        prop="newPwd" 
                        label="课程名称">
                        {{form.name}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="校区" prop="teacherName">
                        {{form.schoolName}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="newPwd" 
                        label="封面">
                        <el-upload
                            :disabled="true"
                            action="/common/upload.json">
                            <div class="upload-btn">
                                <div v-show="form.cover" 
                                    class="cover-url" 
                                    :style="{backgroundImage:`url(${form.cover})`}">
                                    <a href="javascript:;" v-if="!isShowDetail">修改</a>
                                </div>
                            </div>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="newPwd" 
                        label="主讲老师">
                        {{form.teacherName}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="科目" prop="teacherName">
                        {{form.subjectTypeStr}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="newPwd" 
                        label="教室">
                        {{form.classRoomName}}
                    </el-form-item>
                </el-col>
                <el-col :span="12" v-if="form.startDay">
                    <el-form-item 
                        prop="newPwd" 
                        label="上课日期">
                        {{form.startDay|date('yyyy-MM-dd')}}
                    </el-form-item>
                </el-col>
                <el-col :span="12" v-else>
                    <el-form-item 
                        prop="newPwd" 
                        label="上课规则">
                        {{form.scheduleRule}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="newPwd" 
                        label="上课时间段">
                        {{form.start}}~{{form.end}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        prop="newPwd" 
                        label="时长" v-if="form.duration">
                        {{(form.duration)/1000/60|minute}}
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="详情" prop="remark">
                        <pre style="display: inline;">{{form.remark}}</pre>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-form 
            :model="applyForm" 
            ref="form"
            label-position="right"
            label-width="100px"
            :rules="applyCourseRules"
            v-if="!isShowDetail"
            >
            <h2 class="apply-title">申请信息</h2>
            <el-form-item label="上课教室" prop="classRoomId">
                <classroom-filter
                    placeholder="请选择教室"
                    v-model="applyForm.classRoomId"
                    :name="applyForm.classRoomName"
                    width="100%"
                    >
                </classroom-filter>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model.trim="applyForm.remark"
                    type="textarea" 
                    :maxlength="200" 
                    :autosize="{minRows: 2,maxRows: 5}" 
                    placeholder="请输入申请备注"></el-input>
            </el-form-item>
         </el-form>
        <div slot="footer" v-if="!isShowDetail">
            <el-button @click="cancel">取消</el-button>
            <el-button 
                :disabled="loading" 
                @click="ok" 
                type="primary">确定</el-button>
        </div>
      </el-dialog>
</template>

<script>

    import { getAddressSuggestion, detail, add} from '../request';
    import {courseapply} from '../../arrangement/request';
    import config from '../config';
    import ClassroomFilter from 'src/common/components/ClassroomFilter.vue';

    export default {
        data () {
            return {
                loading: false,
                applyCourseRules: config.applyCourseRules,
                applyForm: {
                    classRoomId: '',
                    remark: ''
                },
                form: {
                    name: '',
                    schoolId: '',
                    schoolName: '',
                    teacherId: 1,
                    teacherName: '',
                    cover: '',
                    classRoomId:1,
                    classRoomName: '教室名称',
                    start: '',
                    end: '',
                    duration: '',
                    remark: '',
                    subjectType : '',
                    subjectTypeStr: ''
                }
            }
        },
        computed: {
            courseItem () {
                return this.$store.state.course.course;
            },
            isShowDetail () {
                return this.$store.state.course.isShowDetail;
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
             * 取消添加
             */
            cancel () {
                this.$store.commit('HIDE_APPLY_COURSE');
            },
            ok () {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        var form = this.applyForm;
                        var params = {
                            id: this.courseItem.id,
                            classRoomId: form.classRoomId,
                            status: 1,
                            remark: form.remark
                        };
                        this.loading = true;
                        courseapply(params)
                            .then((res)=> {
                                this.$emit('save');
                                this.loading = false;
                                toast('保存成功', 'success');
                                this.cancel();
                            }, () => {
                                this.loading = false;
                            });
                    } else {
                        toast('表单验证失败!');
                    }
                });
            }
        },
        components: {
            ClassroomFilter
        }
    };
</script>