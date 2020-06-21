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

    <el-table :data="tableData.data" stripe height="600" :default-sort = "{prop: 'create_date', order: 'descending'}">
      <el-table-column prop="name" label="姓名" fixed="left" :width="width" sortable>
      </el-table-column>
      <el-table-column prop="debt" label="欠款" :width="width">
      </el-table-column>
      <el-table-column prop="total" label="应收款" :width="width">
      </el-table-column>
      <el-table-column prop="payed" label="已收款" :width="width">
      </el-table-column>
      <el-table-column prop="create_date" label="最后更新日期" width="160" sortable>
      </el-table-column>
      <el-table-column label="操作" min-width="250">
          <template slot-scope="scope">
            <el-button-group>
                <el-tooltip content="详情" placement="top">
                    <el-button type="info" size="small" icon="el-icon-tickets" @click="showDetails(scope.$index, scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip content="删除" placement="top">
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="remove(scope.$index, scope.row)"></el-button>
                </el-tooltip>
            </el-button-group>
          </template>
      </el-table-column>
    </el-table>
    <common-pg :total="tableData.total"></common-pg>

    <template>
      <el-dialog :title="client" :visible.sync="dialogTableVisible" width="80%">
        <el-row>
          <el-col :span="8">
            <el-input placeholder="物品" suffix-icon="el-icon-search" v-model="details.query" @keyup.enter.native="searchGoods"></el-input>
          </el-col>
          <el-col :span="2" class="toolbar">
            <el-form :inline="true">
              <el-button size="middle" icon="el-icon-plus" type="primary" @click="addDetails()">添加</el-button>
            </el-form>
          </el-col>
        </el-row>
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
          <el-table-column prop="unit_price" label="单价" width="80">
            <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.unit_price">
              <span slot="content">{{row.unit_price}}</span>
            </editable-cell>
          </el-table-column>
          <el-table-column prop="unit" label="单位" width="80">
            <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.unit">
              <span slot="content">{{row.unit}}</span>
            </editable-cell>
          </el-table-column>
          <el-table-column prop="total_price" label="总计" width="80">
          </el-table-column>
          <el-table-column prop="update_time" label="最后更新日期" width="160">
          </el-table-column>
          <el-table-column label="操作" min-width="250">
            <template slot-scope="scope">
              <el-button-group>
                <el-tooltip content="修改" placement="top">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click="editDetails(scope.$index, scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip content="已支付" placement="top">
                    <el-button type="success" size="small" icon="el-icon-success" @click="payed(scope.$index, scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip content="删除" placement="top">
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteDetails(scope.$index, scope.row)"></el-button>
                </el-tooltip>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <common-pg :total="details.total"></common-pg>
      </el-dialog>
    </template>

    <template>
      <el-dialog title="记账" :visible.sync="addFormVisible">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="商品" prop="goods" :label-width="formLabelWidth">
            <el-input v-model="form.goods"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="quantity" :label-width="formLabelWidth">
            <el-input v-model="form.quantity"></el-input>
          </el-form-item>
          <el-form-item label="单位" prop="unit":label-width="formLabelWidth">
            <el-input v-model="form.unit"></el-input>
          </el-form-item>
          <el-form-item label="单价" prop="unit_price" :label-width="formLabelWidth">
            <el-input v-model="form.unit_price"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog>
    </template>

  </section>
</template>

<script>
    import Pagination from '@/components/Pagination';
    import EditableCell from "@/components/EditableCell";
    import { getIncomeGeneral, addIncomeGeneral,
             updateIncomeGeneral, deleteIncomeGeneral, getIncomeDetails,
             updateIncomeDetail, addIncomeDetails, deleteIncomeDetail,
             hasPayed} from "@/request/api";
    import { incomeDetailRule, success, fail } from "@/common"
    export default {
        data() {
          return {
            tableData: {
              data: [],
              total: 0
            },
            addFormVisible: false,
            formLabelWidth: '80px',
            form: {
              client_name: '',
              goods: '',
              quantity: 0,
              unit_price: 0,
              unit: ''
            },
            rules: incomeDetailRule(),
            width: 80,
            dialogTableVisible: false,
            details: {
              data: [],
              total: 1,
              page: 1,
              pageSize: 10,
              query: ''
            },
            client: '',
            client_id: null,
            query: ''
          }
        },
        methods: {
            showDetails: function(index, row){
              getIncomeDetails({store_id: 1, 'client_id': row.client_id})
              .then(res => {this.details = res.data});
              this.dialogTableVisible = true;
              this.client = row.name;
              this.client_id = row.client_id;
            },
            remove: function(index, row){
              deleteIncomeGeneral({general_id: row.general_id})
              .then(res => {
                success("删除成功！");
                getIncomeGeneral({store_id: 1})
                .then(res => {this.tableData = res.data});
              })
              .catch(err => {
                fail(err.response.data);
              })
            },
            add: function(){
            },
            search(item) {
              alert(this.query);
            },
            payed: function(index, row){
              hasPayed({detail_id: row.detail_id})
              .then(res =>{
                success("更新成功！");
                getIncomeDetails({store_id: 1, client_id: row.client_id})
                .then(res => {this.details = res.data});
                getIncomeGeneral({store_id: 1})
                .then(res => {this.tableData = res.data});
              })
            },
            deleteDetails: function(index, row){
              deleteIncomeDetail({detail_id: row.detail_id})
              .then(res => {
                success("删除成功！");
                getIncomeDetails({store_id: 1})
                .then(res => {this.details = res.data});
              })
            },
            editDetails: function(index, row){
              updateIncomeDetail(row)
              .then(res => {
                success("更新成功");
                getIncomeDetails({store_id: 1, client_id: row.client_id})
                .then(res => {this.details = res.data});
              })
              .catch(err => {fail(err.message)})
            },
            searchGoods(){
              getIncomeDetails({store_id: 1, goods: this.details.query})
              .then(res => {this.details = res.data});
            },
            addDetails(){
              this.addFormVisible = true
            },
            resetPartFields(){
              this.form.goods = "";
              this.form.quantity = 0;
              this.form.unit_price = 0;
            },
            submitForm(formName){
              this.$refs[formName].validate((valid) =>{
                if (valid){
                  var params = {
                      client_id: this.client_id,
                      store_id: 1,
                      goods: this.form.goods,
                      quantity: this.form.quantity,
                      unit: this.form.unit,
                      unit_price: this.form.unit_price};
                  addIncomeDetails(params
                    ).then(res => {
                      success("添加成功！");
                      getIncomeDetails({store_id: 1, client_id: this.client_id})
                      .then(res => {this.details = res.data});
                    })
                this.resetPartFields();
                };
              });
            },

        },
        components: {
            "common-pg": Pagination,
            "editable-cell": EditableCell
        },
        mounted() {
          getIncomeGeneral({store_id: 1})
          .then(res => {this.tableData = res.data});
        }
    }
</script>
