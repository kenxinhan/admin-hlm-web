<template>
  <div class="AcayeGoryBox">
    <div class="topHeader clearfix">
      <div class="pull-left">收费大类配置</div>
      <div class="pull-right">
        <el-button type="primary" @click="isShowAddPreCate = true">新建大类</el-button>
      </div>
    </div>
    <el-table
      :data="preCateList"
      style="width: 100%"
      @expand-change="handelExpandChange"
      :row-key="getRowKeys"
      :expand-row-keys="expands"
    >
      <el-table-column type="expand" width="80">
        <template slot-scope="scope" :data-code="scope.code">
          <br>
          <el-table :data="subCateList" style="width: 80%;margin: 0 auto" class="boxShadowBox">
            <el-table-column label="小类名称" prop="lableName" fixed>
               <template slot-scope="scope">
                    <span v-if="isShowEditSubCateCode !== scope.row.code">{{scope.row.lableName}}</span>
                    <el-form ref="editPreCate" :model="editSubCateModel" :rules="editSubCaterules" v-if="isShowEditSubCateCode === scope.row.code">
                        <el-form-item prop="lableName">
                                <el-input
                                v-model="editSubCateModel.lableName"
                                placeholder="请输入大类名称"
                                ></el-input>
                            </el-form-item>
                    </el-form>
              </template>
            </el-table-column>
            <el-table-column prop="enname" label="英文名">
               <template slot-scope="scope">
                    <span v-if="isShowEditSubCateCode !== scope.row.code">{{scope.row.enname}}</span>
                    <el-form ref="editPreCate" :model="editSubCateModel" :rules="editSubCaterules" v-if="isShowEditSubCateCode === scope.row.code">
                        <el-form-item prop="enname">
                                <el-input
                                v-model="editSubCateModel.enname"
                                placeholder="请输入英文名称"
                                ></el-input>
                            </el-form-item>
                    </el-form>
               </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                  <div v-if="isShowEditSubCateCode !== scope.row.code">
                      <el-button
                        @click="handleEditSubCate(scope.row)"
                        icon="el-icon-edit-outline"
                        size="small"
                        ></el-button>
                        <el-button
                        @click="handleDeleteCate(scope.row,'deleteSubCate')"
                        icon="el-icon-delete"
                        type="danger"
                        size="small"
                        ></el-button>
                </div>
                <div v-if="isShowEditSubCateCode === scope.row.code">
                    <el-button
                    size="mini"
                    icon="el-icon-check"
                    type="primary"
                    @click="handleSaveEditCate(scope.row,'editSubCate')"
                    >保存</el-button>
                    <el-button
                    size="mini"
                    icon="el-icon-close"
                    @click="isShowEditSubCateCode = ''"
                    >取消</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-form ref="addSubCate" style="width: 80%;margin: 0 auto" :model="addSubCateModel" :rules="addSubCaterules" v-if="isShowAddSubCate" class="boxShadowBox">
            <el-table :data="[{}]" :show-header="false">
                <el-table-column>
                <template slot-scope="scope" :data="scope">
                    <el-form-item prop="lableName">
                        <el-input
                        v-model="addSubCateModel.lableName"
                        placeholder="请输入班次名称"
                        ></el-input>
                    </el-form-item>
                </template>
                </el-table-column>
                <el-table-column>
                <template slot-scope="scope" :data="scope">
                    <el-form-item prop="enname">
                        <el-input
                        v-model="addSubCateModel.enname"
                        placeholder="请输入班次名称"
                        ></el-input>
                    </el-form-item>
                </template>
                </el-table-column>
                <el-table-column align="center">
                <template slot-scope="scope" :data="scope">
                    <el-button
                    size="mini"
                    icon="el-icon-check"
                    type="primary"
                    @click="handleSaveCate('addSubCate')"
                    >保存</el-button>
                    <el-button
                    size="mini"
                    icon="el-icon-close"
                    @click="isShowAddSubCate = false"
                    >取消</el-button>
                </template>
                </el-table-column>
            </el-table>
            </el-form>
             <br>
          <el-button @click="isShowAddSubCate = true" icon="el-icon-plus" type="primary" size="small">添加小类</el-button>
           <br>
            <br>
        </template>
      </el-table-column>
      <el-table-column label="序号" prop="indexNo"></el-table-column>
      <el-table-column label="大类名称">
          <template slot-scope="scope">
               <span v-if="isShowEditPreCateCode !== scope.row.code">{{scope.row.lableName}}</span>
               <el-form ref="editPreCate" :model="editPreCateModel" :rules="editPreCaterules" v-if="isShowEditPreCateCode === scope.row.code">
                   <el-form-item prop="lableName">
                        <el-input
                        v-model="editPreCateModel.lableName"
                        placeholder="请输入大类名称"
                        ></el-input>
                    </el-form-item>
               </el-form>
          </template>
      </el-table-column>
      <el-table-column label="英文名称" prop="enname">
           <template slot-scope="scope">
               <span v-if="isShowEditPreCateCode !== scope.row.code">{{scope.row.enname}}</span>
               <el-form ref="editPreCate" :model="editPreCateModel" :rules="editPreCaterules" v-if="isShowEditPreCateCode === scope.row.code">
                   <el-form-item prop="enname">
                        <el-input
                        v-model="editPreCateModel.enname"
                        placeholder="请输入英文名称"
                        ></el-input>
                    </el-form-item>
               </el-form>
          </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
            <div v-if="isShowEditPreCateCode !== scope.row.code">
                <el-button
                    size="mini"
                    icon="el-icon-edit-outline"
                    @click="handleEditPreCate(scope.row)"
                ></el-button>
                <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    @click="handleDeleteCate(scope.row,'deletePreCate')"
                ></el-button>
            </div>
            <div v-if="isShowEditPreCateCode === scope.row.code">
              <el-button
              size="mini"
              icon="el-icon-check"
              type="primary"
              @click="handleSaveEditCate(scope.row,'editPreCate')"
            >保存</el-button>
            <el-button
              size="mini"
              icon="el-icon-close"
              @click="isShowEditPreCateCode = ''"
            >取消</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-form ref="addPreCate" :model="addPreCateModel" :rules="addPreCaterules" v-if="isShowAddPreCate">
      <el-table :data="[{}]" style="width: 100%" :show-header="false">
        <el-table-column width="80"></el-table-column>
        <el-table-column>
          <template slot-scope="scope" :data="scope">
              {{ preCateList.length > 0 ? preCateList[preCateList.length - 1].indexNo + 1 : '' }}
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope" :data="scope">
              <el-form-item prop="lableName">
                <el-input
                  v-model="addPreCateModel.lableName"
                  placeholder="请输入大类名称"
                ></el-input>
             </el-form-item>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope" :data="scope">
              <el-form-item prop="enname">
                <el-input
                  v-model="addPreCateModel.enname"
                  placeholder="请输入英文名称"
                ></el-input>
             </el-form-item>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope" :data="scope">
            <el-button
              size="mini"
              icon="el-icon-check"
              type="primary"
              @click="handleSaveCate('addPreCate')"
            >保存</el-button>
            <el-button
              size="mini"
              icon="el-icon-close"
              @click="isShowAddPreCate = false"
            >取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <br>
    <el-pagination
        @current-change="handlePageQuery"
        :current-page="currentPage"
        :page-size="limit"
        background
        layout="total, prev, pager, next"
        :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import storage from "@/tools/local_storage.js";

