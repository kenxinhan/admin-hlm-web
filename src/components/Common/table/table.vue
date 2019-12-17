<template>
    <div class="u-table">
        <!-- 查询条件 BEGIN -->
        <!--  -->
        <div class="searchForm " v-show="isShowSearchBtn">
            <div class="title">
                <i></i>
                <span>筛选查询</span>
            </div>
        </div>
        <el-form v-show="isShowSearchBtn" :inline="true" class="demo-form-inline tableSearchForm">
            <slot name="form"></slot>
            <el-form-item >
                <el-button type="primary" @click="onSubmit(true)">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 查询条件 End -->
        <div class="listTitle"> 
            <i></i>
            <span>数据列表</span>
            <el-button v-if="isAddbtn()"  type="primary" @click="addCurrency()">添加交易区</el-button>
        </div>

        <!-- 放表格操作按钮   -->
        <slot name="btnOperate"> </slot>
        <!-- 放表格操作按钮 End  -->

        <!-- 结果列表 BEGIN -->
        <el-table
            ref="multipleTable"
            :data="tableData"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column v-if="isShowCheck" type="selection" width="55"  :selectable="selectable">

            </el-table-column>
            <slot name="tableBody">
                <!-- 放置表格内容 -->
            </slot>
        </el-table>
        <!-- 结果列表 End -->

        <!-- 分页 BEGIN -->
        <el-pagination v-if="isPage" class="u-pagination" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" background layout="total, prev, pager, next" :total="total"></el-pagination>
        <!-- 分页 End -->

        <!-- 全选之后下方显示的模板 BEGIN -->
         <transition name="selected">
            <div class="selected-panel" v-show="isShowSelectPanel">
                <i class="el-icon-information"></i>
                <p class="selected-panel-label">
                    已选择<strong>{{multipleSelection.length}}</strong>项
                </p>
                <div class="selected-panel-operat">
                    <slot name="operat">
                    </slot>
                </div>
            </div>
        </transition>
        <!-- 全选之后下方显示的模板 End -->

        <!-- 详情弹窗 BEGIN-->
        <!-- <u-dialog   v-model="isShowDetailDialog" >
            <template slot="content" >
                <slot name="dialogContent"></slot>
            </template>
        </u-dialog> -->
        <!-- 详情弹窗 End-->

    </div>
