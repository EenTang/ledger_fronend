<template>
  <section>
    <el-row>
      <el-col :span="8">
        <el-input placeholder="姓名" suffix-icon="el-icon-search" v-model="query" @keyup.enter.native="search"></el-input>
      </el-col>
      <el-col :span="2" class="toolbar">
        <el-form :inline="true">
          <el-button size="middle" icon="el-icon-plus" type="primary" @click="add()">添加</el-button>
        </el-form>
      </el-col>
    </el-row>

    <el-table :data="tableData" stripe height="100%" :default-sort = "{prop: 'date', order: 'descending'}">
      <el-table-column prop="name" label="姓名" fixed="left" :width="width" sortable>
        <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.name">
          <span slot="content">{{row.name}}</span>
        </editable-cell>
      </el-table-column>
      <el-table-column prop="debt" label="欠款" :width="width">
      </el-table-column>
      <el-table-column prop="total" label="应收款" :width="width">
        <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.total">
          <span slot="content">{{row.total}}</span>
        </editable-cell>
      </el-table-column>
      <el-table-column prop="payed" label="已收款" :width="width">
        <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.payed">
          <span slot="content">{{row.payed}}</span>
        </editable-cell>
      </el-table-column>
      <el-table-column prop="date" label="最后更新日期" width="160" sortable>
         <editable-cell
         :show-input="row.editMode"
         slot-scope="{row}"
         editable-component="el-date-picker"
         format="yyyy-MM-dd"
         value-format="yyyy-MM-dd"
         v-model="row.date">
          <span slot="content">{{row.date}}</span>
        </editable-cell>
      </el-table-column>
      <el-table-column label="操作" min-width="250">
          <template slot-scope="scope">
            <el-button-group>
                <el-tooltip content="详情" placement="top">
                    <el-button type="info" size="small" icon="el-icon-tickets" @click="showDetails(scope.$index, scope.row)"></el-button>
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
    <common-pg :total="total"></common-pg>

    <template>
      <el-dialog :title="client" :visible.sync="dialogTableVisible" width="80%">
        <el-table :data="details.data">
          <el-table-column prop="goods" label="物品" width="80">
            <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.goods">
              <span slot="content">{{row.goods}}</span>
            </editable-cell>
          </el-table-column>
          <el-table-column prop="quantity" label="数量" width="80">
            <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.quantity">
              <span slot="content">{{row.quantity}}</span>
            </editable-cell>
          </el-table-column>
          <el-table-column prop="unitPrice" label="单价" width="80">
            <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.unitPrice">
              <span slot="content">{{row.unitPrice}}</span>
            </editable-cell>
          </el-table-column>
          <el-table-column prop="unit" label="单位" width="80">
            <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.unit">
              <span slot="content">{{row.unit}}</span>
            </editable-cell>
          </el-table-column>
          <el-table-column prop="summation" label="总计" width="80">
          </el-table-column>
          <el-table-column prop="date" label="最后更新日期" width="160">
             <editable-cell
             :show-input="row.editMode"
             slot-scope="{row}"
             editable-component="el-date-picker"
             format="yyyy-MM-dd"
             value-format="yyyy-MM-dd"
             v-model="row.date">
              <span slot="content">{{row.date}}</span>
            </editable-cell>
          </el-table-column>
          <el-table-column label="操作" min-width="250">
            <template slot-scope="scope">
              <el-tooltip content="删除" placement="top">
                  <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteDetails(scope.$index, scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <common-pg :total="details.total"></common-pg>
      </el-dialog>
    </template>

  </section>
</template>

<script>
    import Pagination from '@/components/Pagination';
    import EditableCell from "@/components/EditableCell";
    export default {
        data() {
          const item = {
            debt: 1000,
            name: '王小虎',
            total: 2000,
            payed: 1000,
            date: '2020-05-24'
          };
          return {
            tableData: Array(20).fill(item),
            width: 80,
            dialogTableVisible: false,
            details: {
              data: [],
              total: 1,
              page: 1,
              pageSize: 10
            },
            client: '',
            total: 20,
            page: 1,
            PageSize: 10,
            query: ''
          }
        },
        methods: {
            showDetails: function(index, row){
              this.dialogTableVisible = true;
              this.details.data = [{
                      name: '王小虎',
                      goods: "花蟹",
                      quantity: 20,
                      unitPrice: 50,
                      unit: "斤",
                      summation: 1000,
                      date: '2020-05-24 18:00:00'
                      },];
              this.client = '王小虎';
            },
            edit: function(index, row){
                row.editMode = !row.editMode;
                this.width = (row.editMode)? 120: 80;
            },
            delete: function(index, row){

            },
            deleteDetails: function(index, row){

            },
            add: function(){

            },
            search(item) {
              alert(this.query);
            },

        },
        components: {
            "common-pg": Pagination,
            "editable-cell": EditableCell
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
