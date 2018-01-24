<template>
    <span class="name-gender-component">
        <span
            v-if="placement == 'right'"
            :title="name">{{ name }}</span>
        <el-tooltip :content="isFemale ? '女' : '男'" :placement="placement" v-if="!hideGender">
            <icon name="female" class="female" v-if="isFemale" scale="1.5"></icon>
            <icon name="male" class="male" v-if="!isFemale" scale="1.5"></icon>
        </el-tooltip>
        <span
            v-if="placement == 'left'"
            :title="name"
            @click="clickName">{{ name }}</span>
    </span>
</template>

<script>
    export default {
        props: {
            name: {
                type: String
            },
            hideGender: {
                type: Boolean,
                default: false
            },
            isFemale: {
                type: Boolean,
                default: true
            },
            placement: {
                type: String,
                default: 'right'
            },
            clickable: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            clickName () {
                this.$emit('click');
            }
        }
    }
</script>