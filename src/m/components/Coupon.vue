<template>
    <div>
        <ul class="tabs">
            <li class="active">
                <span>未使用(3)</span>
            </li>
            <li>
                <span>已使用(3)</span>
            </li>
            <li>
                <span>已过期(3)</span>
            </li>
        </ul>
        <div class="coupon-list">
            <div class="coupus">
                <h1>欧若拉医疗美容医院</h1>
            </div>
        </div>
    </div>
</template>

<script>
    
</script>

<style lang="scss">
    .tabs {
        display: flex;
        li {
            flex: 1;
            text-align: center;
            border-right: 1px solid #ddd;
            > span {
                padding: 0 30px;
            }
            &.active {
                > span {
                    border-bottom: 1px solid red;
                }
            }
           
            &:last-of-type {
                border-right: 0;
            }
        }
    }
    .coupon-list {
        margin: 20px;

        .coupus {
            border: 1px solid #ccc;
            border-radius: 4px;
            h1 {
                font-weight: normal;
                font-size: 14px;
                background: #ddd;
            } 
        }
    }
   
</style>
