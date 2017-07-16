webpackJsonp([1],[function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}var r=n(4),i=o(r),s=n(53),a=o(s);n(138),n(139);var u=n(163),c=o(u),A=n(18),d=o(A);window.toast=function(t){(0,d.default)(t)},n(82),n(81),i.default.use(a.default),new i.default({render:function(t){return t("div",{attrs:{id:"app"},class:"app"},[t("chat",null,[])])},components:{Chat:c.default}}).$mount("#app")},,,,,,,,,,,function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return l.default.post(t,e)}function i(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return l.default.post(t,f.stringify(e),{headers:{"Content-Type":"application/x-www-form-urlencoded"}})}function s(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return l.default.delete(t,{params:e})}function a(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return l.default.get(t,{params:e})}function u(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return l.default.put(t,e)}Object.defineProperty(e,"__esModule",{value:!0});var c=n(37),A=o(c);e.post=r,e.form=i,e.del=s,e.get=a,e.put=u;var d=n(31),l=o(d),f=n(54);l.default.interceptors.request.use(function(t){return t.headers["X-Requested-With"]="XMLHttpRequest",t},function(t){return A.default.reject(t)}),l.default.interceptors.response.use(function(t){var e=t.data;return"string"==typeof e&&(e=JSON.parse(e)),0===e.code?e:(toast(e.message||"系统异常","error"),A.default.reject(e))},function(t){return toast("系统异常","error"),A.default.reject(t)})},,,,,,,,,,function(t,e,n){"use strict";function o(){return(0,s.form)("/aaa",{name:"xiaobin"})}function r(){return(0,s.get)("/qiniu/uptoken")}function i(t){return(0,s.post)("/storage/upload.json",t)}Object.defineProperty(e,"__esModule",{value:!0}),e.bindTel=o,e.uptoken=r,e.upload=i;var s=n(11)},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["seconds","url","maxWidth","minWidth"],data:function(){return{audio:null,loading:!1,isLoaded:!1,status:0,timer:null,timerSeconds:this.seconds}},computed:{audios:function(){return this.$root.audios||[]}},mounted:function(){this.init()},methods:{calcProgress:function(){var t=this.audio;this.timerSeconds=t.duration-t.currentTime},countDown:function(){var t=this;this.timer&&clearTimeout(this.timer),this.timer=setTimeout(function(){t.calcProgress(),t.countDown()},1e3)},calcWidth:function(){var t=this.minWidth||85,e=this.maxWidth||200,n=this.seconds,o=Math.round(n/1.5);return o<t?t:o>e?e:o},play:function(){var t=this;this.audios.forEach(function(t){t.pause()}),setTimeout(function(){t.countDown()},1e3),this.audio.play(),this.status=1},pause:function(){this.audio.pause(),clearTimeout(this.timer),this.status=0},run:function(t){this.status?this.pause():(this.isLoaded||(this.loading=!0),this.play()),t.stopPropagation()},init:function(){var t=this,e=this.url,n=document.createElement("audio");if(n.src=e,this.audio=n,n.addEventListener("ended",function(){t.status=0}),n.addEventListener("loadeddata",function(){t.isLoaded=!0,t.loading=!1}),this.$store)this.$store.dispatch("addAudio",this);else{var o=this.$root.audios;o||(this.$root.audios=[]),this.$root.audios.push(this)}}},beforeDestroy:function(){if(this.$store)this.$store.commit("REMOVE_AUDIOS",this);else{var t=this.$root.audios,e=t.indexOf(this);this.$root.audios.splice(e,1)}this.status=0,this.audio=null}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{accept:{type:String,default:"image/*"},isIphone:{default:function(){return navigator.userAgent.indexOf("iPhone")>-1}},multiple:{type:Boolean,default:!1}},methods:{fileInputChange:function(){this.$emit("change",this.$refs.inputFile.files),this.reset()},reset:function(){this.$refs.form.reset()}}}},,function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(165),i=o(r),s=n(164),a=o(s);e.default={name:"app",components:{Heads:i.default,ChatList:a.default}}},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(95),i=o(r),s=n(91),a=(o(s),n(53)),u=n(21),c=n(86),A=o(c),d=n(160),l=o(d),f=n(159),h=o(f),p=n(87),m=o(p),g=n(89),v=o(g),y=null;e.default={mixins:[v.default],name:"chatlist",data:function(){return{showSelBox:0,selFace:"表情",selOther:"其他功能",content:"",isShowKeyboard:!1,recording:!1,websocket:null,topStatus:"",sending:!1,list:[],userInfo:{id:1,roleType:2},records:[]}},methods:{record:function(t){var e=this,n=this.recording;t?n||(wx.startRecord(),this.recording=!0):(this.recording=!1,wx.stopRecord({success:function(t){e.sendVoiceMsg(t.localId)}}))},sendVoiceMsg:function(t){var e=this.wesocket;console.log(t),e.send((0,i.default)({type:"CHAT",msgType:"VOICE",msgContent:{mediaId:t}}))},bindEvent:function(){var t=this;this.$refs["record-btn"].addEventListener("touchstart",this.touchStartHandler,!1),this.$refs["record-btn"].addEventListener("touchend",this.touchEndHandler,!1),wx.ready(function(){console.log("wx ready"),wx.onVoicePlayEnd({success:function(e){t.sendVoiceMsg(e.localId)}})})},touchStartHandler:function(t){var e=this;t.preventDefault(),y&&clearTimeout(y),y=setTimeout(function(){console.log("start voice"),e.record(1)},1e3)},touchEndHandler:function(t){clearTimeout(y),console.log("end voice"),this.record(0)},changePicture:function(t){if(t){var e=t[0],n=new FormData,o=this.websocket;n.append("file",e),a.Indicator.open("加载中…"),(0,u.upload)(n).then(function(t){a.Indicator.close(),toast("图片上传成功"),console.log((0,i.default)({type:"CHAT",msgType:"image",msgContent:{picUrl:t.data.url}})),o.send((0,i.default)({type:"CHAT",msgType:"image",msgContent:{picUrl:t.data.url}}))}).catch(function(){a.Indicator.close()})}},msgGroupItem:function(){return{formattedTime:"",timeStamp:0,list:[]}},createGroupMsg:function(t){var e=this.msgGroupItem();return e.formattedTime=(0,A.default)(t.createTime),e.timeStamp=t.createTime,e.list=e.list.concat(t),e},timeStampToMinute:function(t){return(""+t).slice(0,10)},insertBefore:function(t){var e=null,n=this.list,o=n.length,r=o?n[0]:null;return r?this.timeStampToMinute(r.timeStamp)-this.timeStampToMinute(t.createTime)>=300?e=this.createGroupMsg(t):r.list=[].concat(t).concat(r.list):e=this.createGroupMsg(t),e},appendMsg:function(t){var e=null,n=this.list,o=n.length,r=o?n[o-1]:null;return r?this.timeStampToMinute(t.createTime)-this.timeStampToMinute(r.timeStamp)>=300?e=this.createGroupMsg(t):r.list=r.list.concat(t):e=this.createGroupMsg(t),e},formatChatTime:A.default,initScoket:function(){function t(t){console.log("Connected to WebSocket server.")}function e(t){a.websocket=null,console.log("Disconnected")}function n(t){console.log("Error occured: "+t.data)}var o=(0,m.default)(),r=o.openId,i=o.chatUserId,s=o.chatUserRole,a=this;if(!r)return void toast("没有openId");var u="openId="+r;i&&(u+="&chatUserId="+i),s&&(u+="&chatUserRole="+s);var c="ws://xm.56xg.com/chat.ws?"+u,A=new WebSocket(c);this.websocket=A,A.addEventListener("open",t),A.addEventListener("close",e),A.addEventListener("error",n),A.addEventListener("message",this.processMessage)},processMessage:function(t){var e=this;this.sending=!1;var n=JSON.parse(t.data);console.log(n),"CHAT"==n.type?(this.receiveMessage(n),this.scrollToBottom()):"LOGIN_INFO"==n.type?(this.userInfo=n.userInfo,this.setTitle(n.chatUser.name||""),setTimeout(function(){e.getWechatJsSign()}),setTimeout(function(){e.loadHistory()}),this.scrollToBottom()):"CHAT_HISTORY"==n.type&&(this.loadMessage(n.msgList),this.$refs.loadmore.onTopLoaded())},sendMsg:function(){var t=this.websocket,e=this.content.trim();return e?t?(this.sending=!0,t.send((0,i.default)({type:"CHAT",msgType:"text",msgContent:{content:e}})),void(this.content="")):void toast("socket没有连接成功"):void toast("请输入消息内容")},receiveMessage:function(t){var e=this,t=[].concat(t);t.forEach(function(t){var n=e.appendMsg(t);n&&(e.list=e.list.concat(n))})},loadMessage:function(t){for(var t=[].concat(t),e=t.length-1;e>=0;e--){var n=this.insertBefore(t[e]);n&&(this.list=[].concat(n).concat(this.list))}},focusTxtContent:function(){var t=this;setTimeout(function(){t.$refs["message-input"].focus()},1e3)},scrollToBottom:function(){setTimeout(function(){var t=document.getElementsByClassName("mint-loadmore")[0];t.scrollTop=t.scrollHeight},100)},previewImg:function(t){this.previewImage(t,document.querySelectorAll(".chat-pic"))},handleTopChange:function(t){this.topStatus=t},getFirstMsgId:function(){var t=this.list;if(!t.length)return null;var e=t[0],n=e.list;return n&&n.length?n[0].msgId:""},loadHistory:function(){var t=this.websocket;t&&t.send((0,i.default)({type:"CHAT_HISTORY",length:10,firstMsgId:this.getFirstMsgId()}))},loadTop:function(t){this.loadHistory()},setTitle:function(t){document.title=t;var e=document.createElement("iframe");e.src="//m.baidu.com/favicon.ico",e.style.display="none",e.onload=function(){setTimeout(function(){e.remove()},9)},document.body.appendChild(e)}},components:{Upload:l.default,AudioPlayer:h.default},beforeDestroy:function(){console.log("destroy");var t=this.websocket;t&&t.close()},mounted:function(){this.focusTxtContent(),this.initScoket(),this.bindEvent()}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"heads",data:function(){return{vociceOpen:!0}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={debug:!0,appId:"wx8d2c6e4d8907451a",timestamp:1490176842,nonceStr:"bldxw1zv28",signature:"7c0ed8e6d1da24e4dbb56e6fd2a20d787e50d314",jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone","hideMenuItems","showMenuItems","hideAllNonBaseMenuItem","showAllNonBaseMenuItem","translateVoice","startRecord","stopRecord","onVoiceRecordEnd","playVoice","onVoicePlayEnd","pauseVoice","stopVoice","uploadVoice","downloadVoice","chooseImage","previewImage","uploadImage","downloadImage","getNetworkType","openLocation","getLocation","hideOptionMenu","showOptionMenu","closeWindow","scanQRCode","chooseWXPay","openProductSpecificView","addCard","chooseCard","openCard"]}},function(t,e,n){var o;!function(r){"use strict";function i(t,e){for(var n=[],o=0,r=t.length;o<r;o++)n.push(t[o].substr(0,e));return n}function s(t){return function(e,n,o){var r=o[t].indexOf(n.charAt(0).toUpperCase()+n.substr(1).toLowerCase());~r&&(e.month=r)}}function a(t,e){for(t=String(t),e=e||2;t.length<e;)t="0"+t;return t}var u={},c=/d{1,4}|M{1,4}|yy(?:yy)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,A=/\d\d?/,d=/\d{3}/,l=/\d{4}/,f=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,h=function(){},p=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],m=["January","February","March","April","May","June","July","August","September","October","November","December"],g=i(m,3),v=i(p,3);u.i18n={dayNamesShort:v,dayNames:p,monthNamesShort:g,monthNames:m,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!==10)*t%10]}};var y={D:function(t){return t.getDay()},DD:function(t){return a(t.getDay())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return t.getDate()},dd:function(t){return a(t.getDate())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return t.getMonth()+1},MM:function(t){return a(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},yy:function(t){return String(t.getFullYear()).substr(2)},yyyy:function(t){return t.getFullYear()},h:function(t){return t.getHours()%12||12},hh:function(t){return a(t.getHours()%12||12)},H:function(t){return t.getHours()},HH:function(t){return a(t.getHours())},m:function(t){return t.getMinutes()},mm:function(t){return a(t.getMinutes())},s:function(t){return t.getSeconds()},ss:function(t){return a(t.getSeconds())},S:function(t){return Math.round(t.getMilliseconds()/100)},SS:function(t){return a(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return a(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+a(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)}},M={d:[A,function(t,e){t.day=e}],M:[A,function(t,e){t.month=e-1}],yy:[A,function(t,e){var n=new Date,o=+(""+n.getFullYear()).substr(0,2);t.year=""+(e>68?o-1:o)+e}],h:[A,function(t,e){t.hour=e}],m:[A,function(t,e){t.minute=e}],s:[A,function(t,e){t.second=e}],yyyy:[l,function(t,e){t.year=e}],S:[/\d/,function(t,e){t.millisecond=100*e}],SS:[/\d{2}/,function(t,e){t.millisecond=10*e}],SSS:[d,function(t,e){t.millisecond=e}],D:[A,h],ddd:[f,h],MMM:[f,s("monthNamesShort")],MMMM:[f,s("monthNames")],a:[f,function(t,e,n){var o=e.toLowerCase();o===n.amPm[0]?t.isPm=!1:o===n.amPm[1]&&(t.isPm=!0)}],ZZ:[/[\+\-]\d\d:?\d\d/,function(t,e){var n,o=(e+"").match(/([\+\-]|\d\d)/gi);o&&(n=+(60*o[1])+parseInt(o[2],10),t.timezoneOffset="+"===o[0]?n:-n)}]};M.DD=M.D,M.dddd=M.ddd,M.Do=M.dd=M.d,M.mm=M.m,M.hh=M.H=M.HH=M.h,M.MM=M.M,M.ss=M.s,M.A=M.a,u.masks={default:"ddd MMM dd yyyy HH:mm:ss",shortDate:"M/D/yy",mediumDate:"MMM d, yyyy",longDate:"MMMM d, yyyy",fullDate:"dddd, MMMM d, yyyy",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"},u.format=function(t,e,n){var o=n||u.i18n;if("number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date in fecha.format");return e=u.masks[e]||e||u.masks.default,e.replace(c,function(e){return e in y?y[e](t,o):e.slice(1,e.length-1)})},u.parse=function(t,e,n){var o=n||u.i18n;if("string"!=typeof e)throw new Error("Invalid format in fecha.parse");if(e=u.masks[e]||e,t.length>1e3)return!1;var r=!0,i={};if(e.replace(c,function(e){if(M[e]){var n=M[e],s=t.search(n[0]);~s?t.replace(n[0],function(e){return n[1](i,e,o),t=t.substr(s+e.length),e}):r=!1}return M[e]?"":e.slice(1,e.length-1)}),!r)return!1;var s=new Date;i.isPm===!0&&null!=i.hour&&12!==+i.hour?i.hour=+i.hour+12:i.isPm===!1&&12===+i.hour&&(i.hour=0);var a;return null!=i.timezoneOffset?(i.minute=+(i.minute||0)-+i.timezoneOffset,a=new Date(Date.UTC(i.year||s.getFullYear(),i.month||0,i.day||1,i.hour||0,i.minute||0,i.second||0,i.millisecond||0))):a=new Date(i.year||s.getFullYear(),i.month||0,i.day||1,i.hour||0,i.minute||0,i.second||0,i.millisecond||0),a},"undefined"!=typeof t&&t.exports?t.exports=u:(o=function(){return u}.call(e,n,e,t),!(void 0!==o&&(t.exports=o)))}(void 0)},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}var r=n(4),i=o(r),s=n(83),a=o(s);i.default.filter("compressImage",function(t,e,n){return(0,a.default)(t,{width:e,height:n})})},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}var r=n(80),i=o(r),s=n(4),a=o(s);a.default.filter("date",function(t,e){return i.default.format(new Date(t),e)})},function(t,e){"use strict";var n=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.width||0,o=e.height||0,r=t;n=Math.floor(n),o=Math.floor(o);var i=1;return i="undefined"!=typeof window?window.devicePixelRatio:2,i&&i>1&&(n=Math.floor(n*i),o=Math.floor(o*i)),r+="?imageMogr2",n||o?n||o?r+="/crop/"+(n||"")+"x"+(o||""):void 0:r};t.exports=n},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){return Math.random().toString(36).substr(2,15)}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){return parseInt((new Date).getTime()/1e3)+""}},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t){var e=new Date(t),n=e.getFullYear(),o=e.getMonth()+1,r=e.getDate(),i=e.getHours(),a=e.getMinutes(),u=i>12?" 下午 ":" 上午 ",c=n+"/"+o+"/"+r+"/"+u+(0,s.default)(i)+":"+(0,s.default)(a);return c}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r;var i=n(88),s=o(i)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(92),r=function(){return o.parseQuery(window.location.search)};e.default=r},function(t,e){"use strict";function n(t){return(t<10?"0":"")+t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(96),i=o(r),s=n(90),a=n(79),u=o(a);e.default={methods:{getWechatJsSign:function(){return(0,s.getWechatJsSign)({url:location.href.split("#")[0]}).then(function(t){var e=t.data;return(0,i.default)(u.default,{signature:e.signature,url:e.url,appId:e.appId||u.default.appId,timestamp:e.timestamp,nonceStr:e.noncestr}),window.wx.config(u.default),e})},previewImage:function(t,e){var n=[];e.forEach(function(t,e){n.push(t.dataset.url)}),wx.previewImage({current:t,urls:n})},openLocation:function(t,e,n,o){wx.openLocation({latitude:t,longitude:e,name:n,address:o,scale:28,infoUrl:""})},getOwnPermissions:function(t){var e=this.$root.permissions||[],n=!1;return e.some(function(e){return e.name==t})&&(n=!0),n}}}},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t){return(0,i.post)("/wechat/signature.json",{url:t.url,nonceStr:(0,a.default)(),timestamp:(0,c.default)()})}Object.defineProperty(e,"__esModule",{value:!0}),e.getWechatJsSign=r;var i=n(11),s=n(84),a=o(s),u=n(85),c=o(u)},function(t,e){"use strict";function n(t,e){for(var e=e-(t+"").length,n=0;n<e;n++)t="0"+t;return t}Object.defineProperty(e,"__esModule",{value:!0});var o=/([yMdhsm])(\1*)/g,r="yyyy-MM-dd";e.default={getQueryStringByName:function(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(e),o="";return null!=n&&(o=n[2]),e=null,n=null,null==o||""==o||"undefined"==o?"":o},formatDate:{format:function(t,e){return e=e||r,e.replace(o,function(e){switch(e.charAt(0)){case"y":return n(t.getFullYear(),e.length);case"M":return n(t.getMonth()+1,e.length);case"d":return n(t.getDate(),e.length);case"w":return t.getDay()+1;case"h":return n(t.getHours(),e.length);case"m":return n(t.getMinutes(),e.length);case"s":return n(t.getSeconds(),e.length)}})},parse:function(t,e){var n=e.match(o),r=t.match(/(\d)+/g);if(n.length==r.length){for(var i=new Date(1970,0,1),s=0;s<n.length;s++){var a=parseInt(r[s]),u=n[s];switch(u.charAt(0)){case"y":i.setFullYear(a);break;case"M":i.setMonth(a-1);break;case"d":i.setDate(a);break;case"h":i.setHours(a);break;case"m":i.setMinutes(a);break;case"s":i.setSeconds(a)}}return i}return null}}}},function(t,e){"use strict";function n(t){var e={};if("string"==typeof t&&t.length>1){var n=0,o=t.charAt(0);if("?"===o)n=1;else if("#"===o){n=1;var r=t.charAt(1);"/"===r&&(n=2)}n>0&&(t=t.substr(n)),t.split("&").forEach(function(t,n){var o=t.split("=");if(2===o.length){var r=o[0].trim(),i=o[1].trim()||"",s=i.indexOf("#");r.indexOf("?")>0&&(r=r.split("?")[1]),s>=0&&(i=i.substring(0,s)),r&&(e[r]=decodeURIComponent(i))}})}return e}function o(t){return t||(t=document.URL),e.parse(t).origin}function r(t){var e=document.createElement("a");e.href=t,t=e.href;var n="";e.protocol&&e.host?n=e.protocol+"//"+e.host:/^(http[s]?:\/\/[^\/]+)(?=\/)/.test(t)&&(n=RegExp.$1);var o=n.split(":");0===n.indexOf("http:")&&3===o.length&&80==o[2]&&(o.length=2,n=o.join(":"));var r=e.pathname;return r&&"/"!==r.charAt(0)&&(r="/"+r),{origin:n,pathname:r,search:e.search}}Object.defineProperty(e,"__esModule",{value:!0}),e.parseQuery=n,e.getOrigin=o,e.parse=r},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},,,function(t,e){},function(t,e){},,function(t,e){},function(t,e){},function(t,e){},,,,,,,,,,function(t,e){t.exports="data:image/png;base64,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"},,function(t,e,n){n(142);var o=n(6)(n(73),n(166),null,null);t.exports=o.exports},function(t,e,n){n(146);var o=n(6)(n(74),n(171),null,null);t.exports=o.exports},,,function(t,e,n){n(145);var o=n(6)(n(76),n(169),null,null);t.exports=o.exports},function(t,e,n){n(147);var o=n(6)(n(77),n(172),null,null);t.exports=o.exports},function(t,e,n){n(143);var o=n(6)(n(78),n(167),"data-v-29917e2d",null);t.exports=o.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"audio-player",class:{playing:1==t.status},style:{width:t.calcWidth()+"px"},on:{click:t.run}},[t.loading?t._e():n("div",[n("i",{staticClass:"icon-wave-right"}),n("span",{staticClass:"audio-length"},[t._v(t._s(Math.floor(this.timerSeconds/60)+"'"+Math.round(this.timerSeconds%60))+"\n\t\t")])]),t._v(" "),t.loading?n("div",[t._v("\n\t\t下载中...\n\t")]):t._e()])},staticRenderFns:[]}},function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",{staticClass:"top"},[o("img",{staticClass:"head",attrs:{src:n(157)}}),t._v(" "),o("span",{staticClass:"name"},[t._v("客服MM")]),t._v(" "),o("span",{staticClass:"voice"},[o("i",{staticClass:"fa",class:t.vociceOpen?"icon-volume-up":"icon-volume-down",attrs:{"aria-hidden":"true"},on:{click:function(e){t.vociceOpen=!t.vociceOpen}}})])])},staticRenderFns:[]}},,function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("ChatList")],1)},staticRenderFns:[]}},,function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"upload-wrapper clearfix"},[n("div",{staticClass:"upload-btn"},[t._t("default"),t._v(" "),n("form",{ref:"form",attrs:{onsubmit:"return false"}},[t.isIphone?n("input",{ref:"inputFile",attrs:{type:"file",capture:"camera",accept:t.accept,multiple:t.multiple},on:{change:t.fileInputChange}}):n("input",{ref:"inputFile",attrs:{type:"file",accept:t.accept,multiple:t.multiple},on:{change:t.fileInputChange}})])],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("section",{staticClass:"chatlist"},[n("mt-loadmore",{ref:"loadmore",attrs:{"top-method":t.loadTop,"top-pull-text":"加载更多","top-drop-text":"释放加载"},on:{"top-status-change":t.handleTopChange}},[n("ul",[t._l(t.list,function(e){return[n("p",{staticClass:"time"},[t._v(t._s(e.formattedTime))]),t._v(" "),t._l(e.list,function(e,o){return n("li",{key:o,class:{"chat-mine":e.fromUserId==t.userInfo.id&&e.fromUserRole==t.userInfo.roleType,"chat-image":"image"==e.msgType,"chat-voice":"voice"==e.msgType}},[n("div",{staticClass:"chat-user"},[n("img",{attrs:{src:e.fromUserAvatar}})]),t._v(" "),"text"==e.msgType?n("pre",{staticClass:"chat-text",domProps:{textContent:t._s(e.msgContent.content)}}):"image"==e.msgType?n("pre",{staticClass:"chat-text text-image",on:{click:function(n){t.previewImg(e.msgContent.picUrl)}}},[n("img",{staticClass:"chat-pic",attrs:{width:"110",height:"110","data-url":e.msgContent.picUrl,src:t._f("compressImage")(e.msgContent.picUrl,110,110)}})]):"voice"==e.msgType?n("pre",{staticClass:"chat-text text-voice"},[n("audio-player",{attrs:{seconds:e.seconds||60.12,url:e.msgContent.voiceUrl}})],1):t._e()])})]})],2)])],1),t._v(" "),n("section",{staticClass:"foot clearfix"},[n("upload",{staticClass:"left upload-wrap",on:{change:t.changePicture}},[n("span",{staticClass:"icon icon-plus"})]),t._v(" "),t.isShowKeyboard?t._e():n("span",{staticClass:"icon icon-voice left",on:{click:function(e){t.isShowKeyboard=!t.isShowKeyboard}}}),t._v(" "),t.isShowKeyboard?n("span",{staticClass:"icon icon-keyboard left",on:{click:function(e){t.isShowKeyboard=!t.isShowKeyboard}}}):t._e(),t._v(" "),n("mt-button",{staticClass:"btn btn-send",attrs:{disabled:t.sending,type:"primary"},on:{click:t.sendMsg}},[t._v("发送")]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowKeyboard,expression:"isShowKeyboard"
}],ref:"record-btn",staticClass:"record-btn",class:{recording:t.recording},on:{click:t.record}},[t._v("\n            "+t._s(t.recording?"松开 结束":"按住 说话")+"\n        ")]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.isShowKeyboard,expression:"!isShowKeyboard"}],staticClass:"con"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],ref:"message-input",attrs:{maxlength:100,autofocus:"",placeholder:"请输入消息"},domProps:{value:t.content},on:{input:function(e){e.target.composing||(t.content=e.target.value)}}})])],1)])},staticRenderFns:[]}}]);
//# sourceMappingURL=chat.1c9c5a276ebfaf05fdbb.js.map