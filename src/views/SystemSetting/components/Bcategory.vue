<template>
  <div class="BcategoryBox">
    <div class="searchForm">
      <div class="title">
        <i></i>
        <span>筛选查询</span>
      </div>
      <el-form class="clearfix" ref="searchRef" :model="searchForm">
        <div class="fSearch-f">
          <el-row :gutter="10" style="width:100%">
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple">
                <el-form-item size="small" label="收费大类" prop="type1Code">
                  <el-select v-model="searchForm.type1Code" filterable  @change="handleItemChange('type1Code',searchForm.type1Code)">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in cateList" :key="item.code" :label="item.lableName" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple">
                <el-form-item size="small" label="是否启用" prop="status">
                  <el-select v-model="searchForm.status" @change="handleItemChange('status',searchForm.status)">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="是" value="use"></el-option>
                    <el-option label="否" value="unuse"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple">
                <el-form-item size="small" label="项目名称" prop="projectName">
                  <el-input placeholder="请输入项目名称" v-model="searchForm.projectName"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple">
                <el-form-item size="small" label="项目编码" prop="projectNo">
                  <el-input placeholder="请输入项目编码" v-model="searchForm.projectNo"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple-light">
                <div class="btnSrarch">
                  <el-button size="small" type="primary" @click="searchData">查 询</el-button>
                  <el-button size="small" type="primary" @click="resetSearchData('searchRef')">重 置</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="listTitle">
      <i></i>
      <span>数据列表</span>
      <div class="fr" style="padding-right: 20px;"> 
          <el-button
          type="primary"
          size="small"
          @click="dialogVisible = true"
        >
          <span class="el-icon-plus" style="margin-right: 5px"></span>新增项目
         </el-button>
      </div>
    </div>

    <el-table
      :data="projectPriceList"
      border
      class="mb10"
      style="text-align:center"
    >
      <el-table-column fixed="left" type="selection"></el-table-column>
      <el-table-column prop="indexNo" label="编号"></el-table-column>
      <el-table-column prop="type1Name" label="大类"></el-table-column>
      <el-table-column prop="type2Name" label="小类"></el-table-column>
      <el-table-column prop="projectName" label="名称"></el-table-column>
      <el-table-column prop="projectNo" label="项目编码"></el-table-column>
      <el-table-column prop="projectUnit" label="单位"></el-table-column>
      <el-table-column label="价格">
        <template slot-scope="scope">
            {{scope.row.price ? scope.row.price/100 : ''}}
        </template>
      </el-table-column>
      <el-table-column label="是否启用">
          <template slot-scope="scope">
             <span v-if="scope.row.status === 'unuse'"><span class="indicatorA"><span></span>停用</span></span>
              <span v-if="scope.row.status === 'use'"><span class="indicatorD"><span></span>已启用</span></span>
          </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
         <template slot-scope="scope">
           <el-button
            size="mini"
            icon="el-icon-edit"
            @click="handleEditProject(scope.row)"
            >
            </el-button>
            <el-button
            v-if="scope.row.status === 'unuse'"
            size="mini"
            type="success"
            icon="el-icon-check"
            @click="handleSwitchProject(scope.row,'use')"
            >
            </el-button>
            <el-button
            v-if="scope.row.status === 'use'"
            size="mini"
            type="warning"
            icon="el-icon-close"
            @click="handleSwitchProject(scope.row,'unuse')"
            >
            </el-button>
            <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDeleteProject(scope.row)"
            >
            </el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination
        @current-change="handlePageQuery"
        :current-page="currentPage"
        :page-size="limit"
        background
        layout="total, prev, pager, next"
        :total="total"
    ></el-pagination>
    <el-dialog
        title="新增项目"
        :visible.sync="dialogVisible"
        @close="closeDialogCallback('addPrjectRef')"
        width="30%">
        <el-form :inline="true" ref="addPrjectRef" :model="addProjectModel" :rules="addProjectRules" class="demo-form-inline" label-width="100px">
            <el-form-item label="项目名称" prop="projectName">
                <el-input v-model="addProjectModel.projectName" placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item label="项目编码" prop="projectNo">
                <el-input v-model="addProjectModel.projectNo" placeholder="请输入项目编码"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="projectUnit">
                <el-input v-model="addProjectModel.projectUnit" placeholder="请输入单位"></el-input>
            </el-form-item>
            <el-form-item label="单价" prop="price">
                <el-input v-model="addProjectModel.price" placeholder="请输入单价"></el-input>
            </el-form-item>
            <el-form-item label="最小单价" prop="minPrice">
                <el-input v-model="addProjectModel.minPrice" placeholder="请输入最小单价"></el-input>
            </el-form-item>
            <el-form-item label="最大单价" prop="maxPrice">
                <el-input v-model="addProjectModel.maxPrice" placeholder="请输入最大单价"></el-input>
            </el-form-item>
            <el-form-item label="单项折扣下限" prop="minDiscount">
                <el-input-number v-model="addProjectModel.minDiscount" :min="1" :max="100"></el-input-number> %
            </el-form-item>
            <el-form-item label="大类" prop="type1Code">
                  <el-select v-model="addProjectModel.type1Code" @change="handleSearchSubCate(addProjectModel.type1Code)">
                    <el-option v-for="item in cateList" :key="item.code" :label="item.lableName" :value="item.code"></el-option>
                  </el-select>
            </el-form-item>
            <el-form-item label="小类"  prop="type2Code">
                  <el-select v-model="addProjectModel.type2Code">
                    <el-option v-for="item in subCateList" :key="item.code" :label="item.lableName" :value="item.code"></el-option>
                  </el-select>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-switch
                    v-model="addProjectModel.status"
                    active-value="use"
                    inactive-value="unuse"
                    active-color="#13ce66">
                </el-switch>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handelConfirmDialog('addPrjectRef')">保存</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import storage from "@/tools/local_storage.js";