export default {
  components: {},
  props: {},
  data() {
    return {
      preCateList: [],
      subCateList: [],
      parentCode: "",
      expands: [],
      getRowKeys(row) {
        return row.code;
      },
      isShowAddPreCate: false,
      isShowAddSubCate: false,
      isShowEditPreCateCode: '',
      isShowEditSubCateCode: '',
      addPreCateModel: {
        lableName: "",
        enname: ""
      },
      addPreCaterules: {
        lableName: [
          { required: true, message: "请输入类目名称", trigger: "blur" }
        ],
      },
      addSubCateModel: {
        lableName: "",
        enname: ""
      },
      addSubCaterules: {
        lableName: [
          { required: true, message: "请输入类目名称", trigger: "blur" }
        ],
      },
      editPreCateModel: {
        lableName: "",
        enname: ""
      },
      editPreCaterules: {
        lableName: [
          { required: true, message: "请输入类目名称", trigger: "blur" }
        ],
      },
      editSubCateModel: {
        lableName: "",
        enname: ""
      },
      editSubCaterules: {
        lableName: [
          { required: true, message: "请输入类目名称", trigger: "blur" }
        ],
      },
      currentPage: 1, // 当前页码
      limit: 10, // 每页条数
      total: 1 // 总条数
    };
  },
  watch: {},
  computed: {},
  methods: {

    handelExpandChange(row, expandedRows) {
      var that = this;
      if (expandedRows.length) {
        that.expands = [];
        if (row) {
          that.expands.push(row.code);
        }
      } else {
        that.expands = [];
      }

      this.parentCode = row.code;
      this.getCateList(true);
    },

    handleSaveCate(keyname) {
       const { lableName, enname } = keyname === 'addPreCate' ? this.addPreCateModel : this.addSubCateModel
       const {
        memberNoGuid,
        memberNoMerchant,
        memberNameMerchant,
        roleEnnames,
        shopNo
        } = storage.get("userInfo")
        this.$refs[keyname].validate((valid) => {
            if (valid) {
                this.$http.post('/api/hx/projectPrice/type/add.do',{
                    merchantNo:memberNoMerchant,
                    merchantName: memberNameMerchant,
                    createId: memberNoGuid,
                    parentCode: keyname === 'addPreCate' ? '' : this.parentCode ,
                    lableName,
                    enname
                }).then(res=>{
                    const { result, errorMessage } = res.data;
                    if (result) {
                        this.$message({
                            type: "success",
                            message: '添加成功!'
                        })
                        
                        if( keyname === 'addPreCate' ) {
                          this.getCateList()
                          this.isShowAddPreCate = false
                        } else {
                          this.getCateList(true)
                          this.isShowAddSubCate = false
                        }
                    } else {
                        this.$message({
                            type: "error",
                            message: errorMessage
                        });
                    }
                })
            } else {
              console.log('error submit!!');
              return false;
            }
        })
        
    },

    handleSaveEditCate(row,keyname) {
        const {lableName,enname} =  keyname === 'editPreCate' ? this.editPreCateModel : this.editSubCateModel
        const {
            memberNoGuid,
            memberNoMerchant,
            roleEnnames,
            shopNo
        } = storage.get("userInfo")
        this.$http.post('/api/hx/projectPrice/type/edit.do',{
           code: row.code,
           lableName,
           enname,
           updateId: memberNoGuid
        }).then(res=>{
              const { result, errorMessage } =  res.data
              if(result){
                this.$message({
                    type: "success",
                    message: '编辑成功!'
                })
                if( keyname === 'editPreCate' ) {
                    this.getCateList()
                    this.isShowEditPreCateCode = ''
                } else {
                    this.getCateList(true)
                    this.isShowEditSubCateCode = ''
                }
              }else{
                this.$message({
                  type:'error',
                  message: errorMessage
                })
              }
        })
    },

    handleEditPreCate(row) {
        this.isShowEditPreCateCode = row.code
        this.editPreCateModel.lableName = row.lableName
        this.editPreCateModel.enname = row.enname
    },
    handleEditSubCate(row) {
        this.isShowEditSubCateCode = row.code
        this.editSubCateModel.lableName = row.lableName
        this.editSubCateModel.enname = row.enname
    },
    handleDeleteCate(row,keyname) {
        const {
            memberNoGuid,
            memberNoMerchant,
            roleEnnames,
            shopNo
        } = storage.get("userInfo")
        this.$confirm('真的要删除该分类吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http.post('/api/hx/projectPrice/type/remove.do',{
              code: row.code,
              merchantNo: memberNoMerchant
            }).then(res=>{
              const { result, errorMessage } =  res.data
              if(result){
                this.$message({
                    type: "success",
                    message: '删除成功!'
                })
                if( keyname === 'deletePreCate' ) {
                    this.getCateList()
                } else {
                    this.getCateList(true)
                }
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
            message: '已取消删除'
          });          
        })
    },
    getCateList(isGetSubCate) {
      const { currentPage, limit, parentCode } = this;
      const {
        memberNoGuid,
        memberNoMerchant,
        roleEnnames,
        shopNo
      } = storage.get("userInfo")
      this.$http
        .post("/api/hx/projectPrice/type/list.do", {
          start: (currentPage - 1) * limit,
          limit: limit,
          merchantNo: memberNoMerchant,
          parentCode: isGetSubCate ? parentCode : ''
        })
        .then(res => {
          const { result, errorMessage } = res.data;
          if (result) {
            const { total, rows } = res.data.returnObject;
            this.total = total;
            if (isGetSubCate) {
              this.subCateList = rows;
            } else {
              this.preCateList = rows;
            }
          } else {
            this.$message({
              type: "error",
              message: errorMessage
            });
          }
        });
    },

    // 分页
    handlePageQuery(currentPage) {
        this.currentPage = currentPage;
        this.getCateList();
    }
  },
  created() {},
  mounted() {
    this.getCateList();
  }
};
</script>
<style lang="less" scoped>
.boxShadowBox {
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.topHeader {
  padding: 10px 20px;
  line-height: 40px;
  font-size: 22px;
}
</style>