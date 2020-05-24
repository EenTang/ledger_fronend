<template>
    <section>
        <template>
            <el-table :data="tableData" stripe height="600">
              <el-table-column prop="name" label="姓名" width="80">
              </el-table-column>
              <el-table-column prop="goods" label="物品" width="80">
              </el-table-column>
              <el-table-column prop="quantity" label="数量" width="80">
              </el-table-column>
              <el-table-column prop="unitPrice" label="单价" width="80">
              </el-table-column>
              <el-table-column prop="unit" label="单位" width="80">
              </el-table-column>
              <el-table-column prop="summation" label="总计" width="80">
              </el-table-column>
              <el-table-column prop="date" label="最后更新日期" width="160">
              </el-table-column>
            </el-table>
            <common-pg></common-pg>
        </template>
    </section>
</template>

<script>
    import C_PageSize from '@/components/PageSize'
    export default {
        data() {
          const item = {
            name: '王小虎',
            goods: "花蟹",
            quantity: 20,
            unitPrice: 50,
            unit: "斤",
            summation: 1000,
            date: '2020-05-24 18:00:00'
          };
          return {
            tableData: Array(20).fill(item),
          }
        },
        methods: {
        },
        components: {
          "common-pg": C_PageSize
        }
    }
</script>