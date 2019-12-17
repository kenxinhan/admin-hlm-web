<template>
  <div class="CcategoryBox">
      <div class="topHeader clearfix">
        <div class="pull-left"></div>
        <div class="pull-right">
            <el-button type="primary" @click="isShowAddPayType = true">新建支付方式</el-button>
        </div>
      </div>
      <el-table
        :data="payTypeList"
        style="width: 100%">
        <el-table-column prop="indexNo" label="编号"></el-table-column>
        <el-table-column prop="lableName" label="名称">
            <template slot-scope="scope">
                <span v-if="isShowEditPayTypeCode !== scope.row.code">{{scope.row.lableName}}</span>
                <el-form ref="editTypeModel" :model="editPayTypeModel" :rules="editPayTyperules" v-if="isShowEditPayTypeCode === scope.row.code">
                    <el-form-item prop="lableName">
                        <el-input
                        v-model="editPayTypeModel.lableName"
                        placeholder="请输入支付名称"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
            <template slot-scope="scope">
                <span v-if="isShowEditPayTypeCode !== scope.row.code">{{scope.row.remark}}</span>
                <el-form ref="editTypeModel" :model="editPayTypeModel" :rules="editPayTyperules" v-if="isShowEditPayTypeCode === scope.row.code">
                    <el-form-item>
                        <el-input
                        v-model="editPayTypeModel.remark"
                        placeholder="请输入备注"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
         <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                  <div v-if="isShowEditPayTypeCode !== scope.row.code">
                      <el-button
                        @click="handleEditPayType(scope.row)"
                        icon="el-icon-edit-outline"
                        size="small"
                        ></el-button>
                        <el-button
                        @click="handleDeletePayType(scope.row)"
                        icon="el-icon-delete"
                        type="danger"
                        size="small"
                        ></el-button>
                </div>
                <div v-if="isShowEditPayTypeCode === scope.row.code">
                    <el-button
                    size="mini"
                    icon="el-icon-check"
                    type="primary"
                    @click="handleSaveEditPayType(scope.row,'editTypeModel')"
                    >保存</el-button>
                    <el-button
                    size="mini"
                    icon="el-icon-close"
                    @click="isShowEditPayTypeCode = ''"
                    >取消</el-button>
                </div>
              </template>
            </el-table-column>
      </el-table>
      <el-form ref="addPayType" :model="addPayTypeModel" :rules="addPayTyperules" v-if="isShowAddPayType">
        <el-table :data="[{}]" style="width: 100%" :show-header="false">
            <el-table-column width="80"></el-table-column>
            <el-table-column>
            <template slot-scope="scope" :data="scope">
                {{ payTypeList.length > 0 ? payTypeList[payTypeList.length - 1].indexNo + 1 : '' }}
            </template>
            </el-table-column>
            <el-table-column>
            <template slot-scope="scope" :data="scope">
                <el-form-item prop="lableName">
                    <el-input
                    v-model="addPayTypeModel.lableName"
                    placeholder="请输入支付名称"
                    ></el-input>
                </el-form-item>
            </template>
            </el-table-column>
            <el-table-column>
            <template slot-scope="scope" :data="scope">
                <el-form-item>
                    <el-input
                    v-model="addPayTypeModel.remark"
                    placeholder="请输入备注"
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
                @click="handleSaveAddPayType('addPayType')"
                >保存</el-button>
                <el-button
                size="mini"
                icon="el-icon-close"
                @click="isShowAddPayType = false"
                >取消</el-button>
            </template>
            </el-table-column>
        </el-table>
     </el-form>
  </div>
</template>

<script>
import storage from "@/tools/local_storage.js";

export default {
  components:{},
  props:{},
  data(){
    return {
        payTypeList: [],
        isShowAddPayType: false,
        isShowEditPayTypeCode: '',
        addPayTypeModel: {
           lableName:'',
           remark: '',
        },
        addPayTyperules:{
           lableName: [
              { required: true, message: "请输入支付名称", trigger: "blur" }
           ]
        },
        editPayTypeModel: {
           lableName:'',
           remark: '',
        },
        editPayTyperules:{
           lableName: [
              { required: true, message: "请输入支付名称", trigger: "blur" }
           ]
        },
        currentPage: 1, // 当前页码
        limit: 10, // 每页条数
        total: 1 // 总条数
    }
  },
  watch:{},
  computed:{},
  methods:{
        
        // 编辑
        handleEditPayType(row){
            this.isShowEditPayTypeCode = row.code
            this.editPayTypeModel = row
        },
        
        // 删除
        handleDeletePayType(row) {
            const {
                memberNoGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
            } = storage.get("userInfo")
            this.$confirm(`真的要删除${row.lableName}吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post('/api/hx/projectPrice/payType/remove.do',{
                code: row.code,
                merchantNo: memberNoMerchant
                }).then(res=>{
                    const { result, errorMessage } =  res.data
                    if(result){
                        this.$message({
                            type: "success",
                            message: '删除成功!'
                        })
                        this.getPayTypeList()
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
                    message: `已取消删除`
                });          
            })
             
        },

        // 保存编辑
        handleSaveEditPayType(row,keyname) {
          const {lableName,remark } = this.editPayTypeModel
          this.$refs[keyname].validate((valid) => {
            if (valid) {
                this.$http.post('/api/hx/projectPrice/payType/edit.do',{
                    code: row.code,
                    lableName,
                    remark
                }).then(res=>{
                    const { result, errorMessage, returnObject } = res.data;
                    if (result) {
                        this.$message({
                            type: "success",
                            message: '编辑成功！'
                        });
                        this.getPayTypeList()
                        this.isShowEditPayTypeCode = '' 
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

        // 保存新增
        handleSaveAddPayType(keyname) {
            const {
                memberNoGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
            } = storage.get("userInfo")
            const {lableName,remark } = this.addPayTypeModel
            this.$refs[keyname].validate((valid) => {
            if (valid) {
                this.$http.post('/api/hx/projectPrice/payType/add.do',{
                    merchantNo: memberNoMerchant,
                    merchantName: memberNameMerchant,
                    createId: memberNoGuid,
                    lableName,
                    remark
                }).then(res=>{
                    const { result, errorMessage, returnObject } = res.data;
                    if (result) {
                        this.$message({
                            type: "success",
                            message: '新增成功！'
                        });
                        this.getPayTypeList()
                        this.isShowAddPayType = false
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

        // 获取支付类型列表
        getPayTypeList() {
            const {
                memberNoGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
            } = storage.get("userInfo")
            const { currentPage, limit } = this
            this.$http.post('/api/hx/projectPrice/payType/list.do',{
                start: (currentPage - 1 ) * limit,
                limit: limit,
                merchantNo: memberNoMerchant
            }).then(res=>{
                const { result, errorMessage, returnObject } = res.data;
                if (result) {
                    const { total, rows } = returnObject
                    this.payTypeList = rows
                    this.total = total
                } else {
                    this.$message({
                        type: "error",
                        message: errorMessage
                    });
                }
            })
        }
  },
  created(){},
  mounted(){
      this.getPayTypeList()
  }
}
</script>
<style lang="less" scoped>
.CcategoryBox{
    .topHeader {
        padding: 10px 20px;
        line-height: 40px;
        font-size: 22px;
    }
}
</style>