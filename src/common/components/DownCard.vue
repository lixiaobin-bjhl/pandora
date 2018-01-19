<!--
	@file 下拉卡片
	@author xuguanong
-->

<template>
	<div @click.stop="" class="down-card" 
	:style="{'left':x+'px','top':y+'px', 'min-width': minWidth + 'px'}" 
		v-clickoutside="handleClose">
		<slot name="main"></slot>
        <slot name="bottom"></slot>
	</div>
</template>
<script>
	import clickoutside from './clickoutside';
	export default {
        props: {
            x: {
                type: Number,
                default:0 
            },
            minWidth: {
                type: Number,
                default: 190,
            },
            y: {
                type: Number,
                default:0
            }
        },
    	data () {
    		return {
    			
    		}
    	},
    	methods: {
    		handleClose(event) {
    			this.$emit('closeCard');
    		}
    	},
    	components: {
    	},
    	directives: {
    		clickoutside
    	}
    }
</script>

<style lang="scss">
	.down-card {
		background-color: #fff;
	    border: 1px solid transparent;
	    border-radius: 1px;
	    -webkit-box-shadow: 0 2px 12px rgba(0,0,0,.1);
	    box-shadow: 0 2px 12px rgba(0,0,0,.1);
	    -webkit-border-radius: 1px;
		position: absolute;
		opacity:1;
	    transition: all .2s ease-in-out;
	    z-index: 1071;
		.bottom {
			margin: 5px 0;
			padding: 5px 0 8px 0;
			text-align: center;
		}
	}
</style>