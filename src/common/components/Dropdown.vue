<!--
    @file 下拉弹层
-->
<template>
    <div class="drop-down-wrap">
        <div class="drop-down-text">
            <slot name="text"></slot><i class="caret-down"></i>
        </div>
        <div class="drop-down-action">
            <slot name="action"></slot>
        </div>
    </div>
</template>

<style lang="scss">
    .drop-down-wrap {
        position: relative;
        display: inline-block;
        height: 21px;
        padding-bottom: 15px;
        cursor: pointer;

        .drop-down-text {
            i {
                margin-left: 8px;
            }
        }

        .drop-down-action {
            position: absolute;
            right: -5px;
            margin-top: 8px;
            background-color: #fff;
            box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .2);
            border-radius: 4px;
            display: none;

            ul {
                padding: 6px 0;
                li {
                    box-sizing: border-box;
                    height: 30px;
                    line-height: 1em;
                    padding: 10px 25px;
                    white-space: nowrap;

                    &:hover {
                        background-color: rgba(26, 145, 242, .1);
                    }
                }
            }
        }

        .caret-down {
            display: inline-block;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 6px;
            border-bottom-width: 0;
            border-color: #BFBFBF transparent transparent transparent;
            margin-bottom: 3px;
            transition: transform .3s;
        }

        &:hover {
            .drop-down-action {
                display: block;
            }
            .caret-down {
                transform: rotate(180deg);
            }
        }
    }
</style>