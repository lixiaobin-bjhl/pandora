webpackJsonp([2],{0:function(e,t,n){e.exports=n(95)},7:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return f.default.post(e,t)}function o(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return f.default.post(e,p.stringify(t),{headers:{"Content-Type":"application/x-www-form-urlencoded"}})}function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return f.default.delete(e,{params:t})}function s(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return f.default.get(e,{params:t})}function u(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return f.default.put(e,t)}Object.defineProperty(t,"__esModule",{value:!0});var l=n(26),c=i(l);t.post=r,t.form=o,t.del=a,t.get=s,t.put=u;var d=n(23),f=i(d),p=n(37);f.default.interceptors.request.use(function(e){return e.headers["X-Requested-With"]="XMLHttpRequest",e},function(e){return c.default.reject(e)}),f.default.interceptors.response.use(function(e){var t=e.data;return"string"==typeof t&&(t=JSON.parse(t)),0===t.code?t:(toast(t.message||"系统异常","error"),c.default.reject(t))},function(e){return toast("系统异常","error"),c.default.reject(e)})},10:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(11),r=function(){return i.parseQuery(window.location.search)};t.default=r},11:function(e,t){"use strict";function n(e){var t={};if("string"==typeof e&&e.length>1){var n=0,i=e.charAt(0);if("?"===i)n=1;else if("#"===i){n=1;var r=e.charAt(1);"/"===r&&(n=2)}n>0&&(e=e.substr(n)),e.split("&").forEach(function(e,n){var i=e.split("=");if(2===i.length){var r=i[0].trim(),o=i[1].trim()||"",a=o.indexOf("#");r.indexOf("?")>0&&(r=r.split("?")[1]),a>=0&&(o=o.substring(0,a)),r&&(t[r]=decodeURIComponent(o))}})}return t}function i(e){return e||(e=document.URL),t.parse(e).origin}function r(e){var t=document.createElement("a");t.href=e,e=t.href;var n="";t.protocol&&t.host?n=t.protocol+"//"+t.host:/^(http[s]?:\/\/[^\/]+)(?=\/)/.test(e)&&(n=RegExp.$1);var i=n.split(":");0===n.indexOf("http:")&&3===i.length&&80==i[2]&&(i.length=2,n=i.join(":"));var r=t.pathname;return r&&"/"!==r.charAt(0)&&(r="/"+r),{origin:n,pathname:r,search:t.search}}Object.defineProperty(t,"__esModule",{value:!0}),t.parseQuery=n,t.getOrigin=i,t.parse=r},12:function(e,t,n){"use strict";function i(){return(0,s.get)("/qiniu/uptoken")}function r(e){return(0,s.post)("/storage/upload.json",e)}function o(e){return(0,s.post)("/patient/bindWechat.json",{name:e.name,mobile:e.mobile,age:e.age,gender:e.gender})}function a(e){return(0,s.post)("/common/getLoginUser.json",{})}Object.defineProperty(t,"__esModule",{value:!0}),t.uptoken=i,t.upload=r,t.bindWechat=o,t.getLoginUser=a;var s=n(7)},21:function(e,t){},25:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=a.openId;t&&(e+=e.indexOf("?")>-1?"&openId="+t:"?openId="+t),window.location.href=e};var r=n(10),o=i(r),a=(0,o.default)()},57:function(e,t){},80:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(152),o=i(r),a=n(154),s=i(a),u=n(15),l=i(u);n(138),n(140),n(21);var c=n(22),d=n(25),f=i(d),p=n(12);t.default={data:function(){return{mobile:"",name:"",age:"",gender:"",submiting:!1,info:{consulter:{}},timer:null}},created:function(){this.getLoginUser()},methods:{getLoginUser:function(){var e=this;c.Indicator.open("加载中…"),(0,p.getLoginUser)().then(function(t){e.info=t.data,c.Indicator.close()}).catch(function(){c.Indicator.close()})},timeStep:function(){this.count--,this.codeTip="重新获取("+this.count+"s)",this.count<1&&this.timer&&(clearInterval(this.timer),this.getCoding=!1,this.codeTip="获取验证码",this.waiting=!1)},startTimer:function(){var e=this;this.waiting=!0,this.codeTip="重新获取("+this.count+"s)",this.timer=setInterval(function(){e.timeStep()},1e3),this.timeStep()},getCode:function(){var e=this;if(!this.getCoding&&!this.waiting){if(""==this.mobile)return void(0,l.default)("手机号不能为空");if(!/^1[34578]\d{9}$/.test(this.mobile))return void(0,l.default)("请输入正确的手机号");var t={mobile:this.mobile,userRole:this.query.userRole};this.count=60,this.getCoding=!0,sendCode(t).then(function(t){(0,l.default)("验证码已发送"),e.startTimer()},function(){e.getCoding=!1})}},bind:function(){var e=this;if(""==this.mobile)return void(0,l.default)("手机号不能为空");if(!/^1[34578]\d{9}$/.test(this.mobile))return void(0,l.default)("请输入正确的手机号");if(""==this.age)return void(0,l.default)("请输入年龄");if(!this.gender)return void(0,l.default)("请选择性别");this.submiting=!0,c.Indicator.open("加载中…");var t={mobile:this.mobile,name:this.name,age:this.age,gender:this.gender};(0,p.bindWechat)(t).then(function(e){(0,l.default)("绑定成功"),(0,f.default)("chat.html")}).catch(function(){c.Indicator.close(),e.submiting=!1})}},components:{MtButton:o.default,MtField:s.default}}},95:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var r=n(4),o=i(r),a=n(58),s=i(a);n(142);var u=n(163),l=i(u),c=n(15),d=i(c);n(21),window.toast=function(e){(0,d.default)(e)};new o.default({render:function(e){return e("div",{attrs:{id:"app"},class:"app"},[e("div",{class:"logo-wrapper"},[e("div",{class:"logo"},[])]),e(l.default,null,[])])}}).$mount("#app");s.default.attach(document.body)},138:function(e,t){},139:function(e,t){},140:function(e,t){},142:function(e,t){},146:function(e,t){},163:function(e,t,n){n(146);var i=n(6)(n(80),n(170),null,null);e.exports=i.exports},170:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"fields"},[n("div",{staticClass:"profile"},[n("img",{attrs:{width:"60",height:"60",src:e.info.consulter.avatar}}),e._v(" "),n("ul",[n("li",{staticClass:"name"},[e._v(e._s(e.info.consulter.name))]),e._v(" "),n("li",{staticClass:"gray999"},[e._v(e._s(e.info.orgName||"医院名称"))])])]),e._v(" "),e._m(0),e._v(" "),n("div",{staticClass:"login-form"},[n("mt-field",{staticClass:"mobile-field",attrs:{"disable-clear":!0,placeholder:"姓名",type:"tel"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),n("mt-field",{staticClass:"mobile-field",attrs:{"disable-clear":!0,placeholder:"手机号",type:"tel"},model:{value:e.mobile,callback:function(t){e.mobile=t},expression:"mobile"}}),e._v(" "),n("mt-field",{staticClass:"mobile-field",attrs:{"disable-clear":!0,type:"number",placeholder:"年龄"},model:{value:e.age,callback:function(t){e.age=e._n(t)},expression:"age"}}),e._v(" "),n("div",{staticClass:"gender-wrap"},[n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.gender,expression:"gender"}],attrs:{name:"gender",type:"radio"},domProps:{value:1,checked:e._q(e.gender,1)},on:{__c:function(t){e.gender=1}}}),e._v("男")]),e._v(" "),n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.gender,expression:"gender"}],attrs:{name:"gender",type:"radio"},domProps:{value:2,checked:e._q(e.gender,2)},on:{__c:function(t){e.gender=2}}}),e._v("女")])])],1)]),e._v(" "),n("div",{staticClass:"footer"},[n("mt-button",{staticClass:"btn-submit",attrs:{type:"primary",disabled:e.submiting},nativeOn:{click:function(t){e.bind(t)}}},[e._v("确定")])],1)])},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"notice"},[n("ol",[n("p",[e._v("请填写真实信息，便于医院：")]),e._v(" "),n("li",[e._v("① 联系您")]),e._v(" "),n("li",[e._v("② 对您的术后情况作出更准确评估")])])])}]}}});
//# sourceMappingURL=bindTel.ac04b1628674a705113a.js.map