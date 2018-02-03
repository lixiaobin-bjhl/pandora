<template>
    <div class="center">
        <div class="profile">
            <div class="info">
                <img
                    v-if="info.avatar"
                    :src="info.avatar|compressImage(189, 189)" 
                    class="img">
                    <div class="upload-btn">
                        <form 
                            onsubmit="return false" 
                            ref="form">
                            <input 
                                type="file" 
                                name="upload"
                                ref="file"
                                capture="camera"
                                @change="uploadPhoto"
                                id="upload"> 
                            <label for="upload"><icon name="camera" scale="2"></icon></label>
                        </form>
                    </div>
                    <div class="name">
                        {{info.name}}<icon scale="2" v-if="info.gender==2" class="female" name="female"></icon>
                        <icon scale="2" v-if="info.gender==1" class="male" name="male"></icon>
                    </div>
            </div>
            <div class="banner"></div>
        </div>
        <div class="my-menu">
            <mt-cell title="个人资料" is-link @click.native="redirect('/profile')">
                <icon slot="icon" name="my-profile" style="color:#9583B5" scale="2.5"></icon>
            </mt-cell>
            <mt-cell title="优惠券" is-link @click.native="redirect('/coupon')">
                <icon slot="icon" name="coupon" style="color:#20A0FF" scale="2.5"></icon>
            </mt-cell>
            <mt-cell title="关怀计划" is-link @click.native="redirect('/carePlan')">
                <icon slot="icon" name="loving" style="color:#F9A24B" scale="2.5"></icon>
            </mt-cell>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue';
    import { Cell } from 'mint-ui';
    import { Indicator } from 'mint-ui';
    import {getLoginUser} from '../request';
    import {updateAvatar} from 'src/modules/customer/request';

    Vue.component(Cell.name, Cell);
    import axios from 'axios';

    export default {
        data () {
            return {
                info: {}
            }
        },
        created () {
			this.getLoginUser();
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
             * 上传头像 
             */
            uploadPhoto () {
                var file = this.$refs.file.files;
                let param = new FormData();
                param.append('file', file);
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };
                Indicator.open('加载中…');
                axios.post('/storage/upload.json', param, config)
                    .then(res => {
                        var avatar = res.data.url;
                        updateAvatar({
                            avatar: avatar
                        })
                        .then(()=> {
                            this.info.avatar = avatar;
                            toast('保成成功');
                            Indicator.close();
                        }, ()=> {
                            Indicator.close();
                            this.reset();
                        });
                        this.reset();
                    }, ()=> {
                        Indicator.close();
                        this.reset();
                    });
            },
            reset: function () {
               this.$refs.form.reset();
            },
            redirect (url) {
                this.$router.push(url);
            }
        }
    }
</script>