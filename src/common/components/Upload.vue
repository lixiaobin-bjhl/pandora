<!--
  @fileOverview 上传图片
  @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <div class="upload-wrapper clearfix">
        <div class="upload-btn">
            <slot></slot>
            <form onsubmit="return false" ref="form">
                <input type="file" v-if="!isIphone" ref="inputFile" @change="fileInputChange" :accept="accept" :multiple="multiple">
                <input type="file" v-else capture="camera" ref="inputFile" @change="fileInputChange" :accept="accept" :multiple="multiple">
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            accept: {
                type: String,
                default: 'image/*'
            },
            isIphone: {
                default () {
                    return navigator.userAgent.indexOf('iPhone') > -1;
                }
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            fileInputChange: function () {
                this.$emit('change', this.$refs.inputFile.files);
                this.reset();
            },
            reset: function () {
               this.$refs.form.reset();
            }
        }
    }
</script>

<style lang="scss">
    .upload-btn {
        position: relative;
        overflow: hidden;
        width: 30px;
        > form {
            > input {
                position: absolute;
                top: 0;
                right: 0;
                margin: 0;
                opacity: 1;
                border: 1px solid red;
                   -moz-transform: translate(-300px, 0) scale(4);
                -webkit-transform: translate(-300px, 0) scale(4);
                     -o-transform: translate(-300px, 0) scale(4);
                -webkit-transform: translate(-300px, 0) scale(4);
                        transform: translate(-300px, 0) scale(4);
                font-size: 23px;
                direction: ltr;
                cursor: pointer;
            }
        }
    }
</style>
