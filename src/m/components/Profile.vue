<template>
	<div>
		<div class="fields">
			<div class="profile">
				<img width="60" height="60" :src="info.avatar|compressImage(60, 60)">
				<ul>
					<li class="name">{{info.name}}</li>
					<li class="gray999">{{info.orgName || '医院名称'}}</li>
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
				<mt-field class="mobile-field" 
					:disable-clear="true"
					:maxlength="20"  
					v-model="name" 
					placeholder="姓名"></mt-field>
				<mt-field class="mobile-field" 
					:disable-clear="true"  
					v-model="mobile"
					:maxlength="11"
					placeholder="手机号" 
					type="tel"></mt-field>
				<div class="gender-wrap">
					<label><input v-model="gender" :value="1" name="gender" type="radio">男</input></label>
					<label><input v-model="gender" :value="2" name="gender" type="radio">女</input></label>
				</div>
                <div class="age-field">
                    <div>
                        <span>我是</span>
                    </div>
                    <ul>
                        <li @click="changeAge('05')" :class="{'active': age == '05'}">05后</li>
                        <li @click="changeAge('00')" :class="{'active': age == '00'}">00后</li>
                        <li @click="changeAge('95')" :class="{'active': age == '95'}">95后</li>
                        <li @click="changeAge('90')" :class="{'active': age == '90'}">90后</li>
                        <li @click="changeAge('85')" :class="{'active': age == '85'}">85后</li>
                        <li @click="changeAge('80')" :class="{'active': age == '80'}">80后</li>
                        <li @click="changeAge('75')" :class="{'active': age == '75'}">75后</li>
                        <li @click="changeAge('70')" :class="{'active': age == '70'}">70后</li>
                        <li @click="changeAge('65')" :class="{'active': age == '65'}">65后</li>
                        <li @click="changeAge('60')" :class="{'active': age == '60'}">60后</li>
                        <li @click="changeAge('55')" :class="{'active': age == '55'}">55后</li>
                        <li @click="changeAge('50')" :class="{'active': age == '50'}">50后</li>
                    </ul>
                </div>
			</div>
		</div>
		<div class="footer">
			<mt-button type="primary" class="btn-submit" :disabled="submiting" @click.native="bind">确定</mt-button>
		</div>
	</div>
</template>

<script>

    import setTitle from '../../common/function/setTitle';
    import MtButton from 'mint-ui/lib/button';
	import MtField from 'mint-ui/lib/field';
	import Toast from 'mint-ui/lib/toast';
	import 'mint-ui/lib/button/style.css';
	import 'mint-ui/lib/field/style.css';
	import 'mint-ui/lib/toast/style.css';
	import { Indicator } from 'mint-ui';
	import redirect from '../../common/function/redirect';
	import  {getLoginUser} from '../request';
	import {update} from 'src/modules/customer/request';

	export default {
		data() {
			return {
				mobile: '',
				name: '',
				age: '',
				gender: '',
				submiting: false,
				info: {
					consulter: {}
				},
				timer: null
			}
		},
		created () {
            setTitle('个人资料');
			this.getLoginUser();
			// this.query = getUrlSearch();
		},
		methods: {
			/**
			 * 获取登录者信息 
			 */
			getLoginUser () {
				Indicator.open('加载中…');
				getLoginUser()
					.then((res)=>{
						this.info = res.data;
						Indicator.close();
					})
					.catch(()=> {
						Indicator.close();
					});
			},
            /**
             * 改变年龄 
             */
            changeAge (age) {
                this.age = age;
            },
			bind() {
				if (this.name == '') {
					Toast('请填写姓名');
					return;
				}
				if (this.mobile == '') {
					Toast('请填写手机号');
					return;
				}
				if (!(/^1[34578]\d{9}$/.test(this.mobile))) {
					Toast('请填写正确的手机号');
					return;
				}
				if (this.age == '') {
					Toast('请选择年龄段');
					return;
				}
				if (!this.gender) {
					Toast('请选择性别');
					return;
				}
				this.submiting = true;
				Indicator.open('加载中…');
				let params = {
					mobile: this.mobile,
					name: this.name,
					age: this.age,
					gender: this.gender
				}
				update(params)
					.then((res) => {
						Toast('保存成功');
						Indicator.close();
						this.$router.back();
					})
					.catch(() => {
						Indicator.close();
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