<template>
      <el-dialog 
        title="导入账号"
        width="500px"
        custom-class="import-dialog"
        :visible.sync="$store.state.account.showImportAccountState"
        >
        <div class="body">
            <el-steps :active="step">
                <el-step title="上传文档"></el-step>
                <el-step title="数据导入"></el-step>
                <el-step title="导入完成"></el-step>
            </el-steps>
            <ul class="upload-notice" v-if="step == 1">
                <li>
                    <h2><span>1</span>请下载账号导入模板<a class="clickable-text clickable-text-blue" download="导入模板" href="http://omh2h1x76.bkt.clouddn.com/%E8%B4%A6%E5%8F%B7%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx">下载模板</a></h2>
                    <ul class="upload-body">
                        <li>注意：请按照模板合适导入账号名单，新的名单将会覆盖旧的名单，新名单下没有的旧名单的账号将会停用请在专业人员的帮助下操作</li>
                    </ul>
                </li>
                <li>
                    <h2><span>2</span>选择导入方式</h2>
                    <ul class="upload-body">
                        <el-radio-group v-model="isOverrided">
                            <el-radio :label="0">全部导入</el-radio>
                            <el-radio :label="1">增量导入</el-radio>
                        </el-radio-group>
                    </ul>
                </li>            
                <li>
                    <h2><span>3</span>选择需要导入的文件，并开始导入</h2>
                    <div class="upload-body">
                        <file-upload v-if="!file" @filechange="fileChange" tip="上传文件大小不能超过10M" accept="text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                            <el-button type="primary">添加文件</el-button>
                        </file-upload>
                        <el-input
                            v-else
                            v-model="fileName">
                            <i
                                class="el-icon-close el-input__icon pointer"
                                slot="suffix"
                                @click="removeFile">
                            </i>
                        </el-input>
                    </div>
                </li>
            </ul>

            <div class="check-progress" v-if="step == 2 && !isChecked">
                <el-progress  :percent="checkProgress"></el-progress>
                <p>数据校验中.....</p>
            </div>

            <ul class="check-result" v-if="step == 2 && isChecked">
                <li class="num" v-if="importResult.status">
                    共{{ importResult.totalCount }}个账号，错误信息<span class="text-danger">{{ importResult.failCount }}</span>个，请修改错误信息后再次上传
                </li>
                <li class="sign" v-if="!exception">
                    <span :class="[(importResult.status && !importResult.failCount)?'icon-chenggong':'icon-import-wrong']"></span>
                    <p v-if="importResult.status">
                        导入完成，<span v-if="importResult.failCount">部分数据有误</span><span v-else>数据无误</span>
                    </p>
                </li>
                <li class="sign" v-if="exception">
                    <p>
                       {{exception.message}}
                    </p>
                </li>
                <li v-if="importResult.status && importResult.failCount" class="tip">
                    <p>请点击下方按钮导出错误信息</p>
                    <el-button @click="exportError" type="warning">导出错误信息</el-button>
                </li>
            </ul>
            <div class="check-result" v-if="step == 4">
                <li class="num" v-if="importResult.status">
                    共{{ importResult.totalCount }}个账号，已成功上传<span class="brand">{{ importResult.successCount }}</span>个，错误信息<span class="text-danger">{{ importResult.failCount }}</span>个
                </li>
                <li class="sign">
                    <span :class="[(importResult.status && !importResult.failCount)?'icon-chenggong':'icon-import-wrong']"></span>
                    <p v-if="importResult.status">
                        导入完成，<span v-if="importResult.failCount">部分数据有误</span><span v-else>数据无误</span>
                    </p>
                </li>
                <li v-if="importResult.status && importResult.failCount" class="tip">
                    <p>请点击下方按钮导出错误信息</p>
                    <el-button @click="exportError" type="warning">导出错误信息</el-button>
                </li>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <div class="modal-footer" v-if="step == 1">
                <el-button type="text" @click="cancelUpload">取消上传</el-button>
                <el-button :disabled="!file" @click="upload" type="primary">开始上传</el-button>
            </div>

            <div class="modal-footer" v-if="step == 2">
                <el-button
                    type="text"
                    @click="cancelUpload"
                    v-if="isChecked && checkResult.status && !checkResult.failCount"
                >取消</el-button>
                <el-button
                    type="primary"
                    @click="reUpload"
                    v-if="!isChecked || checkResult.failCount || !checkResult.status"
                >重新上传</el-button>
            </div>

            <div class="modal-footer" v-if="step == 3">
                <el-button @click="complete" type="primary">完成</el-button>
            </div>
        </span>
    </el-dialog>
</template>