export default {
  components: {},
  props: {},
  data() {
    return {
      searchForm: {
        type1Code: "",
        status: "",
        projectName: "",
        projectNo: "",
      },
      cateList: [],
      subCateList: [],
      projectPriceList: [],
      currentProject: {},
      projectCode: '',
      status:'',
      addProjectModel: {
        projectName: '',
        projectNo: '',
        projectUnit: '',
        price: '',
        minDiscount: 100,
        minPrice: '',
        maxPrice: '',
        type1Code: '',
        type2Code: '',
        status
      },
      addProjectRules: {
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ],
        type1Code:  [
          { required: true, message: "请选择大类", trigger: "change" }
        ],
        type2Code: [
          { required: true, message: "请选择小类", trigger: "change" }
        ]
      },
      dialogVisible: false,
      currentPage: 1, // 当前页码
      limit: 10, // 每页条数
      total: 1 // 总条数
    };
  },
  watch: {},
  computed: {},
  methods: {
        // 下拉查询
        handleItemChange(key,val) {
            this.searchForm[key] = val
            this.getProjectPrice()
        },

        // 搜索查询
        searchData() {
            this.getProjectPrice()
        },
        // 重置搜索
        resetSearchData(keyname) {
            this.$refs[keyname].resetFields()
            this.getProjectPrice()
        },

        // 关闭弹窗清空表单
        closeDialogCallback(keyname) {
            this.addProjectModel.projectName = ''
            this.addProjectModel.projectNo = ''
            this.addProjectModel.projectUnit = ''
            this.addProjectModel.price =''
            this.addProjectModel.minDiscount = 100
            this.addProjectModel.minPrice = ''
            this.addProjectModel.maxPrice = ''
            this.addProjectModel.type1Code = ''
            this.addProjectModel.type2Code = ''
            this.addProjectModel.status = ''
            
            // 重置项目code，用于判断是否是编辑
            this.projectCode = ''
        },

        // 编辑项目并设置初始值
        handleEditProject(row) {
            this.dialogVisible = true
            this.addProjectModel.projectName = row.projectName
            this.addProjectModel.projectNo = row.projectNo
            this.addProjectModel.projectUnit = row.projectUnit
            this.addProjectModel.price = row.price ? row.price/100 : ''
            this.addProjectModel.minDiscount = row.minDiscount ? row.minDiscount/100 : ''
            this.addProjectModel.minPrice = row.minPrice ? row.minPrice / 100 : ''
            this.addProjectModel.maxPrice = row.maxPrice ? row.maxPrice / 100: ''
            this.addProjectModel.type1Code = row.type1Code
            this.addProjectModel.type2Code = row.type2Code 
            this.addProjectModel.status = row.status
            this.projectCode = row.code
            this.getCateList(row.type1Code)
        },

        // 下拉搜索小类
        handleSearchSubCate(parentCode) {
            this.addProjectModel.type2Code = ''
            this.getCateList(parentCode)
        },

        // 保存操作(编辑/新增)
        handelConfirmDialog(keyname) {
            this.$refs[keyname].validate((valid) => {
                    if (valid) {
                       if(this.projectCode ) {
                          this.handleSaveEditProject()
                       } else {
                          this.handelSaveAddProject()
                       }
                    } else {
                       console.log('error submit!!');
                      return false;
                    }
            })
        },

        // 分页
        handlePageQuery(currentPage) {
            this.currentPage = currentPage;
            this.getProjectPrice();
        },


        // 删除项目
        handleDeleteProject(row) {
           const {
                memberNoGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
            } = storage.get("userInfo")
            this.$confirm(`真的要删除${row.projectName}吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post('/api/hx/projectPrice/remove.do',{
                  code: row.code,
                  merchantNo: memberNoMerchant
                }).then(res=>{
                    const { result, errorMessage } =  res.data
                    if(result){
                        this.$message({
                            type: "success",
                            message: '操作成功!'
                        })
                        this.getProjectPrice()
                    }else{
                        this.$message({
                        type:'error',
                        message: errorMessage
                        })
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: `已取消${status === 'use' ? '启用' : '停用'}`
                });          
            })
            
        },


        // 启用/停用项目
        handleSwitchProject(row,status) {
            const {
                memberNoGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
            } = storage.get("userInfo")
            this.$confirm(`真的要${status === 'use' ? '启用' : '停用'}${row.projectName}吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post('/api/hx/projectPrice/edit.do',{
                code: row.code,
                updateId: memberNoGuid,
                status: status
                }).then(res=>{
                    const { result, errorMessage } =  res.data
                    if(result){
                        this.$message({
                            type: "success",
                            message: '操作成功!'
                        })
                        this.getProjectPrice()
                    }else{
                        this.$message({
                        type:'error',
                        message: errorMessage
                        })
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: `已取消${status === 'use' ? '启用' : '停用'}`
                });          
            })
        },

        
        // 保存修改
        handleSaveEditProject() {
            const {
                memberNoGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
            } = storage.get("userInfo")
            const { type1Code ,type2Code, projectName,price,projectNo, projectUnit, minPrice,maxPrice,minDiscount,status } = this.addProjectModel
            this.$http.post('/api/hx/projectPrice/edit.do',{
              code: this.projectCode ,
              updateId: memberNoGuid,
              type1Code,
              type1Name: this.cateList.find(item=> item.code === type1Code).lableName,
              type2Code,
              type2Name: this.subCateList.find(item=> item.code === type2Code).lableName,
              projectName,
              projectNo,
              projectUnit,
              price: price * 100,
              minPrice: minPrice * 100,
              maxPrice: maxPrice * 100,
              minDiscount: minDiscount* 100,
              status
            }).then(res=>{
                const { result, errorMessage, returnObject } = res.data;
                if (result) {
                    this.$message({
                        type: "success",
                        message: '编辑成功！'
                    });
                    this.getProjectPrice()
                    this.dialogVisible = false
                    this.projectCode = ''
                } else {
                    this.$message({
                        type: "error",
                        message: errorMessage
                    });
                }
            })
        },
        
        // 保存添加
        handelSaveAddProject() {
            const {
                memberNoGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
            } = storage.get("userInfo")
            const { type1Code ,type2Code, projectName,price,projectNo, projectUnit, minPrice,maxPrice,minDiscount,status } = this.addProjectModel

            this.$http.post('/api/hx/projectPrice/add.do',{
            code: this.projectCode ,
            merchantNo: memberNoMerchant,
            merchantName: memberNameMerchant,
            createId: memberNoGuid,
            type1Code,
            type1Name: this.cateList.find(item=> item.code === type1Code).lableName,
            type2Code,
            type2Name: this.subCateList.find(item=> item.code === type2Code).lableName,
            projectName,
            projectNo,
            projectUnit,
            price: price * 100,
            minPrice,
            maxPrice,
            minDiscount: minDiscount* 100,
            status
            }).then(res=>{
                const { result, errorMessage, returnObject } = res.data;
                if (result) {
                    this.$message({
                        type: "success",
                        message: '新增成功！'
                    });
                    this.getProjectPrice()
                    this.dialogVisible = false
                    this.projectCode = ''
                } else {
                    this.$message({
                        type: "error",
                        message: errorMessage
                    });
                }
            })
      },

      // 获取项目
      getProjectPrice() {
         const {currentPage,limit,total,searchForm } = this
         const { type1Code,status ,projectName,projectNo } = searchForm
         const {
            memberNoGuid,
            memberNoMerchant,
            memberNameMerchant,
            roleEnnames,
            shopNo
        } = storage.get("userInfo")
         this.$http.post('/api/hx/projectPrice/list.do',{
            start: (currentPage - 1 ) * limit,
            limit: limit,
            merchantNo: memberNoMerchant,
            projectName,
            projectNo,
            status,
            type1Code
         }).then(res=>{
            const { result, errorMessage, returnObject } = res.data;
            if (result) {
                const { total, rows } = returnObject
                this.projectPriceList = rows
                this.total = total
            } else {
                this.$message({
                    type: "error",
                    message: errorMessage
                });
            }
         })
      },

      // 获取大小类
      getCateList(parentCode) {
        const {
            memberNoGuid,
            memberNoMerchant,
            memberNameMerchant,
            roleEnnames,
            shopNo
        } = storage.get("userInfo")
        this.$http.post('/api/hx/projectPrice/type/list.do',{
          start: ( 1 - 1) * 10000,
          limit: 10000,
          merchantNo: memberNoMerchant,
          parentCode: parentCode ? parentCode : ''
        }).then(res=>{ 
            const { result, errorMessage, returnObject } = res.data;
            if (result) {
                const { total, rows } = returnObject
                if( parentCode ) {
                    this.subCateList = rows
                } else {
                    this.cateList = rows
                }
            } else {
                this.$message({
                    type: "error",
                    message: errorMessage
                });
            }
        })
      }
  },
  created() {},
  mounted() {
      this.getCateList()
      this.getProjectPrice()
  }
};
</script>
<style lang="less" scoped>
.BcategoryBox {
  position: relative;
  height: 100%;
  .headerBox {
    font-size: 22px;
    background: #f3f3f3;
    text-align: left;
    padding: 10px 20px;
    color: #686868;
    line-height: 40px;
  }
  .lfBigClass {
    float: left;
    width: 20%;
    margin-right: 2%;
    p {
      color: #409eff;
      padding: 5px;
    }
    p:hover {
      background: #409eff;
      color: #ffffff;
    }
  }
  .rgProjectBox {
    float: left;
    width: 78%;
  }
}
</style>