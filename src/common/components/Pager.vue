<template>
    <section class="pager">
        <el-pagination 
            v-if="visiable"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageDto.pageNum"
            :page-sizes="pageDto.pageSizes"
            :page-size="pageDto.pageSize"
            :layout="layout"
            :total="pageDto.count">
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
                    return getTotalPages(this.pageDto.pageSize, this.pageDto.count) > 0;
                }
            }
        },
        data () {
            return {
                pageDto: this.value
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