webpackJsonp([1],{0:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=n(5),s=r(o),a=n(53),i=r(a);n(135),n(136);var u=n(158),c=r(u),A=n(18),l=r(A);window.toast=function(e){(0,l.default)(e)},n(80),s.default.use(i.default),new s.default({render:function(e){return e("div",{attrs:{id:"app"},class:"app"},[e("chat",null,[])])},components:{Chat:c.default}}).$mount("#app")},11:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return d.default.post(e,t)}function s(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return d.default.post(e,f.stringify(t),{headers:{"Content-Type":"application/x-www-form-urlencoded"}})}function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return d.default.delete(e,{params:t})}function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return d.default.get(e,{params:t})}function u(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return d.default.put(e,t)}Object.defineProperty(t,"__esModule",{value:!0});var c=n(37),A=r(c);t.post=o,t.form=s,t.del=a,t.get=i,t.put=u;var l=n(31),d=r(l),f=n(54);d.default.interceptors.request.use(function(e){return e.headers["X-Requested-With"]="XMLHttpRequest",e},function(e){return A.default.reject(e)}),d.default.interceptors.response.use(function(e){var t=e.data;return"string"==typeof t&&(t=JSON.parse(t)),0===t.code?t:(toast(t.message||"系统异常","error"),A.default.reject(t))},function(e){return toast("系统异常","error"),A.default.reject(e)})},21:function(e,t,n){"use strict";function r(){return(0,a.form)("/aaa",{name:"xiaobin"})}function o(){return(0,a.get)("/qiniu/uptoken")}function s(e){return(0,a.post)("/storage/upload.json",e)}Object.defineProperty(t,"__esModule",{value:!0}),t.bindTel=r,t.uptoken=o,t.upload=s;var a=n(11)},73:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{accept:{type:String,default:"image/gif, image/jpg, image/jpeg, image/png"},multiple:{type:Boolean,default:!1}},methods:{fileInputChange:function(){this.$emit("change",this.$refs.inputFile.files),this.reset()},reset:function(){this.$refs.form.reset()}}}},75:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(160),s=r(o),a=n(159),i=r(a);t.default={name:"app",components:{Heads:s.default,ChatList:i.default}}},76:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(92),s=r(o),a=n(88),i=(r(a),n(53)),u=n(21),c=n(83),A=r(c),l=n(155),d=r(l),f=n(84),m=r(f),p=n(86),h=r(p);t.default={mixins:[h.default],name:"chatlist",data:function(){return{showSelBox:0,selFace:"表情",selOther:"其他功能",content:"",websocket:null,topStatus:"",sending:!1,list:[],userInfo:{id:1},records:[]}},methods:{changePicture:function(e){if(e){var t=e[0],n=new FormData,r=this.websocket;n.append("file",t),i.Indicator.open("加载中…"),(0,u.upload)(n).then(function(e){i.Indicator.close(),toast("图片上传成功"),console.log((0,s.default)({type:"CHAT",msgType:"image",msgContent:{picUrl:e.data.url}})),r.send((0,s.default)({type:"CHAT",msgType:"image",msgContent:{picUrl:e.data.url}}))}).catch(function(){i.Indicator.close()})}},msgGroupItem:function(){return{formattedTime:"",timeStamp:0,list:[]}},createGroupMsg:function(e){var t=this.msgGroupItem();return t.formattedTime=(0,A.default)(e.createTime),t.timeStamp=e.createTime,t.list=t.list.concat(e),t},timeStampToMinute:function(e){return(""+e).slice(0,10)},insertBefore:function(e){var t=null,n=this.list,r=n.length,o=r?n[0]:null;return o?this.timeStampToMinute(o.timeStamp)-this.timeStampToMinute(e.createTime)>=300?t=this.createGroupMsg(e):o.list=[].concat(e).concat(o.list):t=this.createGroupMsg(e),t},appendMsg:function(e){var t=null,n=this.list,r=n.length,o=r?n[r-1]:null;return o?this.timeStampToMinute(e.createTime)-this.timeStampToMinute(o.timeStamp)>=300?t=this.createGroupMsg(e):o.list=o.list.concat(e):t=this.createGroupMsg(e),t},formatChatTime:A.default,initScoket:function(){function e(e){console.log("Connected to WebSocket server.")}function t(e){i.websocket=null,console.log("Disconnected")}function n(e){console.log("Error occured: "+e.data)}var r=(0,m.default)(),o=r.openId,s=r.chatUserId,a=r.chatUserRole,i=this;if(!o)return void toast("没有openId");var u="openId="+o;s&&(u+="&chatUserId="+s),a&&(u+="&chatUserRole="+a);var c="ws://xm.56xg.com/chat.ws?"+u,A=new WebSocket(c);this.websocket=A,A.addEventListener("open",e),A.addEventListener("close",t),A.addEventListener("error",n),A.addEventListener("message",this.processMessage)},processMessage:function(e){this.sending=!1;var t=JSON.parse(e.data);console.log(t),"CHAT"==t.type?this.appendMsg(t):"LOGIN_INFO"==t.type?this.userInfo=t.userInfo:"CHAT_HISTORY"==t.type&&(this.loadMessage(t.msgList),this.$refs.loadmore.onTopLoaded())},sendMsg:function(){var e=this.websocket,t=this.content.trim();return t?e?(this.sending=!0,e.send((0,s.default)({type:"CHAT",msgType:"text",msgContent:{content:t}})),this.content="",void this.scrollToBottom()):void toast("socket没有连接成功"):void toast("请输入消息内容")},receiveMessage:function(e){var t=this,e=[].concat(e);e.forEach(function(e){var n=t.appendMsg(e);n&&(t.list=t.list.concat(n))})},loadMessage:function(e){for(var e=[].concat(e),t=e.length-1;t>=0;t--){var n=this.insertBefore(e[t]);n&&(this.list=[].concat(n).concat(this.list))}},focusTxtContent:function(){var e=this;setTimeout(function(){e.$refs["message-input"].focus()},1e3)},scrollToBottom:function(){setTimeout(function(){var e=document.getElementsByClassName("chatlist")[0];e.scrollTop=e.scrollHeight},100)},previewImg:function(e){this.previewImage(e,document.querySelectorAll(".chat-pic"))},handleTopChange:function(e){this.topStatus=e},getFirstMsgId:function(){var e=this.list;if(!e.length)return null;var t=e[0],n=t.list;return n&&n.length?n[0].msgId:""},loadTop:function(e){var t=this.websocket;t&&t.send((0,s.default)({type:"CHAT_HISTORY",length:10,firstMsgID:this.getFirstMsgId()}))}},components:{Upload:d.default},beforeDestroy:function(){console.log("destroy");var e=this.websocket;e&&e.close()},mounted:function(){var e=this;this.scrollToBottom(),this.focusTxtContent(),this.initScoket(),this.receiveMessage(this.records),this.getWechatJsSign(),setTimeout(function(){e.receiveMessage({fromUserName:"客户A",fromUserId:1,toUserName:"护士-周希",toUserId:2,createTime:1495642392172,fromUserAvatar:"http://omh2h1x76.bkt.clouddn.com/user.png",msgType:"text",msgId:1231321321,msgContent:{content:"this is test message"}})},2e3),setTimeout(function(){e.receiveMessage([{fromUserName:"客户A",fromUserId:2,toUserName:"护士-周希",toUserId:2,createTime:1495642398371,fromUserAvatar:"http://omh2h1x76.bkt.clouddn.com/user.png",msgType:"image",msgId:1231321321,msgContent:{picUrl:"http://omh2h1x76.bkt.clouddn.com/user.png"}}])},3e3)}}},77:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"heads",data:function(){return{vociceOpen:!0}}}},78:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={debug:!1,appId:"wx4f2bc0338152c31c",timestamp:1490176842,nonceStr:"bldxw1zv28",signature:"7c0ed8e6d1da24e4dbb56e6fd2a20d787e50d314",jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone","hideMenuItems","showMenuItems","hideAllNonBaseMenuItem","showAllNonBaseMenuItem","translateVoice","startRecord","stopRecord","onVoiceRecordEnd","playVoice","onVoicePlayEnd","pauseVoice","stopVoice","uploadVoice","downloadVoice","chooseImage","previewImage","uploadImage","downloadImage","getNetworkType","openLocation","getLocation","hideOptionMenu","showOptionMenu","closeWindow","scanQRCode","chooseWXPay","openProductSpecificView","addCard","chooseCard","openCard"]}},79:function(e,t,n){var r;!function(o){"use strict";function s(e,t){for(var n=[],r=0,o=e.length;r<o;r++)n.push(e[r].substr(0,t));return n}function a(e){return function(t,n,r){var o=r[e].indexOf(n.charAt(0).toUpperCase()+n.substr(1).toLowerCase());~o&&(t.month=o)}}function i(e,t){for(e=String(e),t=t||2;e.length<t;)e="0"+e;return e}var u={},c=/d{1,4}|M{1,4}|yy(?:yy)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,A=/\d\d?/,l=/\d{3}/,d=/\d{4}/,f=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,m=function(){},p=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],h=["January","February","March","April","May","June","July","August","September","October","November","December"],g=s(h,3),M=s(p,3);u.i18n={dayNamesShort:M,dayNames:p,monthNamesShort:g,monthNames:h,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!==10)*e%10]}};var v={D:function(e){return e.getDay()},DD:function(e){return i(e.getDay())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return e.getDate()},dd:function(e){return i(e.getDate())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return e.getMonth()+1},MM:function(e){return i(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},yy:function(e){return String(e.getFullYear()).substr(2)},yyyy:function(e){return e.getFullYear()},h:function(e){return e.getHours()%12||12},hh:function(e){return i(e.getHours()%12||12)},H:function(e){return e.getHours()},HH:function(e){return i(e.getHours())},m:function(e){return e.getMinutes()},mm:function(e){return i(e.getMinutes())},s:function(e){return e.getSeconds()},ss:function(e){return i(e.getSeconds())},S:function(e){return Math.round(e.getMilliseconds()/100)},SS:function(e){return i(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return i(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+i(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)}},y={d:[A,function(e,t){e.day=t}],M:[A,function(e,t){e.month=t-1}],yy:[A,function(e,t){var n=new Date,r=+(""+n.getFullYear()).substr(0,2);e.year=""+(t>68?r-1:r)+t}],h:[A,function(e,t){e.hour=t}],m:[A,function(e,t){e.minute=t}],s:[A,function(e,t){e.second=t}],yyyy:[d,function(e,t){e.year=t}],S:[/\d/,function(e,t){e.millisecond=100*t}],SS:[/\d{2}/,function(e,t){e.millisecond=10*t}],SSS:[l,function(e,t){e.millisecond=t}],D:[A,m],ddd:[f,m],MMM:[f,a("monthNamesShort")],MMMM:[f,a("monthNames")],a:[f,function(e,t,n){var r=t.toLowerCase();r===n.amPm[0]?e.isPm=!1:r===n.amPm[1]&&(e.isPm=!0)}],ZZ:[/[\+\-]\d\d:?\d\d/,function(e,t){var n,r=(t+"").match(/([\+\-]|\d\d)/gi);r&&(n=+(60*r[1])+parseInt(r[2],10),e.timezoneOffset="+"===r[0]?n:-n)}]};y.DD=y.D,y.dddd=y.ddd,y.Do=y.dd=y.d,y.mm=y.m,y.hh=y.H=y.HH=y.h,y.MM=y.M,y.ss=y.s,y.A=y.a,u.masks={default:"ddd MMM dd yyyy HH:mm:ss",shortDate:"M/D/yy",mediumDate:"MMM d, yyyy",longDate:"MMMM d, yyyy",fullDate:"dddd, MMMM d, yyyy",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"},u.format=function(e,t,n){var r=n||u.i18n;if("number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date in fecha.format");return t=u.masks[t]||t||u.masks.default,t.replace(c,function(t){return t in v?v[t](e,r):t.slice(1,t.length-1)})},u.parse=function(e,t,n){var r=n||u.i18n;if("string"!=typeof t)throw new Error("Invalid format in fecha.parse");if(t=u.masks[t]||t,e.length>1e3)return!1;var o=!0,s={};if(t.replace(c,function(t){if(y[t]){var n=y[t],a=e.search(n[0]);~a?e.replace(n[0],function(t){return n[1](s,t,r),e=e.substr(a+t.length),t}):o=!1}return y[t]?"":t.slice(1,t.length-1)}),!o)return!1;var a=new Date;s.isPm===!0&&null!=s.hour&&12!==+s.hour?s.hour=+s.hour+12:s.isPm===!1&&12===+s.hour&&(s.hour=0);var i;return null!=s.timezoneOffset?(s.minute=+(s.minute||0)-+s.timezoneOffset,i=new Date(Date.UTC(s.year||a.getFullYear(),s.month||0,s.day||1,s.hour||0,s.minute||0,s.second||0,s.millisecond||0))):i=new Date(s.year||a.getFullYear(),s.month||0,s.day||1,s.hour||0,s.minute||0,s.second||0,s.millisecond||0),i},"undefined"!=typeof e&&e.exports?e.exports=u:(r=function(){return u}.call(t,n,t,e),!(void 0!==r&&(e.exports=r)))}(void 0)},80:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=n(79),s=r(o),a=n(5),i=r(a);i.default.filter("date",function(e,t){return s.default.format(new Date(e),t)})},81:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return Math.random().toString(36).substr(2,15)}},82:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return parseInt((new Date).getTime()/1e3)+""}},83:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){var t=new Date(e),n=t.getFullYear(),r=t.getMonth()+1,o=t.getDate(),s=t.getHours(),i=t.getMinutes(),u=s>12?" 下午 ":" 上午 ",c=n+"/"+r+"/"+o+"/"+u+(0,a.default)(s)+":"+(0,a.default)(i);return c}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o;var s=n(85),a=r(s)},84:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(89),o=function(){return r.parseQuery(window.location.search)};t.default=o},85:function(e,t){"use strict";function n(e){return(e<10?"0":"")+e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},86:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(93),s=r(o),a=n(87),i=n(78),u=r(i);t.default={methods:{getWechatJsSign:function(){return(0,a.getWechatJsSign)({url:location.href.split("#")[0]}).then(function(e){var t=e.data;return(0,s.default)(u.default,{signature:t.signature,appId:t.appId,timestamp:t.timestamp,nonceStr:t.nonceStr}),window.wx.config(u.default),t})},previewImage:function(e,t){var n=[];t.forEach(function(e,t){n.push(e.dataset.url)}),wx.previewImage({current:e,urls:n})},openLocation:function(e,t,n,r){wx.openLocation({latitude:e,longitude:t,name:n,address:r,scale:28,infoUrl:""})},getOwnPermissions:function(e){var t=this.$root.permissions||[],n=!1;return t.some(function(t){return t.name==e})&&(n=!0),n}}}},87:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){return(0,s.post)("/wechat/signature.json",{url:e.url,nonceStr:(0,i.default)(),timestamp:(0,c.default)()})}Object.defineProperty(t,"__esModule",{value:!0}),t.getWechatJsSign=o;var s=n(11),a=n(81),i=r(a),u=n(82),c=r(u)},88:function(e,t){"use strict";function n(e,t){for(var t=t-(e+"").length,n=0;n<t;n++)e="0"+e;return e}Object.defineProperty(t,"__esModule",{value:!0});var r=/([yMdhsm])(\1*)/g,o="yyyy-MM-dd";t.default={getQueryStringByName:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(t),r="";return null!=n&&(r=n[2]),t=null,n=null,null==r||""==r||"undefined"==r?"":r},formatDate:{format:function(e,t){return t=t||o,t.replace(r,function(t){switch(t.charAt(0)){case"y":return n(e.getFullYear(),t.length);case"M":return n(e.getMonth()+1,t.length);case"d":return n(e.getDate(),t.length);case"w":return e.getDay()+1;case"h":return n(e.getHours(),t.length);case"m":return n(e.getMinutes(),t.length);case"s":return n(e.getSeconds(),t.length)}})},parse:function(e,t){var n=t.match(r),o=e.match(/(\d)+/g);if(n.length==o.length){for(var s=new Date(1970,0,1),a=0;a<n.length;a++){var i=parseInt(o[a]),u=n[a];switch(u.charAt(0)){case"y":s.setFullYear(i);break;case"M":s.setMonth(i-1);break;case"d":s.setDate(i);break;case"h":s.setHours(i);break;case"m":s.setMinutes(i);break;case"s":s.setSeconds(i)}}return s}return null}}}},89:function(e,t){"use strict";function n(e){var t={};if("string"==typeof e&&e.length>1){var n=0,r=e.charAt(0);if("?"===r)n=1;else if("#"===r){n=1;var o=e.charAt(1);"/"===o&&(n=2)}n>0&&(e=e.substr(n)),e.split("&").forEach(function(e,n){var r=e.split("=");if(2===r.length){var o=r[0].trim(),s=r[1].trim()||"",a=s.indexOf("#");o.indexOf("?")>0&&(o=o.split("?")[1]),a>=0&&(s=s.substring(0,a)),o&&(t[o]=decodeURIComponent(s))}})}return t}function r(e){return e||(e=document.URL),t.parse(e).origin}function o(e){var t=document.createElement("a");t.href=e,e=t.href;var n="";t.protocol&&t.host?n=t.protocol+"//"+t.host:/^(http[s]?:\/\/[^\/]+)(?=\/)/.test(e)&&(n=RegExp.$1);var r=n.split(":");0===n.indexOf("http:")&&3===r.length&&80==r[2]&&(r.length=2,n=r.join(":"));var o=t.pathname;return o&&"/"!==o.charAt(0)&&(o="/"+o),{origin:n,pathname:o,search:t.search}}Object.defineProperty(t,"__esModule",{value:!0}),t.parseQuery=n,t.getOrigin=r,t.parse=o},135:function(e,t){},136:function(e,t){},139:function(e,t){},141:function(e,t){},142:function(e,t){},143:function(e,t){},153:function(e,t){e.exports="data:image/png;base64,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"},155:function(e,t,n){n(142);var r=n(8)(n(73),n(165),null,null);e.exports=r.exports},158:function(e,t,n){n(141);var r=n(8)(n(75),n(163),null,null);e.exports=r.exports},159:function(e,t,n){n(143);var r=n(8)(n(76),n(166),null,null);e.exports=r.exports},160:function(e,t,n){n(139);var r=n(8)(n(77),n(161),"data-v-29917e2d",null);e.exports=r.exports},161:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"top"},[r("img",{staticClass:"head",attrs:{src:n(153)}}),e._v(" "),r("span",{staticClass:"name"},[e._v("客服MM")]),e._v(" "),r("span",{staticClass:"voice"},[r("i",{staticClass:"fa",class:e.vociceOpen?"icon-volume-up":"icon-volume-down",attrs:{"aria-hidden":"true"},on:{click:function(t){e.vociceOpen=!e.vociceOpen}}})])])},staticRenderFns:[]}},163:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("ChatList")],1)},staticRenderFns:[]}},165:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"upload-wrapper clearfix"},[n("div",{staticClass:"upload-btn"},[e._t("default"),e._v(" "),n("form",{ref:"form",attrs:{onsubmit:"return false"}},[n("input",{ref:"inputFile",attrs:{type:"file",accept:e.accept,multiple:e.multiple},on:{change:e.fileInputChange}})])],2)])},staticRenderFns:[]}},166:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("section",{staticClass:"chatlist",class:e.showSelBox>0?"chatlist-bottom-collapse":"chatlist-bottom"},[n("mt-loadmore",{ref:"loadmore",attrs:{"top-method":e.loadTop,"top-pull-text":"加载更多","top-drop-text":"释放加载"},on:{"top-status-change":e.handleTopChange}},[n("ul",[e._l(e.list,function(t){return[n("p",{staticClass:"time"},[e._v(e._s(t.formattedTime))]),e._v(" "),e._l(t.list,function(t){return n("li",{class:{"chat-mine":t.fromUserId==e.userInfo.id}},[n("div",{staticClass:"chat-user"},[n("img",{attrs:{src:t.fromUserAvatar}})]),e._v(" "),"text"==t.msgType?n("pre",{staticClass:"chat-text",domProps:{textContent:e._s(t.msgContent.content)}}):"image"==t.msgType?n("pre",{staticClass:"chat-text chat-image",on:{click:function(n){e.previewImg(t.msgContent.picUrl)}}},[n("img",{staticClass:"chat-pic",attrs:{src:t.msgContent.picUrl}})]):e._e()])})]})],2)])],1),e._v(" "),n("section",{staticClass:"foot"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.content,expression:"content"}],ref:"message-input",staticClass:"con",attrs:{maxlength:100,autofocus:"",placeholder:"请输入消息"},domProps:{value:e.content},on:{input:function(t){t.target.composing||(e.content=t.target.value)}}}),e._v(" "),n("upload",{on:{change:e.changePicture}},[n("div",{staticStyle:{height:"32px"}}),e._v(" "),n("span",{staticClass:"icon-picture"})]),e._v(" "),n("mt-button",{staticClass:"btn btn-send",attrs:{disabled:e.sending,type:"primary"},on:{click:e.sendMsg}},[e._v("发送")])],1)])},staticRenderFns:[]}}});
//# sourceMappingURL=chat.01dd53fb65963e629713.js.map