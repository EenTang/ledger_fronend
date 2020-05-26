<template>
   <el-col :span="24" class="toolbar">
       <el-pagination layout="sizes, prev, pager, next, total" :current-page="page":page-size="pageSize" :page-sizes="pageSizes" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" style="float:right;">
       </el-pagination>
   </el-col>
</template>

<script>
    export default{
        name: "common-pg",
        props: {
            total: {
              type: Number,
              default: 20
            },
            // pageSize: {
            //   type: Number,
            //   default: 10
            // },
        },
        data(){
            return {
                pageSizes: [10, 20, 50, 100],
                page: 1,
                pageSize: 10
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