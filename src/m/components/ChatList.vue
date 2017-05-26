<template>
    <div>
        <section class="chatlist" :class="showSelBox>0?'chatlist-bottom-collapse':'chatlist-bottom'">
            <mt-loadmore :top-method="loadTop" top-pull-text="加载更多" top-drop-text="释放加载" @top-status-change="handleTopChange" ref="loadmore">
                <ul>
                    <template v-for="item in list">
                        <p class="time">{{item.formattedTime}}</p>
                        <li v-for="chat in item.list" :class="{'chat-mine': chat.fromUserId == 1}">
                            <div class="chat-user"><img src="../../assets/user.png"></div>
                            <pre class="chat-text" v-html="chat.msgContent.content"></pre>
                        </li>
                    </template>
                </ul>
            </mt-loadmore>
        </section>

        <section class="foot">
            <textarea :maxlength="100" autofocus ref="message-input" placeholder="请输入消息" class="con" v-model="content"></textarea>
            <!--<span class="btn-face" v-on:click="showSelBox=showSelBox==1?0:1"><i class="fa icon-smile-o" aria-hidden="true"></i></span>-->
            <span class="btn-plus" v-on:click="showSelBox=showSelBox==2?0:2"><i class="fa" aria-hidden="true" :class="showSelBox==2?'icon-minus-circle':'icon-plus-circle'"></i></span>
            <span class="btn btn-send" v-on:click="sendMsg">发送</span>
            <section class="selbox" :class="showSelBox>0?'show':'hide'">
                <section v-show="showSelBox==1" class="face-box">
                    <!--                
                    <mt-swipe :auto="0" :continuous="false">
                        <mt-swipe-item v-for="n in Math.ceil(EXPS.length/18)">
                            <li v-for="(item, index) in getEXP(n,18)">
                                <img :src="'static/emotion/'+item.file" alt="" :data="item.code" v-on:click="content+=item.code">
                            </li>
                        </mt-swipe-item>
                    </mt-swipe>
                    -->
                </section>
                <div>
                    <span class="picture-btn icon-picture-o"></span>
                </div>
            </section>
        </section>
    </div>
</template>

<script>
import util from '../../common/util'
import { Toast } from 'mint-ui';
import formatChatTime from '../../common/function/formatChatTime';

