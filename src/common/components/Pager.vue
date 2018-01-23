<template>
    <section class="pager">
        <el-pagination 
            v-if="visiable"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.pageNum"
            :page-sizes="pageInfo.pageSizes"
            :page-size="pageInfo.pageSize"
            :layout="layout"
            :total="pageInfo.count">
        </el-pagination>
    </section>
</template>

<script>
    function getTotalPages(pageSize, count) {
        var totalPages = pageSize < 1 ? 1 : Math.ceil(count / pageSize);
        return totalPages || 0;
    }
    export default {
        props: {
            layout: {
                default: 'total, sizes, prev, pager, next, jumper'
            },
            value: {
                type: Object,
                default: function() {
                    return {
                        "count": 0,
                        "curPageCount": 1,
                        "pageNum": 0,
                        "pageSize": 20,
                        "totalPageNum": 1
                    }
                }
            }
        },
        computed: {
            visiable() {
                if (!this.value) {
                    return false;
                }
                else {
                    return getTotalPages(this.pageInfo.pageSize, this.pageInfo.count) > 0;
                }
            }
        },
        data () {
            return {
                pageInfo: this.value
            } 
        },
        methods: {
            handleSizeChange(val) {
                this.$emit('sizechange', val);
            },
            handleCurrentChange(val) {
                this.$emit('currentchange', val);
            }
        }
    }
</script>