<template>
    <div>
        <section class="chatlist">
            <mt-loadmore :top-method="loadTop" top-pull-text="加载更多" top-drop-text="释放加载" @top-status-change="handleTopChange" ref="loadmore">
                <ul>
                    <template v-for="item in list">
                        <p class="time">{{item.formattedTime}}</p>
                        <li v-for="(chat, index) in item.list" :key="index" :class="{'chat-mine': chat.fromUserId == userInfo.id && chat.fromUserRole == userInfo.roleType, 'chat-image': chat.msgType == 'image', 'chat-voice': chat.msgType == 'voice'}">
                            <div class="chat-user">
                                <img :src="chat.fromUserAvatar">
                            </div>
                            <pre class="chat-text" v-if="chat.msgType == 'text'" v-text="chat.msgContent.content"></pre>
                            <pre class="chat-text text-image" v-else-if="chat.msgType == 'image'" @click="previewImg(chat.msgContent.picUrl)"><img class="chat-pic" width="110" height="110" :data-url="chat.msgContent.picUrl" :src="chat.msgContent.picUrl|compressImage(110, 110)"></pre>
                            <pre class="chat-text text-voice" v-else-if="chat.msgType == 'voice'"><audio-player :seconds="chat.seconds || 60.12" :url="chat.msgContent.voiceUrl"></audio-player></pre>
                        </li>
                    </template>
                </ul>
            </mt-loadmore>
        </section>

        <section class="foot clearfix">
            <upload @change="changePicture" class="left upload-wrap">
                <span class="icon icon-plus"></span>
            </upload>
            <span class="icon icon-voice left" v-if="!isShowKeyboard" @click="isShowKeyboard = !isShowKeyboard"></span>
            <span class="icon icon-keyboard left" v-if="isShowKeyboard" @click="isShowKeyboard = !isShowKeyboard"></span>
            <mt-button class="btn btn-send" :disabled="sending"  v-on:click="sendMsg" type="primary">发送</mt-button> 
            <div class="record-btn" ref="record-btn" @click="record" v-show="isShowKeyboard" :class="{'recording': recording}">
                {{recording ? '松开 结束' : '按住 说话'}}
            </div>
            <div class="con" v-show="!isShowKeyboard">
                 <textarea :maxlength="100" autofocus ref="message-input" placeholder="请输入消息"  v-model="content"></textarea>
            </div>
            </section>
        </section>
    </div>
</template>

<script>
import util from '../../common/util'
import { Toast } from 'mint-ui';
import {uptoken, upload} from '../request';
import formatChatTime from '../../common/function/formatChatTime';
import Upload from '../../common/components/Upload.vue';
import AudioPlayer from '../../common/components/AudioPlayer.vue';
import getUrlSearch from '../../common/function/getUrlSearch';
import { Indicator } from 'mint-ui';
import wechatJsSignMixin from '../../common/mixin/wechatJsSignMixin';

var timer = null;

