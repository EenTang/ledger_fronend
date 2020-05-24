<template>
    <section>
        <template>
            <el-table :data="tableData" stripe height="600">
              <el-table-column prop="name" label="姓名" width="80" fixed="left">
                <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.name">
                  <span slot="content">{{row.name}}</span>
                </editable-cell>
              </el-table-column>
              <el-table-column prop="account" label="欠款" width="80">
              </el-table-column>
              <el-table-column prop="total" label="应收款" width="80">
              </el-table-column>
              <el-table-column prop="payed" label="已收款" width="80">
              </el-table-column>
              <el-table-column prop="date" label="最后更新日期" width="160">
              </el-table-column>
              <el-table-column label="操作" min-width="250">
                  <template slot-scope="scope">
                    <el-button-group>
                        <el-tooltip content="详情" placement="top">
                            <el-button type="info" size="small" icon="el-icon-tickets" @click="details(scope.$index, scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip content="修改" placement="top">
                            <el-button type="primary" size="small" icon="el-icon-edit" @click="edit(scope.$index, scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="top">
                            <el-button type="danger" size="small" icon="el-icon-delete" @click="delete(scope.$index, scope.row)"></el-button>
                        </el-tooltip>
                    </el-button-group>
                  </template>
              </el-table-column>
            </el-table>
            <common-pg></common-pg>
        </template>
    </section>
</template>

<script>
    import C_PageSize from '@/components/PageSize';
    import C_EditableCell from "@/components/EditableCell";
    export default {
        data() {
          const item = {
            account: 1000,
            name: '王小虎',
            total: 2000,
            payed: 1000,
            date: '2020-05-24 18:00:00'
          };
          return {
            tableData: Array(20).fill(item),
          }
        },
        methods: {
            details: function(index, row){
            },
            edit: function(index, row){
                row.editMode = !row.editMode;
            },
            delete: function(index, row){

            },

        },
        components: {
            "common-pg": C_PageSize,
            "editable-cell": C_EditableCell
        },
        mounted() {
          this.tableData = this.tableData.map(row => {
            return {
              ...row,
              editMode: false
            };
          });
        }
    }
</script>