<script>

    import FileUpload from '../../../common/components/FileUpload';
    import { listenCheckProcessStatus, importData, exportError } from '../request';
    import formRequest  from '../../../common/function/formRequest';

    export default   {
        props: {
            playbackItem: {}
        },
        data () {
            return  {
                value: '',
                step: 1,
                exception: null,
                isOverrided: 1,
                loading: false,
                visiable: false,
                file: null,
                fileName: '',
                taskId: null,
                checkProgress: 0,
                isChecked: false,
                isImportedErr: false,
                importProgress: 0,
                timer: null,
                checkResult: {},
                importResult: {},
                processProgress: 0,
                processStatus: {},
                canImport: true,
            }
        },
        methods: {
            /**
             * 获取上传文件信息
             */
            fileChange (data) {
                this.file = data[0];
                this.fileName = data[0].name;
            },

            /**
             * 移除文件
             */
            removeFile () {
                this.file = null;
                this.fileName = '';
            },
            /**
             * 上传文件
             */
            upload () {
                var file = this.file;
                let fileSize = file.size;
                if (fileSize > 10240000) {
                    toast('上传文件大小不应超过10M', 'error');
                    return;
                }
                const isRightFormat = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].indexOf(file.type) > -1;
                if (!isRightFormat) {
                    toast('请上传excel文件!', 'error');
                    return;
                }
                if (fileSize == 0) {
                    toast('该文件不存在', 'error');
                    return;
                }

                let fd = new FormData();
                fd.append('file', this.file);
                fd.append('importType', this.isOverrided);
                this.loading = true;

                $.ajax({
					url: '/utraining/common/importAccount.do',
	                type: 'POST',
	                contentType: false,
	                data: fd,
	                dataType: 'json',
	                processData: false,
	                error: () => {
                        this.loading = false;
	                	toast('网络异常', 'error');
	                },
	                success: (res) => {
                        this.loading = false;
                        if (res.status == 200) {
                            this.step = 2;
                            this.taskId = res.data.taskId;
                            this.listenCheckProcessStatusHandler(this.taskId);
                        } else {
                            toast((res.error && res.error.message) || '系统异常', 'error');
                        }
	                }
	            });
            },

            /**
             * 数据校验
             */
            listenCheckProcessStatusHandler (taskId) {
                var params = {
                    taskId: taskId
                };

                listenCheckProcessStatus(params, true)
                    .then((res) => {
                        var data = res.data;
                        var exception = data.exception;
                        this.checkProgress = data.completeRate;
                        if (this.checkProgress < 100 && !exception) {
                            this.timer = setTimeout(() => {
                                this.listenCheckProcessStatusHandler(taskId);
                            }, 500);
                        }
                        else {
                            this.clearTimer();
                            if (exception && exception.message) {
                                toast(exception.message, 'error');
                            }
                            this.isChecked = true;
                            this.importResult = data;
                            this.importResult.status = 1;
                            if (this.importResult.failCount || exception) {
                                this.step = 2;
                                this.checkResult.failCount = this.importResult.failCount;
                            } else {
                                this.step = 4;
                            }
                            this.exception = exception;
                            this.$emit('importsuccess');
                        }
                    })
                    .fail((res) => {
                        let code = res.code;

                        if (code == 2013031032) {
                            this.checkResult['status'] = 0;
                            this.isChecked = true;
                            toast('模板检测有误', 'error');
                        }
                        else if (code == 1000000400) {
                            this.checkResult = {
                                status: 1,
                                totalCount: 0,
                                successCount: 0,
                                failCount: 0
                            };
                            this.isChecked = true;
                        }
                        else {
                            toast(res.error.message || '系统异常', 'error');
                            this.step = 1;
                        }
                    });
            },

            /**
             * 取消上传
             */
            cancelUpload () {
                this.$store.commit('HIDE_IMPORT_ACCOUNT');
            },

            /**
             * 重新上传
             */
            reUpload () {
                this.step = 1;
                this.clearTimer();
            },

            /**
             * 清除定时器
             */
            clearTimer () {
                clearTimeout(this.timer);
            },

            /**
             * 导出错误信息
             */
            exportError () {
                formRequest(this.importResult.errorFileUrl);
            },

            /**
             * 完成批导
             */
            complete () {
                this.$emit('importsuccess');
                this.$store.commit('HIDE_IMPORT_ACCOUNT');
            },
            
            ok () {
                var playbackItem = this.playbackItem;
                var jumpUrl = this.url;
                
                var parttern = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;

                if (!parttern.test(jumpUrl) || jumpUrl == '') {
                    toast(this.language.URL_LINK_INPUT_ERROR_TIPS);
                    this.loading = false;
                    this.$nextTick(() => {
                        this.loading = true;
                    });
                    return;
                }
                service
                    .setPlaybackJumpUrl({
                        roomId: playbackItem.roomId,
                        url: jumpUrl
                    })
                        .then((res)=> {
                            this.visiable = false;
                            this.$emit('save');
                            this.$refs.modal.close();
                            toast('保存成功', 'success');
                        }, ()=> {
                            this.loading = false;
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                        });
            }
        },
        components: {
            FileUpload,
        },
        destroyed () {
            this.clearTimer();
            this.$store.commit('HIDE_IMPORT_ACCOUNT');
        }
    }
</script>