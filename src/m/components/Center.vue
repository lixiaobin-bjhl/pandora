<template>
    <div class="center">
        <div class="profile">
            <div class="info">
                <img 
                    src="http://omh2h1x76.bkt.clouddn.com/user.png" 
                    class="img">
                    <div class="upload-btn">
                        <form 
                            onsubmit="return false" 
                            ref="form">
                            <input 
                                type="file" 
                                name="upload"
                                ref="file"
                                @change="uploadPhoto"
                                id="upload"> 
                            <label for="upload"><icon name="camera" scale="2"></icon></label>
                        </form>
                    </div>
                    <div class="name">
                        赵敏<icon scale="2" style="color:E06AAC" name="female"></icon>
                        <icon scale="2" style="color:E06AAC" name="male"></icon>
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
            <mt-cell title="关怀计划" is-link @click.native="redirect('/loving')">
                <icon slot="icon" name="loving" style="color:#F9A24B" scale="2.5"></icon>
            </mt-cell>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Cell } from 'mint-ui';
    Vue.component(Cell.name, Cell);
    import axios from 'axios';

    export default {
        methods: {
            /**
             * 上传头像 
             */
            uploadPhoto: function () {
                var file = this.$refs.file.files;
                let param = new FormData();
                param.append('file', file);
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };
                axios.post('/upload.json', param, config)
                    .then(response=>{
                        console.log(response.data);
                    })     
                this.reset();
            },
            reset: function () {
               this.$ref.form.reset();
            },
            redirect (url) {
                this.$router.push(url);
            }
        }
    }
</script>