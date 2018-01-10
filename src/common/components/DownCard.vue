<!--
	@file 下拉卡片
	@author xuguanong
-->
<template>
	<div @click.stop="" class="down-card" :style="{'left':x+'px','top':y+'px', 'min-width': minWidth + 'px'}" v-clickoutside="handleClose">
		<slot name="main"></slot>
        <slot name="bottom"></slot>
	</div>
</template>
<script>
	import clickoutside from 'element-ui/src/utils/clickoutside';
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
    		handleClose() {
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
			margin: 10px 10px 10px 0;
			right: 10px;
			text-align: right;
			.btn {
				font-size: 13px;
				font-weight: 300;
				padding: 4px 10px;
				border: 1px solid #eee;
			}
		}
	}
</style>