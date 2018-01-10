<template>
      <el-dialog 
        title="报装详情"
        width="500px"
        custom-class="equipment-status-list"
        :visible.sync="$store.state.equipment.showEquipmentStatusListState"
        >
        <el-row>
            <el-col :span="8">
                时间
            </el-col>
            <el-col :span="6">
                状态
            </el-col>
            <el-col :span="10">
                备注
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                2018-10-12
            </el-col>
            <el-col :span="6">
                已完成
            </el-col>
            <el-col :span="10">
                <el-tooltip placement="top">
                    <div slot="content">
                        <pre>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</pre>
                    </div>
                    <div class="remark">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
                </el-tooltip>
            </el-col>
        </el-row>

        <a>更新状态</a> 
      </el-dialog>
</template>

<script>
export default {};
</script>