export default {
    mixins: [wechatJsSignMixin],
    name: 'chatlist',
    data() {
        return {
            showSelBox: 0, // 0隐藏 1显示表情 2显示其他
            selFace: '表情',
            selOther: '其他功能',
            content:'',
            isShowKeyboard: false,
            recording: false,
            websocket: null,
            topStatus: '',
            sending: false,
            list: [],
            userInfo: {
                id: 1,
                roleType: 2
            },
            //聊天记录
            records: []
        }
    },
    methods: {
        /**
         * 录音 
         */
        record (status) {
            var recording = this.recording;
            // 不是录音中，就开始录音
            if (status) {
                if (!recording) {
                    wx.startRecord();
                    this.recording = true;
                }
            // 如果是在录音中，就停止录音
            } else {
                this.recording = false; 
                wx.stopRecord({
                    success: (res)=> {
                        this.sendVoiceMsg(res.localId); 
                    }
                });
            }
        },
        /**
         * 发送语音信息 
         */
        sendVoiceMsg (localId) {
            var websocket = this.websocket;
            console.log(localId);
            websocket.send(JSON.stringify({
                type: 'CHAT',
                msgType: 'VOICE',
                msgContent: {
                    mediaId: localId
                }
            }));
        },
        bindEvent () {
            this.$refs['record-btn'].addEventListener('touchstart', this.touchStartHandler, false);
            this.$refs['record-btn'].addEventListener('touchend', this.touchEndHandler, false);
            wx.ready(()=> {
                console.log('wx ready');
                // 微信录音超过1分钟自动结束
                wx.onVoicePlayEnd({
                    success: (res) => {
                        this.sendVoiceMsg(res.localId); 
                    }
                });
            });
        },
        touchStartHandler (event) {
            event.preventDefault();
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                console.log('start voice');
                this.record(1);
            }, 1000);
        },
        touchEndHandler (event) {
            clearTimeout(timer);
            console.log('end voice');
            this.record(0);
        },
        /**
         * 改变聊天图片
         */
        changePicture (files) {
            if (!files) {
                return;
            }
            var file = files[0];
            var fd = new FormData();    
            var websocket = this.websocket;

            fd.append('file', file);
            Indicator.open('加载中…');
            upload(fd)
                .then((res)=> {
                    Indicator.close();
                    toast('图片上传成功');
                    console.log(JSON.stringify({
                        type: 'CHAT',
                        msgType: 'image',
                        msgContent: {
                            picUrl: res.data.url
                        }
                    }));
                    websocket.send(JSON.stringify({
                        type: 'CHAT',
                        msgType: 'image',
                        msgContent: {
                            picUrl: res.data.url
                        }
                    }));
                })
                .catch(()=> {
                    Indicator.close();
                });
        },

        /**
         * 获取到一组消息体
         */
        msgGroupItem () {
            return {
                formattedTime: '',
                timeStamp: 0,
                list: [] 
            };
        },

        /**
         * 创建一个消息群组
         */
        createGroupMsg (msg) {
            var msgGroupItem = this.msgGroupItem();
            msgGroupItem.formattedTime = formatChatTime(msg.createTime);
            msgGroupItem.timeStamp = msg.createTime;
            msgGroupItem.list = msgGroupItem.list.concat(msg);
            return msgGroupItem;
        },

        /**
         * 将时间戳转成时间
         */
        timeStampToMinute (timeStamp) {
            return ('' + timeStamp).slice(0, 10);
        },

        /**
         * 向前插入消息
         */
         insertBefore(msg) {
            var result = null;
            var list = this.list;
            var listLength =  list.length;
            var firstMsgGroup = listLength ? list[0] : null;

            // 有第一组条消息
            if (firstMsgGroup) {
                // 第一组消息的时间绰和当前消息的时间戳对比，大于等于5分钟就不要合并，生成一个新的msgGroupItem
                if (this.timeStampToMinute(firstMsgGroup.timeStamp) - this.timeStampToMinute(msg.createTime) >= 300) {
                   result = this.createGroupMsg(msg);
                // 如果在5分钟内就合并一下
                } else {
                    firstMsgGroup.list = [].concat(msg).concat(firstMsgGroup.list);
                }
            } else {
                result = this.createGroupMsg(msg);
            }
            return result;
         },

        /**
         * 向后插入消息
         */
        appendMsg (msg) {
            var result = null;
            var list = this.list;
            var listLength =  list.length;
            var lastMsgGroup = listLength ? list[listLength - 1] : null;

            // 有最后一组条消息
            if (lastMsgGroup) {
                // 最后一组消息的时间绰和当前消息的时间戳对比，大于等于5分钟就不要合并，生成一个新的msgGroupItem
                if (this.timeStampToMinute(msg.createTime) - this.timeStampToMinute(lastMsgGroup.timeStamp) >= 300) {
                   result = this.createGroupMsg(msg);
                // 如果在5分钟内就合并一下
                } else {
                    lastMsgGroup.list = lastMsgGroup.list.concat(msg);
                }
            } else {
                result = this.createGroupMsg(msg);
            }
            return result;
        },

        /**
         * 格式化消息时间
         */
        formatChatTime: formatChatTime,
        /**
         * 初始化socket
         */
        initScoket () {
            var search = getUrlSearch();
            var openId = search.openId;
            var chatUserId = search.chatUserId;
            var chatUserRole = search.chatUserRole;
            var self = this;
            if (!openId) {
                toast('没有openId');
                return;
            }
            var params = 'openId=' + openId;
            if (chatUserId) {
                params += '&chatUserId=' + chatUserId;
            }
            if (chatUserRole) {
                 params += '&chatUserRole=' + chatUserRole;
            }
            var wsServer = 'ws://xm.56xg.com/chat.ws?' + params;

            var websocket = new WebSocket(wsServer);
            
            this.websocket = websocket;
           
            function onOpen(evt) { 
                console.log("Connected to WebSocket server.");
            } 
            function onClose(evt) { 
                self.websocket = null;
                console.log("Disconnected"); 
            } 
            function onError(evt) { 
                console.log('Error occured: ' + evt.data); 
            }
            websocket.addEventListener('open', onOpen);
            websocket.addEventListener('close', onClose);
            websocket.addEventListener('error', onError);
            websocket.addEventListener('message', this.processMessage);
        },

        /**
         * 处理接受的信息 
         */
        processMessage (event) {
            this.sending = false;
            var data = JSON.parse(event.data);
            console.log(data);
            if (data.type == 'CHAT') {
                this.receiveMessage(data);
                this.scrollToBottom();
            } else if (data.type == 'LOGIN_INFO') {
                this.userInfo = data.userInfo;
                this.setTitle(data.chatUser.name || '');
                setTimeout(()=> {
                    this.getWechatJsSign();
                });
                // 首次一下hisotry
                setTimeout(()=>{
                    this.loadHistory();
                });
                this.scrollToBottom();
            } else if (data.type == 'CHAT_HISTORY') {
                this.loadMessage(data.msgList);
                this.$refs.loadmore.onTopLoaded();
            }
        },
        /**
         * 发送文字消息
         */
        sendMsg: function() {
            var websocket = this.websocket;
            var content = this.content.trim();
            if (!content) {
                toast('请输入消息内容')
                return;
            }
            if (!websocket) {
                toast('socket没有连接成功');
                return;
            }
            this.sending = true;
            websocket.send(JSON.stringify({
                type: 'CHAT',
                msgType: 'text',
                msgContent: {
                    content: content
                }
            }));
            this.content = '';
        },
        /**
         * 接收消息
         * @param {Array|Object} 来了一条或多条消息
         */
        receiveMessage(data) {
            var data = [].concat(data);
            data.forEach((item)=> {
                var msgGroupItem = this.appendMsg(item);
                if (msgGroupItem) {
                    this.list = this.list.concat(msgGroupItem);
                }
            });
        },
        /**
         * load历史消息
         */ 
        loadMessage (data) {
            var data = [].concat(data);
            // 倒序把消息加到顶部
            for (var i = data.length - 1; i >= 0; i--) {
                var msgGroupItem = this.insertBefore(data[i]);
                if (msgGroupItem) {
                    this.list = [].concat(msgGroupItem).concat(this.list);
                }
            }
        },

        /**
         * 聚焦输入框
         */
        focusTxtContent:function() {
            setTimeout(()=> {
                this.$refs['message-input'].focus();
            }, 1000);
        },
    
        /**
         * 滚动条滚动到底部
         */
        scrollToBottom: function() {
            setTimeout(function() {
                var chatlist = document.getElementsByClassName('mint-loadmore')[0];
                chatlist.scrollTop = chatlist.scrollHeight;
            }, 100);
        },

        /**
          * 预览图片 
          */
        previewImg(m) {
            this.previewImage(m, document.querySelectorAll('.chat-pic'));
        },

        // //替换表情代码
        // replaceFace:function(con){
        //     var _this=this;
        //     var exps=this.EXPS;
        //     for(var i=0;i<exps.length;i++){
        //         //con = con.replace(new RegExp(exps[i].code,'g'), '<img src="static/emotion/' + exps[i].file +'"  alt="" />');
        //         con = con.replace(exps[i].reg, '<img src="static/emotion/' + exps[i].file +'"  alt="" />');
        //     }
        //     return con;
        // },
        handleTopChange(status) {
            this.topStatus = status;
        },
        /**
         * 获取第一条消息的时间，用于下拉更多消息使用 
         */
        getFirstMsgId () {
            var list = this.list;
            if (!list.length) {
                return null;
            }
            var firstGroup = list[0];
            var firstGroupList = firstGroup.list;
            if (!firstGroupList || !firstGroupList.length) {
                return '';
            }
            return firstGroupList[0].msgId;

        },
        loadHistory () {
            var websocket = this.websocket;
            if (websocket) {
                websocket.send(JSON.stringify({
                    type: 'CHAT_HISTORY',
                    length: 10,
                    firstMsgId: this.getFirstMsgId()
                }));
            }
        },
        loadTop(id) {
            this.loadHistory();
            // this.$refs.loadmore.onTopLoaded(id);
        },
        setTitle (t) {
            document.title = t;
            var i = document.createElement('iframe');
            i.src = '//m.baidu.com/favicon.ico';
            i.style.display = 'none';
            i.onload = function() {
                setTimeout(function(){
                i.remove();
                }, 9)
            }
            document.body.appendChild(i);
        }
    },
    components: {
        Upload,
        AudioPlayer
    },
    beforeDestroy() {
        console.log('destroy');
        var websocket = this.websocket;
        if (websocket) {
            websocket.close();
        }
    },
    mounted: function(){
        this.focusTxtContent();
        this.initScoket();
        this.bindEvent();
        // this.receiveMessage(this.records); 

        // mock 两秒钟后来了两条新消息
        // setTimeout(()=> {
        //     this.receiveMessage([{
        //         fromUserName: '客户A',
        //         fromUserId: 2,
        //         toUserName: '护士-周希',
        //         toUserId: 2,
        //         createTime: 1495642398371,
        //         fromUserAvatar: 'http://omh2h1x76.bkt.clouddn.com/user.png', 
        //         msgType: 'image',
        //         msgId: 0,
        //         msgContent: {
        //             picUrl: 'http://omh2h1x76.bkt.clouddn.com/user.png'
        //         }
        //     }]);
        // }, 1000)

        //  setTimeout(()=> {
        //     this.receiveMessage([{
        //         fromUserName: '客户A',
        //         fromUserId: 2,
        //         toUserName: '护士-周希',
        //         toUserId: 2,
        //         createTime: 1495642398371,
        //         fromUserAvatar: 'http://omh2h1x76.bkt.clouddn.com/user.png', 
        //         fromUserRole: 1,
        //         msgType: 'voice',
        //         msgId: 0,
        //         msgContent: {
        //             // voiceUrl: 'http://oqpq939qh.bkt.clouddn.com/iXlsYqVnHVWdLRBU3HSOZHPj0_jt9S9g_NNrVAL2cbHBEvRzTXTDZymX40L3H8JM.amr'
        //             voiceUrl: 'http://file.gsxservice.com/17731219_jyacy0y8.mp3'
        //         }
        //     }]);
        // }, 1000)


        //  setTimeout(()=> {
        //     this.receiveMessage([{
        //         fromUserName: '客户A',
        //         fromUserId: 1,
        //         toUserName: '护士-周希',
        //         toUserId: 2,
        //         createTime: 1495642398371,
        //         fromUserRole: 2,
        //         fromUserAvatar: 'http://omh2h1x76.bkt.clouddn.com/user.png', 
        //         msgType: 'voice',
        //         msgId: 0,
        //         msgContent: {
        //             // voiceUrl: 'http://oqpq939qh.bkt.clouddn.com/iXlsYqVnHVWdLRBU3HSOZHPj0_jt9S9g_NNrVAL2cbHBEvRzTXTDZymX40L3H8JM.amr'
        //             voiceUrl: 'http://file.gsxservice.com/17731219_jyacy0y8.mp3'
        //         }
        //     }]);
        // }, 1500)
    }
    // updated:function(){
    //     this.scrollToBottom();
    // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import 'src/assets/scss/common/color';
    ::-webkit-scrollbar{
        display:none;
    }
    .chatlist {
        width: 100%;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        bottom: 48px;
        left: 0px;
        right: 0px;
    }
    .time {
        text-align: center;
        color: $gray-999;
        margin: 10px;
    }
    
    .chatlist-bottom {
        bottom: 48px;
    }
    
    .chatlist-bottom-collapse {
        bottom: 198px;
    }
    
    .chatlist ul {
        min-height: 300px;
    }
    
    .chatlist ul .chat-mine {
        text-align: right;
        padding-left: 0;
        padding-right: 55px;
    }
    
    .chatlist ul li {
        position: relative;
        /*font-size: 0;*/
        margin-bottom: 10px;
        padding-left: 55px;
    }
    
    .chat-mine .chat-user {
        left: auto;
        right: 3px;
    }
    
    .chat-user {
        position: absolute;
        left: 3px;
    }
    
    .chat-text,
    .chat-user {
        display: inline-block;
        vertical-align: top;
    }
    
    .chat-user img {
        width: 40px;
        height: 40px;
        border-radius: 5px;
    }
    
    .createTime {
        width: 100%;
    }
    
    cite {
        left: auto;
        right: 60px;
        text-align: right;
    }
    
    cite {
        font-style: normal;
        line-height: 24px;
        font-size: 12px;
        white-space: nowrap;
        color: #999;
        text-align: left;
    }
    
    cite i {
        font-style: normal;
        padding-left: 5px;
        padding-right: 5px;
        font-size: 12px;
    }
    
    .chat-mine .chat-text {
        margin-left: 0;
        text-align: left;
        background-color: $brand;
        color: #fff;
    }

    .mine-image .chat-text {
        background-color: #FFF;
    }

    .mint-loadmore {
        height: 100%;
        overflow: auto;
    }
    
    .chat-text {
        position: relative;
        line-height: 22px;
        /*margin-top: 25px;*/
        padding: 8px 15px;
        background-color: #FFF;
        border: 1px solid #DDD;
        border-radius: 5px;
        color: #333;
        word-break: break-all;
        max-width: 462px\9;
        white-space: -moz-pre-wrap;white-space:-pre-wrap;
        white-space: -o-pre-wrap;word-wrap:break-word;
    }
    
    .chat-text,
    .chat-user {
        display: inline-block;
        vertical-align: top;
        font-size: 14px;
        white-space: pre-wrap;
        max-width: 80%;
    }
    
    .chat-text img {
        max-width: 100%;
        vertical-align: middle;
        border-radius: 5px;
    }

    .text-image {
        padding: 0;
        max-width: 50%;
    }
    .text-voice {
        padding: 0;
        max-width: 50%;
    }
    
    .chat-user {
        position: absolute;
        left: 3px;
    }
    
    .chat-text:after {
        content: '';
        position: absolute;
        left: -10px;
        top: 15px;
        width: 0;
        height: 0;
        border-style: solid dashed dashed;
        border: 1px solid transparent;
        border-right-color: #FFF;
        overflow: hidden;
        border-width: 5px;
    }
    .chat-text:before {
        content: '';
        position: absolute;
        left: -11px;
        top: 15px;
        width: 0;
        height: 0;
        border-style: solid dashed dashed;
        border: 1px solid transparent;
        border-right-color: #DDD;
        overflow: hidden;
        border-width: 5px;
    }
    
    .chat-mine .chat-text:after {
        left: auto;
        right: -10px;
        border-left-color: $brand;
        border-right-color: transparent;
    }
     .chat-mine .chat-text:before {
        left: auto;
        right: -11px;
        border-right-color: transparent;
        border-left-color: #DDD;
    }

    .chat-image .chat-text:before,
    .chat-image .chat-text:after {
        border-color: transparent;
    }
    
    .foot {
        width: 100%;
        height: 50px;
        position: fixed;
        box-sizing: border-box;
        bottom: 0px;
        left: 0px;
        border-top: 1px solid #DDD;
        background-color: #F8F8F8;
    }
    .foot .record-btn,
    .foot .con {
        display: block;
        margin: 8px 65px 0 80px;
        textarea {
            border: 1px solid #DDD;
            border-radius: 5px;
            padding: 5px;
            height: 35px;
            line-height: 22px;
            box-sizing: border-box;
            resize: none;
            width: 100%;
            outline: none;
            font-size: 14px;
            overflow-y: auto;
        }
    }
    .foot .record-btn {
        border: 1px solid #DDD;
        border-radius: 5px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        color: #666;
        &.recording {
            background: #DDD;
        }
    }

    .icon {
        font-size: 26px;
        color: #666;
        margin-top: 13px;
        display: block;
    }
    .upload-wrap {
        width: 30px;
        margin-left: 10px;
    }
    .foot .icon-keyboard,
    .foot .icon-voice {
       width: 30px;
       margin-left: 5px;
    }

    .show {
        display: block;
    }

    .left {
        float: left;
    }
    
    .hide {
        display: none;
    }
    
    .btn {
        display: inline-block;
        vertical-align: top;
        font-size: 14px;
        line-height: 32px;
        margin-left: 5px;
        padding: 0 10px;
        background-color: $brand;
        color: #fff;
        border-radius: 3px;
    }
    
    .btn-send {
        float: right;
        height: 32px;
        line-height: 32px;
        margin: 9px 9px 0 0;
        box-sizing: border-box;
    }
    .picture-btn {
        font-size: 24px;
        color: #666;
        padding: 10px;
        display: inline-block;
    }
</style>