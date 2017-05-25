<template>
    <div>
        <section class="chatlist" :class="showSelBox>0?'chatlist-bottom-collapse':'chatlist-bottom'">
            <mt-loadmore :top-method="loadTop" top-pull-text="加载更多" top-drop-text="释放加载" @top-status-change="handleTopChange" ref="loadmore">
                <ul>
                    <template v-for="item in list">
                        <p>{{item.formattedTime}}</p>
                        <li v-for="chat in item.list" :class="{'chat-mine': chat.fromUserId == 1}">
                            <div class="chat-user"><img src="../../assets/user.png"></div>
                            <div class="time"><cite>{{chat.fromUserName}}</cite></div>
                            <pre class="chat-text" v-html="replaceFace(chat.msgContent.content)"></pre>
                        </li>
                       
                    </template>
                </ul>
            </mt-loadmore>
        </section>

        <section class="foot">
            <textarea :maxlength="100" autofocus ref="message-input" placeholder="请输入消息" class="con" v-model="content"></textarea>
            <span class="btn-face" v-on:click="showSelBox=showSelBox==1?0:1"><i class="fa icon-smile-o" aria-hidden="true"></i></span>
            <span class="btn-plus" v-on:click="showSelBox=showSelBox==2?0:2"><i class="fa" aria-hidden="true" :class="showSelBox==2?'icon-minus-circle':'icon-plus-circle'"></i></span>
            <span class="btn btn-send" v-on:click="sendMsg">发送</span>
            <section class="selbox" :class="showSelBox>0?'show':'hide'">
                <section v-show="showSelBox==1" class="face-box">
                    <mt-swipe :auto="0" :continuous="false">
                        <mt-swipe-item v-for="n in Math.ceil(EXPS.length/18)">
                            <li v-for="(item, index) in getEXP(n,18)">
                                <img :src="'static/emotion/'+item.file" alt="" :data="item.code" v-on:click="content+=item.code">
                            </li>
                        </mt-swipe-item>
                    </mt-swipe>
                </section>
                <div v-show="showSelBox==2">
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
            ],
            // 表情
            EXPS: [
                { file: '100.gif', code: '/::)', title: '微笑',reg:/\/::\)/g },
                { file: '101.gif', code: '/::~', title: '伤心',reg:/\/::~/g },
                { file: '102.gif', code: '/::B', title: '美女',reg:/\/::B/g },
                { file: '103.gif', code: '/::|', title: '发呆',reg:/\/::\|/g },
                { file: '104.gif', code: '/:8-)', title: '墨镜',reg:/\/:8-\)/g },
                { file: '105.gif', code: '/::<', title: '哭',reg:/\/::</g },
                { file: '106.gif', code: '/::$', title: '羞',reg:/\/::\$/g },
                { file: '107.gif', code: '/::X', title: '哑',reg:/\/::X/g },
                { file: '108.gif', code: '/::Z', title: '睡',reg:/\/::Z/g },
                { file: '109.gif', code: '/::\'(', title: '哭',reg:/\/::'\(/g },
                { file: '110.gif', code: '/::-|', title: '囧',reg:/\/::-\|/g },
                { file: '111.gif', code: '/::@', title: '怒',reg:/\/::@/g },
                { file: '112.gif', code: '/::P', title: '调皮',reg:/\/::P/g },
                { file: '113.gif', code: '/::D', title: '笑',reg:/\/::D/g },
                { file: '114.gif', code: '/::O', title: '惊讶',reg:/\/::O/g },
                { file: '115.gif', code: '/::(', title: '难过',reg:/\/::\(/g },
                { file: '116.gif', code: '/::+', title: '酷',reg:/\/::\+/g },
                { file: '117.gif', code: '/:--b', title: '汗',reg:/\/:--b/g },
                { file: '118.gif', code: '/::Q', title: '抓狂',reg:/\/::Q/g },
                { file: '119.gif', code: '/::T', title: '吐',reg:/\/::T/g },
                { file: '120.gif', code: '/:,@P', title: '笑',reg:/\/:,@P/g },
                { file: '121.gif', code: '/:,@-D', title: '快乐',reg:/\/:,@-D/g },
                { file: '122.gif', code: '/::d', title: '奇',reg:/\/::d/g },
                { file: '123.gif', code: '/:,@o', title: '傲' ,reg:/\/:,@o/g},
                { file: '124.gif', code: '/::g', title: '饿',reg:/\/::g/g },
                { file: '125.gif', code: '/:|-)', title: '累' ,reg:/\/:\|-\)/g},
                { file: '126.gif', code: '/::!', title: '吓',reg:/\/::!/g },
                // { file: '127.gif', code: '/::L', title: '汗' },
                // { file: '128.gif', code: '/::>', title: '高兴' },
                // { file: '129.gif', code: '/::,@', title: '闲' },
                // { file: '130.gif', code: '/:,@f', title: '努力' },
                // { file: '131.gif', code: '/::-S', title: '骂' },
                // { file: '132.gif', code: '/:?', title: '疑问' },
                // { file: '133.gif', code: '/:,@x', title: '秘密' },
                // { file: '134.gif', code: '/:,@@', title: '乱' },
                // { file: '135.gif', code: '/::8', title: '疯' },
                // { file: '136.gif', code: '/:,@!', title: '哀' },
                // { file: '137.gif', code: '/:!!!', title: '鬼' },
                // { file: '138.gif', code: '/:xx', title: '打击' },
                // { file: '139.gif', code: '/:bye', title: 'bye' },
                // { file: '140.gif', code: '/:wipe', title: '汗' },
                // { file: '141.gif', code: '/:dig', title: '抠' },
                // { file: '142.gif', code: '/:handclap', title: '鼓掌' },
                // { file: '143.gif', code: '/:&-(', title: '糟糕' },
                // { file: '144.gif', code: '/:B-)', title: '恶搞' },
                // { file: '145.gif', code: '/:<@', title: '什么' },
                // { file: '146.gif', code: '/:@>', title: '什么' },
                // { file: '147.gif', code: '/::-O', title: '累' },
                // { file: '148.gif', code: '/:>-|', title: '看' },
                // { file: '149.gif', code: '/:P-(', title: '难过' },
                // { file: '150.gif', code: '/::\'|', title: '难过' },
                // { file: '151.gif', code: '/:X-)', title: '坏' },
                // { file: '152.gif', code: '/::*', title: '亲' },
                // { file: '153.gif', code: '/:@x', title: '吓' },
                // { file: '154.gif', code: '/:8*', title: '可怜' },
                // { file: '155.gif', code: '/:pd', title: '刀' },
                // { file: '156.gif', code: '/:<W>', title: '水果' },
                // { file: '157.gif', code: '/:beer', title: '酒' },
                // { file: '158.gif', code: '/:basketb', title: '篮球' },
                // { file: '159.gif', code: '/:oo', title: '乒乓' },
                // { file: '160.gif', code: '/:coffee', title: '咖啡' },
                // { file: '161.gif', code: '/:eat', title: '美食' },
                // { file: '162.gif', code: '/:pig', title: '动物' },
                // { file: '163.gif', code: '/:rose', title: '鲜花' },
                // { file: '164.gif', code: '/:fade', title: '枯' },
                // { file: '165.gif', code: '/:showlove', title: '唇' },
                // { file: '166.gif', code: '/:heart', title: '爱' },
                // { file: '167.gif', code: '/:break', title: '分手' },
                // { file: '168.gif', code: '/:cake', title: '生日' },
                // { file: '169.gif', code: '/:li', title: '电' },
                // { file: '170.gif', code: '/:bome', title: '炸弹' },
                // { file: '171.gif', code: '/:kn', title: '刀子' },
                // { file: '172.gif', code: '/:footb', title: '足球' },
                // { file: '173.gif', code: '/:ladybug', title: '瓢虫' },
                // { file: '174.gif', code: '/:shit', title: '翔' },
                // { file: '175.gif', code: '/:moon', title: '月亮' },
                // { file: '176.gif', code: '/:sun', title: '太阳' },
                // { file: '177.gif', code: '/:gift', title: '礼物' },
                // { file: '178.gif', code: '/:hug', title: '抱抱' },
                // { file: '179.gif', code: '/:strong', title: '拇指' },
                // { file: '180.gif', code: '/:weak', title: '贬低' },
                // { file: '181.gif', code: '/:share', title: '握手' },
                // { file: '182.gif', code: '/:v', title: '剪刀手' },
                // { file: '183.gif', code: '/:@)', title: '抱拳' },
                // { file: '184.gif', code: '/:jj', title: '勾引' },
                // { file: '185.gif', code: '/:@@', title: '拳头' },
                // { file: '186.gif', code: '/:bad', title: '小拇指' },
                // { file: '187.gif', code: '/:lvu', title: '拇指八' },
                // { file: '188.gif', code: '/:no', title: '食指' },
                // { file: '189.gif', code: '/:ok', title: 'ok' },
                // { file: '190.gif', code: '/:love', title: '情侣' },
                // { file: '191.gif', code: '/:<L>', title: '爱心' },
                // { file: '192.gif', code: '/:jump', title: '蹦哒' },
                // { file: '193.gif', code: '/:shake', title: '颤抖' },
                // { file: '194.gif', code: '/:<O>', title: '怄气' },
                // { file: '195.gif', code: '/:circle', title: '跳舞' },
                // { file: '196.gif', code: '/:kotow', title: '发呆' },
                // { file: '197.gif', code: '/:turn', title: '背着' },
                // { file: '198.gif', code: '/:skip', title: '伸手' },
                // { file: '199.gif', code: '/:oY', title: '耍帅' }
            ]
        }
    },
    methods: {
    
        getEXP: function (pageNow,pageSize) {
            return this.EXPS.slice((pageNow - 1) * pageSize, pageSize * pageNow)
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
            var wsServer = 'ws://chat.ws'; 
            var websocket = new WebSocket(wsServer); 
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
        sendMsg: function(){
            var _this=this;

            if(this.content==''){
                Toast('请输入消息');
                return;
            }

            this.records.push({
                type: 1,
                time: util.formatDate.format(new Date(),'yyyy-MM-dd hh:mm:ss'),
                name: '游客',
                content: this.content
            });

            setTimeout(function(){
                _this.records.push({
                    type: 2,
                    time: util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                    name: '客服MM',
                    content: '你好！'
                });
            },100);

            this.content='';

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
        //替换表情代码
        replaceFace:function(con){
            var _this=this;
            var exps=this.EXPS;
            for(var i=0;i<exps.length;i++){
                //con = con.replace(new RegExp(exps[i].code,'g'), '<img src="static/emotion/' + exps[i].file +'"  alt="" />');
                con = con.replace(exps[i].reg, '<img src="static/emotion/' + exps[i].file +'"  alt="" />');
            }
            return con;
        },
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
<style>
    .chatlist {
        width: 100%;
        box-sizing: border-box;
        position: absolute;
        top: 60px;
        bottom: 48px;
        left: 0px;
        right: 0px;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 10px;
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
        padding-right: 60px;
    }
    
    .chatlist ul li {
        position: relative;
        /*font-size: 0;*/
        margin-bottom: 10px;
        padding-left: 60px;
        min-height: 68px;
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
        /*font-size: 14px;*/
    }
    
    .chat-user img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
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
        background-color: #33DF83;
        color: #fff;
    }
    
    .chat-text {
        position: relative;
        line-height: 22px;
        /*margin-top: 25px;*/
        padding: 10px 15px;
        background-color: #eee;
        border-radius: 3px;
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
        border-color: #eee transparent transparent;
        overflow: hidden;
        border-width: 10px;
    }
    
    .chat-mine .chat-text:after {
        left: auto;
        right: -10px;
        border-top-color: #33DF83;
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
        left: 70px;
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
        left: 0px;
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
        background-color: #33DF83;
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