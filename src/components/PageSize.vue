<template>
   <el-col :span="24" class="toolbar">
       <el-pagination layout="sizes, prev, pager, next, total" :current-page="page":page-size="pageSize" :page-sizes="pageSizes" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" style="float:right;">
       </el-pagination>
   </el-col>
</template>

<script>
    export default{
        name: "common-pg",
        data(){
            return {
                total: 20,
                page: 1,
                pageSize: 10,
                pageSizes: [10, 20, 50, 100]
            }
         },
        methods: {
            handleCurrentChange(val) {
                this.page = val;
            },
            handleSizeChange(val){
                this.pageSize = val;
            },
        },
    };
</script>