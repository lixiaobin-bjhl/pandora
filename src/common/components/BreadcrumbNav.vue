
<!--
    @file 面包屑导航
-->

<template>
    <div class="breadcrumb-nav">
        <p
            v-for="(item, index) in data"
            :key="index">
            <span v-if="index">/</span>
            <span
                :class="{'clickable-text': index != data.length -1}"
                @click="back(index + 1)"
            >{{ item }}</span>
        </p>
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        methods: {
            /**
             * 返回到第index级页面
             *
             * @param {number} index, 页面级数
             */
            back (index) {
                let len = this.data.length;

                if (index != len) {
                    this.$emit('back', index);
                }
            }
        }
    }
</script>