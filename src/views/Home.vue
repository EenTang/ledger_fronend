<template>
  <el-container>
    <el-aside :width="isCollapse?'40px':'150px'">
      <div v-bind:class="collapseIconHandle" @click="toggleCollapse"></div>
      <el-menu :collapse="isCollapse" :collapse-transition="false" :default-active="$route.path" unique-opened router>
        <template v-for="(item,index) in allRouter" v-if="!item.hidden">
            <el-submenu :index="index+''">
              <template slot="title"><i :class="item.icon"></i>{{item.name}}</template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden" @click="addTabsValue(child.name, child.path, child.component)">{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls" ></i>{{item.children[0].name}}</el-menu-item>
          </template>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="userInfo">
        <el-dropdown>
          <i class="el-icon-setting"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{user}}</span>
      </el-header>

      <el-main>
        <div class="grid-content bg-purple-light">
          <el-col :span=24 class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span=24 class="content-wrapper">
            <el-tabs v-model="activeTab" type="card" closable @tab-remove="removeTab" @tab-click="tabClick">
              <el-tab-pane v-for="(value, index) in tabsValue" :label="value.label" :name="index" :key="index">
                <component :is="value.component"></component>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
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
        user: "汤剑东",
        isCollapse: true,
        activeTab: '',
        tabsValue: {},
        allRouter: '',
      }
    },
    methods:{
      toggleCollapse() {
          this.isCollapse = !this.isCollapse;
          console.log(this.allRouter);
      },
      tabClick(tab) {
          let url = window.document.location.href;
          window.document.location.href = url.substring(0, url.indexOf("#/") + 1) + tab.name;
      },
      addTabsValue(name, path, component){
        if (!this.tabsValue.hasOwnProperty(path)){
          this.tabsValue[path] = {label: name, component: component};
        }
        this.activeTab = path;
      },
      removeTab(targetName) {
          this.activeTab = '/';
          delete this.tabsValue[targetName];
      },
    },
    computed: {
      collapseIconHandle(){
        return this.isCollapse ? "el-icon-s-unfold": "el-icon-s-fold"
      }
    },
    mounted(){
      this.allRouter = this.$router.options.routes;
    },
  };
</script>

<style>
  html,
  body,
  #app,
  .el-container {
    height: 100%;
    border: 1px solid #eee;
    margin: 0px;
    padding: 0px;
  }

  .el-header {
    background-color: #409EFF;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
    background-color: rgb(255, 255, 255);
  }

  .el-icon-setting {
    margin-right: 5px;
  }

  .userInfo{
    text-align: right;
    font-size: 14px;
  }
  .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
  }
</style>