export default {
    name: 'chatlist',
    data() {
        return {
            showSelBox: 0, // 0隐藏 1显示表情 2显示其他
            selFace: '表情',
            selOther: '其他功能',
            content:'',
            websocket: null,
            topStatus: '',
            list: [],
            //聊天记录
            records: [
                {
                    fromUserName:"客户A",
                    fromUserId: 1,
                    toUserName: "护士-A",
                    toUserId: 1,
                    createTime: 1463961600000,
                    msgType: "TEXT",
                    msgId: 1231321321,
                    msgContent: {
                        content: '这是文本消息1'
                    }
                },
                {
                    fromUserName:"客户A",
                    fromUserId: 1,
                    toUserName: "护士-B",
                    toUserId: 1,
                    createTime: 1495625410435,
                    msgType: "TEXT",
                    msgId: 1231321321,
                    msgContent: {
                        content: '这是文本消息2'
                    }
                },
                {
                    fromUserName:"客户A",
                    fromUserId: 2,
                    toUserName: "护士-周希",
                    toUserId: 2,
                    createTime: 1495625676338,
                    msgType: "TEXT",
                    msgId: 1231321321,
                    msgContent: {
                        content: '这是文本消息3'
                    }
                }
            ]
        }
    },
    methods: {

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
            var wsServer = 'ws://chat.ws'; 
            var websocket = new WebSocket(wsServer);
            this.websocket = websocket;
            websocket.onopen = function (evt) { onOpen(evt) };
            websocket.onclose = function (evt) { onClose(evt) };
            websocket.onmessage = function (evt) { onMessage(evt) };
            websocket.onerror = function (evt) { onError(evt) };
            function onOpen(evt) { 
                console.log("Connected to WebSocket server."); 
            } 
            function onClose(evt) { 
                console.log("Disconnected"); 
            } 
            function onMessage(evt) { 
                
            } 
            function onError(evt) { 
                console.log('Error occured: ' + evt.data); 
            }
        },
        //发送消息
        sendMsg: function() {
            var websocket = this.websocket;
            console.log(this.content);
            if (websocket) {
                websocket.send('message', {

                });
            }
            this.scrollToBottom();
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

        //聚焦输入框
        focusTxtContent:function() {
            setTimeout(()=> {
                this.$refs['message-input'].focus();
            }, 1000);
        },
        //滚动条滚动到底部
        scrollToBottom:function(){
            setTimeout(function(){
                var chatlist = document.getElementsByClassName('chatlist')[0];
                chatlist.scrollTop=chatlist.scrollHeight;
            },100);
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
        loadTop(id) {
            var _this=this;
            setTimeout(() => {
                var chatlist = document.getElementsByClassName('chatlist')[0];
                var oldHeight=chatlist.scrollHeight;

                _this.records.unshift({
                    type: 1,
                    time: util.formatDate.format(new Date(),'yyyy-MM-dd hh:mm:ss'),
                    name: '游客',
                    content: '你好！13213'
                }, {
                    type: 2,
                    time: util.formatDate.format(new Date(),'yyyy-MM-dd hh:mm:ss'),
                    name: '客户MM',
                    content: '这里是<a target="_blank" href="https://github.com/taylorchen709/vue-chat">源码</a>13213'
                });

                setTimeout(function(){
                    var newHeight = chatlist.scrollHeight;
                    chatlist.scrollTop = newHeight - oldHeight;
                },100);

                this.$refs.loadmore.onTopLoaded(id);
            }, 1500);
        }
    },
    mounted: function(){
        this.scrollToBottom();
        this.focusTxtContent();
        // this.initScoket();
        this.receiveMessage(this.records);
        
        // mock获取历史消息
        setTimeout(()=> {
            this.loadMessage({
                fromUserName:"客户A",
                fromUserId: 2,
                toUserName: "护士-周希",
                toUserId: 2,
                createTime: 1432252800000,
                msgType: "TEXT",
                msgId: 1231321321,
                msgContent: {
                    content: '这是文本消息7'
                }
            });
        }, 5000)
    
        // mock 两秒钟后来了两条新消息
        setTimeout(()=> {
            this.receiveMessage({
                    fromUserName:"客户A",
                    fromUserId: 2,
                    toUserName: "护士-周希",
                    toUserId: 2,
                    createTime: 1495642392172,
                    msgType: "TEXT",
                    msgId: 1231321321,
                    msgContent: {
                        content: '这是文本消息5'
                    }
                });
        }, 2000);

        // mock 两秒钟后来了两条新消息
        setTimeout(()=> {
            this.receiveMessage([{
                fromUserName:"客户A",
                fromUserId: 2,
                toUserName: "护士-周希",
                toUserId: 2,
                createTime: 1495642398371,
                msgType: "TEXT",
                msgId: 1231321321,
                msgContent: {
                    content: '这是文本消息6'
                }
            }]);
        }, 3000)

    }
    // updated:function(){
    //     this.scrollToBottom();
    // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import 'src/assets/scss/common/color';
    .chatlist {
        width: 100%;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        bottom: 48px;
        left: 0px;
        right: 0px;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 10px;
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
    }
    
    .chat-text,
    .chat-user {
        display: inline-block;
        vertical-align: top;
        font-size: 14px;
    }
    
    .chat-text img {
        max-width: 100%;
        vertical-align: middle;
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
    
    .foot {
        width: 100%;
        min-height: 48px;
        position: fixed;
        bottom: 0px;
        left: 0px;
        border-top: 1px solid #DDD;
        background-color: #F8F8F8;
    }
    
    .foot .con {
        position: absolute;
        left: 40px;
        right: 40px;
        height: 48px;
        outline: none;
        width: 100%;
        box-sizing: border-box;
        font-size: 14px;
        padding: 15px 120px 5px 5px;
        resize: none;
        border: 0;
        border-left: 1px solid #EEE;
    }
    
    .foot .btn-plus {
        width: 28px;
        padding: 9px 3px;
        position: absolute;
        left: 5px;
    }
    
    .foot .btn-plus i {
        font-size: 2em;
        color: #ccc;
    }
    
    .foot .btn-face {
        width: 28px;
        padding: 9px 3px 9px 0px;
        position: absolute;
        left: 35px;
        /*border-right: 1px solid #d9d9d9;*/
    }
    
    .foot .btn-face i {
        font-size: 2em;
        color: #d9d9d9;
    }
    
    .foot .selbox {
        height: 150px;
        margin-top: 48px;
        border-top: 1px solid #d9d9d9;
    }
    
    .show {
        display: block;
    }
    
    .hide {
        display: none;
    }
    
    .face-box {
        /* position: absolute; */
        /* top: 48px; */
        /* left: 0px; */
        /* right: 0px; */
        /* bottom: 0px; */
        padding: 15px 15px 0px 15px;
        overflow: hidden;
        width: 290px;
        margin: 0px auto;
        height: 135px;
    }
    
    .face-box li {
        width: 30px;
        float: left;
        padding: 6px 10px 0px 8px;
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
        position: absolute;
        right: 8px;
        top: 8px;
    }
    .picture-btn {
        font-size: 24px;
        color: #666;
        padding: 10px;
        display: inline-block;
    }
</style>