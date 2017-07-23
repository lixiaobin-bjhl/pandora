<style>
    @import "../../../static/css/icomoon/style.css";  
</style>
<template>
	<div>
		<div class="profile">
			<img width="60" height="60" src="../../assets/user.png">
			<ul>
				<li class="name">白求恩</li>
				<li class="gray999">武汉协和整形外科医院</li>
			</ul>
		</div>
		<div class="notice">
			<ol>
				<p>请填写真实信息，便于医院：</p>
				<li>① 联系您</li>
				<li>② 对您的术后情况作出更准确评估</li>
			</ol>
		</div>
		<div class="login-form">
			<mt-field class="mobile-field" :disable-clear="true"  v-model="name" placeholder="姓名" type="tel"></mt-field>
			<mt-field class="mobile-field" :disable-clear="true"  v-model="mobile" placeholder="手机号" type="tel"></mt-field>
			<mt-field class="mobile-field" :disable-clear="true" type="number"  v-model.number="age" placeholder="年龄"></mt-field>
			<mt-button type="primary" :disabled="submiting" @click.native="bind">确定</mt-button>
		</div>
	</div>
</template>
<script>
	import MtButton from 'mint-ui/lib/button';
	import MtField from 'mint-ui/lib/field';
	import Toast from 'mint-ui/lib/toast';
	import 'mint-ui/lib/button/style.css';
	import 'mint-ui/lib/field/style.css';
	import 'mint-ui/lib/toast/style.css';
	import redirect from '../../common/function/redirect';
	import  {bindWechat} from '../request';

	export default {
		data() {
			return {
				mobile: '',
				name: '',
				age: '',
				submiting: false,
				timer: null
			}
		},
		created() {
			// this.query = getUrlSearch();
		},
		methods: {
			timeStep() {
				this.count--;
				this.codeTip = `重新获取(${this.count}s)`;
				if (this.count < 1 && this.timer) {
					clearInterval(this.timer);
					this.getCoding = false;
					this.codeTip = `获取验证码`;
					this.waiting = false;
				}
			},
			startTimer() {
				this.waiting = true;
				this.codeTip = `重新获取(${this.count}s)`;
				this.timer = setInterval(() => {
					this.timeStep();
				}, 1000);
				this.timeStep();

			},
			getCode() {
				if (this.getCoding || this.waiting) {
					return;
				} else {
					if (this.mobile == '') {
						Toast('手机号不能为空');
						return;
					}
					if (!(/^1[34578]\d{9}$/.test(this.mobile))) {
						Toast('请输入正确的手机号');
						return;
					}
					let params = {
						mobile: this.mobile,
						userRole: this.query.userRole
					};
					this.count = 60;
					this.getCoding = true;
					sendCode(params)
						.then((res) => {
							Toast('验证码已发送');
							this.startTimer();
						}, () => {
							this.getCoding = false;
						});
				}
			},
			bind() {
				if (this.mobile == '') {
					Toast('手机号不能为空');
					return;
				}
				if (!(/^1[34578]\d{9}$/.test(this.mobile))) {
					Toast('请输入正确的手机号');
					return;
				}
				if (this.age == '') {
					Toast('请输入年龄');
					return;
				}
				this.submiting = true;
				let params = {
					mobile: this.mobile,
					name: this.name,
					age: this.age
				}
				bindWechat(params)
					.then((res) => {
						Toast('绑定成功');
						redirect('chat.html');
					})
					.catch(() => {
						this.submiting = false;
					});
				
			}
		},
		components: {
			MtButton,
			MtField
		}
	}
</script>