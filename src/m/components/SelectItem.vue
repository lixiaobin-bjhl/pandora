<template>
    <div class="loving select-item">
        <div class="select">
            <mt-radio
                title=""
                align="right"
                v-model="value"
                :options="options">
            </mt-radio>
        </div>
    </div>
</template>

<script>

    import { Radio } from 'mint-ui';
    import Vue from 'vue';
    import setTitle from '../../common/function/setTitle';

    Vue.component(Radio.name, Radio);

    export default {
        data () {
            return {
                value: '1',
                options: [
                    {
                        label: '双眼皮关怀计划',
                        value: '1'
                    },
                    {
                        label: '隆鼻关怀计划',
                        value: '2'
                    }
                ]
            };
        },
        created () {
            setTitle('选择项目');
        },
        watch: {
            value () {
                this.$router.back();
            }
        }
    }
</script>