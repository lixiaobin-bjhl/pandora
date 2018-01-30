<template>
    <div>
        <slot :obj="obj" type="xiaobin">
            <div></div>
        </slot>
    </div>
</template>

<script>
    export default {
        props: {
            name: {

            }
        },
        data () {
            return {
                obj: {
                    name: 'xiaoxiao'
                },
                name1: "123123"
            }
        }
    }
</script>