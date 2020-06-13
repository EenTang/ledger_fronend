<template>
    <section>
        <template>
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

          <template>
            <el-dialog title="记账" :visible.sync="addFormVisible">
              <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="姓名" prop="client_id":label-width="formLabelWidth">
                  <el-select v-model="form.client_id" filterable remote reserve-keyword placeholder="请输入姓名" :remote-method="queryClientInfo" :loading="loading">
                    <el-option v-for="item in client_data" :key="item.client_id" :label="item.client_name" :value="item.client_id">
                    </el-option>
                  </el-select>
                </el-form-item>
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


          <el-table :data="details.data" stripe height="600">
            <el-table-column prop="client_name" label="姓名" width="80">
            </el-table-column>
            <el-table-column prop="goods" label="商品" width="80">
            </el-table-column>
            <el-table-column prop="quantity" label="数量" width="80">
            </el-table-column>
            <el-table-column prop="unit_price" label="单价" width="80">
            </el-table-column>
            <el-table-column prop="unit" label="单位" width="80">
            </el-table-column>
            <el-table-column prop="total_price" label="总计" width="80">
            </el-table-column>
            <el-table-column prop="create_date" label="创建时间" width="160">
            </el-table-column>
            <el-table-column label="操作" min-width="250">
              <template slot-scope="scope">
                <el-tooltip content="删除" placement="top">
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="remove(scope.$index, scope.row)"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <common-pg :total="details.total"></common-pg>
        </template>
    </section>
</template>

<script>
    import Pagination from '@/components/Pagination';
    import axios from 'axios';
    import { getClientInfo, getIncomeDetails,
             addIncomeDetails, deleteIncomeDetail} from "@/request/api";
    import qs from "qs"
    export default {
        data() {
          return {
            details: null,
            data: null,
            query: '',
            addFormVisible: false,
            formLabelWidth: '80px',
            client_data: [],
            options: [],
            value: [],
            loading: false,
            form: {
              client_id: null,
              client_name: '',
              goods: '',
              quantity: 0,
              unit_price: 0,
              unit: ''
            },
            rules: {
              client_id: [
                {required: true, message: "请输入姓名", trigger: "blur"}
              ],
              goods: [
                {required: true, message: "请输入商品", trigger: "blur"}
              ],
              quantity: [
                {required: true, message: "请输入数量", trigger: "blur"},
                {
                  validator(rule, value, callback)  {
                      var num2 = /^([1-9][\d]{0,}|0)(\.\d{1,2})?$/
                      value = '' + value
                      if (isNaN(value) || !(num2.test(value))) {
                          callback(new Error('请输入数字, 保留2位小数'));
                      } else {
                          callback();
                      }
                  },
                  trigger: 'blur'
                }
              ],
              unit: [
                {required: true, message: "请输入单位", trigger: "blur"}
              ],
              unit_price: [
                {required: true, message: "请输入单价", trigger: "blur"},
                {
                  validator(rule, value, callback)  {
                      var num2 = /^([1-9][\d]{0,}|0)(\.\d{1,2})?$/
                      value = '' + value
                      if (isNaN(value) || !(num2.test(value))) {
                          callback(new Error('请输入数字, 保留2位小数'));
                      } else {
                          callback();
                      }
                  },
                  trigger: 'blur'
                }
              ],

            },
          }
        },

        methods: {
          add: function(){
            this.addFormVisible = true
          },
          queryClientInfo(name){
            if (name !== ''){
              this.loading = true;
              getClientInfo({
                  client_name: name,
                  store_id: 1
                }).then(res => {this.client_data = res.data.data;})
            };
            this.loading = false;
          },
          success: function(message){
            this.$message({message: message, type: "success"})
          },
          remove: function(index, row){
            console.log("###row", index, row)
            deleteIncomeDetail({"detail_id": row.detail_id})
            .then(res => {
              this.success("删除成功！");
              getIncomeDetails({store_id: 1})
              .then(res => {this.details = res.data});
            })
          },
          submitForm(formName){
            this.$refs[formName].validate((valid) =>{
              if (valid){
                var params = {
                    client_id: this.form.client_id,
                    store_id: 1,
                    goods: this.form.goods,
                    quantity: this.form.quantity,
                    unit: this.form.unit,
                    unit_price: this.form.unit_price};
                addIncomeDetails(params
                  ).then(res => {this.success("添加成功！")})
              this.$refs[formName].resetFields();
              getIncomeDetails({store_id: 1})
              .then(res => {this.details = res.data});
              };
            });
          },
        },
        components: {
          "common-pg": Pagination
        },
        mounted(){
          getIncomeDetails({store_id: 1})
          .then(res => {this.details = res.data})
        }
    }
</script>