</template>
<script>
export default {
    components: {},

    props: {
        //获取tabName
        tabName:"",
        //是否分页 判断数据返回  不分页  res.result  分页 res.result.list
        isPage:{
            type: Boolean,
            default: true,
        },
        // 是否展示多选框
        isShowCheck:{
            type: Boolean,
            default: true,
        },
        // 是否展示搜索按钮
        isShowSearchBtn:{
            type: Boolean,
            default: true,
        },
        // 请求方式
        requestMethod: {
            type: String,
            default: "get"
        },
        // 点击查询触发
        handleSubmit: {
            type: Function,
            default: () => {
                return new Promise((resolve, reject) => {
                    resolve();
                })
            }
        },

        // 加载成功之后执行的函数
        loadSuccess: {
            type: Function,
            default: () => {
                return new Promise((resolve, reject) => {
                    resolve();
                })
            }
        },

    },

    data() {
        return {
            requestApi: "",                             // 缓存请求api
            requestParams: {},                          // 缓存查询参数
            isShowSelectPanel: false,                   // 是否显示选中后下方展示的面板
            isShowDetailDialog: true,                  // 是否显示右侧详情界面
            isShowDetailDialog: false,               // 是否显示右侧详情界面
            tableData:[],
            pageSize: 10,                               // 每页默认30条数据
            total: 0,                                   // 总数
            currentPage: 1,                             // 当前页默认为第一页
            multipleSelection: []                       // 选中的值
        };
    },

    computed: {

    },
    watch:{
        tabName: function (val) {
        },
    },
    created: function() {
           this.isAddbtn()
    },

    mounted: function() {
    },
    beforeEnter: (to, from, next) => {
    },

    methods: {
        isAddbtn(){
            if(this.$route.path=='/Currency'){
                return true
            }else{
                return false
            }
        },
       addCurrency(){
            this.$router.push({
                    path: '/Currency/Add'
            })
        },

        // 导出所有
        // derivedAll()
        // {
        //     this.$emit("exportAll");
        // },
        // 重置数据
        reset()
        {
            this.tableData = [];
            this.total = 0;                             // 重置查询结果记录总数为0
            this.currentPage = 1;                       // 重置当前页面为1
        },

        //  加载数据
        loadData(api,params)
        {
            return new Promise((resolve, reject) => {
                let url = `${api}?pageSize=${this.pageSize}&curPage=${this.currentPage}`;
                if(this.requestMethod === 'get')
                {
                    // if(params)
                    // {
                    //     url = url+'&'+params; // get请求参数需要加到url后面
                    // }
                    this.$api.get(url, params, res => {
                         resolve(res);
                        // console.log(res.result)
                        // // 按sort字段排序
                        //  let list = res.result
                        //  if(list && list.sort){
                        //    list.sort(function (a, b) { return a.sort - b.sort });
                        //  }
                        //请求到的数组传出去
                        if(res.result){
                          this.$emit("tableData", res.result);
                        }
                    })
                    // this.$api.get(url).then(res => {
                    //     resolve(res);
                    // }).catch(err => {
                    //     reject(err);
                    // });
                }
                else if(this.requestMethod === 'post')
                {
                    // this.$api.post(url,params).then(res => {
                    //     resolve(res);
                    // }).catch(err => {
                    //     reject(err);
                    // });
                }
            })

        },

        // 触发提交按钮, isHandle为true表示点击查询按钮触发
        onSubmit(isHandle)
        {
            // handleSubmit点击查询按钮触发
            if(!this.handleSubmit)
            {
                return;
            }
            //  api以及params参数需要从父组件中处理完整再返回当前组件
            this.handleSubmit(isHandle).then(res => {

                // 重置数据

                this.reset();
                // 加载数据，api没有值则不加载数据
                if(!res.api)
                {
                    return;
                }

                this.requestApi = res.api;
                this.requestParams = res.params;
                this.loadData(res.api, res.params).then(res => {
                    // 查询结果记录数
                if(this.isPage){
                //  console.log(res.result);
                  if(res.result){
                    this.total = res.result.allCount;
                    this.tableData = res.result.list;
                  }
                }
                if(!this.isPage){
                    this.tableData = res.result;
                }
                this.loadSuccess().then(res => {
                        if(res)
                        {
                            this.tableData = res;
                        }
                    });
                });
            });

        },


        // 当前页发生改变
        handleCurrentChange(val) {
            this.tableData = [];    // 重置列表
            // 重置数据
            // 重新查询数据
            this.currentPage=val;
            this.loadData(this.requestApi,this.requestParams).then(res =>
            {
                if(this.isPage){
                    this.tableData = res.result.list;
                }
                if(!this.isPage){
                    this.tableData = res.result;
                }
                // 需要从父组件做特殊数据处理的情况
                this.loadSuccess().then(res => {
                    if(res)
                    {
                        this.tableData = res;
                    }
                });
            });
        },

        // 选择多选框之后执行的操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // 代表选中
            if(val && val.length>0)
            {
                this.isShowSelectPanel = true;
            }
            else
            {
                this.isShowSelectPanel = false;
            }
            // 通知父组件数据更新
            this.$emit("selectionChange", val);
        },
        //多选框禁用
        selectable(row, index){
          if(row.status == 0){
              return 1  //可勾选
          }else{
              return 0    //不可勾选
          }
          //  this.$emit("cheackDisabled", row.status);
         //console.log(index)
        },
    },


};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    @import "./style.less";
      .el-form.demo-form-inline.searchform{
        background: #ffffff;
        padding: 20px;

        .el-form-item{
            margin-bottom: 0px;
            margin-right: 0px;
        }
    }



</style>
