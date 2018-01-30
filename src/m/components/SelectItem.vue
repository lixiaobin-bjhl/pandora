<template>
    <div class="loving select-item">
        <div class="select">
           <ul>
               <li v-for="item, n in options" @click="changeProject(n)">
                   {{item.name}} <icon name="male" v-if="n==value" scale="1.3"></icon>
               </li>
           </ul>
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
                value: this.$root.index || 0,
                // options: this.$root.porjectOption
                options: [{
                    name: 12312
                },{
                    name: 12312
                }]
            };
        },
        created () {
            setTitle('选择项目');
            document.body.style.backgroundColor = '#f5f5f5';
        },
        methods: {
            changeProject (n) {
                this.$root.index = n;
                this.$router.back();
            }
        },
        beforeDestroy () {
            document.body.style.backgroundColor = '#fff';
        }
    }
</script>