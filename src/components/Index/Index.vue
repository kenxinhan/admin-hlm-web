<template>
    <div>
      <div class="searchForm">
        <div class="title">
          <i></i>
          <span>筛选查询</span>
        </div>
        <el-form label-width="120px" class="clearfix">
          <div class="fSearch-f">
            <div class="fSearch-4 fSearch-f">
              <el-form-item size="small" label="选择日期 :">
                <el-date-picker v-model="beginTime" type="date" placeholder="开始日期" value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="btnSrarch">
            	<el-button size="small" type="primary" @click="getListData">查 询</el-button>
          	</div>
          </div>
        </el-form>
      </div>
        <!--分隔-->
        <div class="listTitle">
          <i></i>
          <span>数据列表</span>
        </div>
        <el-table :data="list" border class="mb10" >
          <el-table-column type='index' label="序号" min-width="80"></el-table-column>
          <el-table-column prop="userName" label="患者姓名" min-width="80"></el-table-column>
          <el-table-column prop="time" label="预约/挂号时间" min-width="120"></el-table-column>
          <el-table-column prop="time" label="预约时间" min-width="120"></el-table-column>
          <el-table-column prop="" label="挂号类型" min-width="50"></el-table-column>
          <el-table-column prop="doctor" label="医生" min-width="80"></el-table-column>
          <el-table-column prop="" label="预约初诊/复诊" min-width="80"></el-table-column>
          <el-table-column prop="" label="预约项目" min-width="80"></el-table-column>
          <el-table-column prop="" label="就诊状态" min-width="80"></el-table-column>
          <el-table-column prop="" label="备注" min-width="80"></el-table-column>
          <el-table-column label="接诊" min-width="50">
            <template slot-scope="scope">
                <span v-if="scope.row.status == 1">
                    <i class="icon el-icon-plus" @click="handleDelete(scope.row)"></i>
                </span>
                <span v-else>
                    <i class="icon el-icon-check" ></i>
                </span>
            </template>
          </el-table-column>
          <el-table-column label="转诊" min-width="50">
            <template slot-scope="scope">
                <span>
                    <i class="icon el-icon-plus" @click="transferPatient(scope.row)"></i>
                </span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="病例" min-width="50"></el-table-column>
          <el-table-column prop="" label="复诊预约" min-width="80">
            <template slot-scope="scope">
                <span>
                    <i class="icon el-icon-plus" @click="appointment(scope.row)"></i>
                </span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="治疗完成" min-width="80">
            <template slot-scope="scope">
                <span>
                    <i class="icon el-icon-plus" @click="complatePatient(scope.row)"></i>
                </span>
            </template>
          </el-table-column>
        </el-table>
        <div class="">
          <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          background
          layout="total, prev, pager, next"
          :total="total">
          </el-pagination>
        </div>

        <el-dialog title="转诊" :visible.sync="previewBox">
          <div class="previewBox">
            <div class="previewBox_head">
              <el-row>
                <el-col :span="2">
                  <img src="/static/img/icon_02.png" width="40" height="40">
                </el-col>
                <el-col :span="5">
                  <p>小小羊</p>
                  <p>0002154848848748</p>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    <p>上次就诊</p>
                    <p>2018-10-22</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple-light">
                    <p>医生</p>
                    <p>张医生</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    <p>患者来源</p>
                    <p>客服预约</p>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="previewBox_time">
              <div class="time">今日预约17:30-18:30</div>
              <div class="">
                <el-radio v-model="radio" label="1">初诊</el-radio>
                <el-radio v-model="radio" label="2">复诊</el-radio>
              </div>
            </div>

            <div>
              <div class="previewBox_doctor">
                <span>接诊医生</span>
                  <el-date-picker v-model="beginTime" type="date" placeholder="开始日期" value-format="yyyy-MM-dd">
                  </el-date-picker>
              </div>
              <div style="margin-top:20px;">
                <el-radio-group v-model="radio4" size="medium">
                  <el-radio-button label="上海" ></el-radio-button>
                  <el-radio-button label="北京"></el-radio-button>
                  <el-radio-button label="广州"></el-radio-button>
                  <el-radio-button label="深圳"></el-radio-button>
                </el-radio-group>
              </div>
            </div>

            <div class="previewBox_remark">
              <span>备注</span>
            </div>
            <div class="">
              <el-input type="textarea" :rows="2" v-model="textarea"> </el-input>
            </div>

          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="previewBox = false">取 消</el-button>
            <el-button type="primary" @click="">转诊</el-button>
          </div>
         </el-dialog>

         <el-dialog title="新建预约" :visible.sync="appointmentBox">
           <div class="appointment_head">
             <el-row>
               <el-col :span="6">
                 <img src="/static/img/icon_02.png" width="110" height="110">
               </el-col>
               <el-col :span="6">
                 <p>姓名：小小羊</p>
                 <p>手机：00021548488</p>
                 <p>初诊医生：张留留</p>
               </el-col>
               <el-col :span="6">
                 <div class="grid-content bg-purple">
                   <p>病历号：545646846865468</p>
                   <p>地址：广东省深圳市南山区</p>
                   <p>上次就诊日期：2018-10-11</p>
                 </div>
               </el-col>
               <el-col :span="6">
                 <div class="grid-content bg-purple-light">
                   <p>生日：1988-10-01</p>
                   <p>初诊日期：2018-10-11</p>
                   <p>上次就诊医生:王老二</p>
                 </div>
               </el-col>

             </el-row>
           </div>
           <div class="">
             <el-form :model="formList" ref="formList" :rules="formListRules" label-width="100px">
               <div style="width:49%;display:inline-block;padding:10px 0;vertical-align:top;">
                 <el-form-item label="类别：" prop="title">
                   <el-radio-group v-model="formList.appointmentType" size="small">
                     <el-radio-button label="初诊"></el-radio-button>
                     <el-radio-button label="复诊"></el-radio-button>
                  </el-radio-group>
                  <el-radio-group v-model="formList.appointmentStatus" size="small">
                    <el-radio-button label="普通"></el-radio-button>
                    <el-radio-button label="待定"></el-radio-button>
                  </el-radio-group>
                 </el-form-item>

                 <el-form-item label="咨询师：">
                     <el-select v-model="formList.counselor">
                         <el-option label="弓长张" value="en"></el-option>
                         <el-option label="木子李" value="zh_CN"></el-option>
                         <el-option label="是是是" value="zh_TW"></el-option>
                     </el-select>
                 </el-form-item>

                 <el-form-item label="医生：" prop="doctor">
                     <el-select v-model="formList.doctor" placeholder="请选择医生" >
                         <el-option label="弓长张" value="en"></el-option>
                         <el-option label="木子李" value="zh_CN"></el-option>
                         <el-option label="是是是" value="zh_TW"></el-option>
                     </el-select>
                 </el-form-item>

                 <el-form-item label="预约日期：" prop="time">
                   <el-date-picker v-model="formList.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input type="textarea" :rows="2" v-model="formList.remark"> </el-input>
                </el-form-item>
              </div>

              <div style="width:49%;display:inline-block;vertical-align:top;">
                <div class="box_title">
                  <p>预约项目</p>
                </div>
                <div class="item_box">
                  <div class="item_head">
                    <p>牙齿矫正</p>
                  </div>
                  <span class="item_cheBox">
                    <el-checkbox-group v-model="checkList1">
                      <el-checkbox label="复选框 A"></el-checkbox>
                      <el-checkbox label="复选框 B"></el-checkbox>
                    </el-checkbox-group>
                  </span>
                </div>

                <div class="item_box">
                  <div class="item_head">
                    <p>牙齿矫正</p>
                  </div>
                  <span class="item_cheBox">
                    <el-checkbox-group v-model="checkList2">
                      <el-checkbox label="复选框 A"></el-checkbox>
                      <el-checkbox label="复选框 B"></el-checkbox>
                      <el-checkbox label="复选框 A"></el-checkbox>
                      <el-checkbox label="复选框 A"></el-checkbox>
                      <el-checkbox label="复选框 B"></el-checkbox>
                      <el-checkbox label="复选框 A"></el-checkbox>
                    </el-checkbox-group>
                  </span>
                </div>
                <div class="item_box">
                  <div class="item_head">
                    <p>牙齿矫正</p>
                  </div>
                  <span class="item_cheBox">
                    <el-checkbox-group v-model="checkList3">
                      <el-checkbox label="复选框 A"></el-checkbox>
                      <el-checkbox label="复选框 B"></el-checkbox>
                    </el-checkbox-group>
                  </span>
                </div>
                <div class="item_box">
                  <div class="item_head">
                    <p>牙齿矫正</p>
                  </div>
                  <span class="item_cheBox">
                    <el-checkbox-group v-model="checkList4">
                      <el-checkbox label="复选框 A"></el-checkbox>
                      <el-checkbox label="复选框 B"></el-checkbox>
                    </el-checkbox-group>
                  </span>
                </div>
                <div class="item_box">
                  <div class="item_head">
                    <p>牙齿矫正</p>
                  </div>
                  <span class="item_cheBox">
                    <el-checkbox-group v-model="checkList5">
                      <el-checkbox label="复选框 A"></el-checkbox>
                      <el-checkbox label="复选框 B"></el-checkbox>
                    </el-checkbox-group>
                  </span>
                </div>
              </div>
             </el-form>

           </div>

           <div slot="footer" class="dialog-footer">
             <el-button @click="appointmentBox = false">取 消</el-button>
             <el-button type="primary" @click="">保存</el-button>
           </div>
          </el-dialog>

    </div>
</template>
<script>
import {parseTime} from '@/utils'
    export default {
        data(){
          let that = this
          return {
            list: [],
            title: '',
            currentPage: 1,
            total: 30,
            pageSize: 10,
			      cuPage: 1,
			      language:"",
            beginTime: '',
            list:[
              {userName:'小小羊', time:'2019-3-8 10:10', doctor:'张医生', status:'1'},
              {userName:'小小虎', time:'2019-3-8 10:10', doctor:'张医生', status:'2'},
            ],
            previewBox: false,
            appointmentBox:false,
            radio: '1',
            radio4:'上海',
            textarea:'',
            formList:{
              appointmentType:'初诊',
              appointmentStatus:'普通',
              counselor:'',
              doctor:'',
              time:'',
              remark:''
            },
            formListRules:{
              doctor: [
                  { required: true, message: '请选择医生', trigger: 'change' }
              ],
              time: [
                  { required: true, message: '请选择日期', trigger: 'change' }
              ],
            },
            checkList1:[],
            checkList2:[],
            checkList3:[],
            checkList4:[],
            checkList5:[],
            checkList6:[],
          }
        },
        mounted(){
          if(this.$route.query.currentPage){
            this.cuPage = this.$route.query.currentPage
            this.currentPage = Number(this.cuPage)
              // console.log(this.currentPage)
          }
        //  this.getListData(this.currentPage,this.pageSize)
        },
        methods: {
          handleCurrentChange(val) {
            this.currentPage = val
            this.getListData()
          },
          getListData(){
            this.$api.get('', {
        				title: this.title,
        				language:this.language,
                curPage: this.currentPage,
                pageSize: this.pageSize
            }, res=>{
              if (!this.$isEmpty(res.result)) {
                this.total = res.result.allCount
                this.list = res.result.list
              } else {
                this.list = []
                this.total = 0
              }
            })
          },

          handleDelete( obj) {
            let params = {
              ids: obj.id
            }
            let that = this
            this.$confirm('是否接诊患者'+obj.userName, '温馨提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center:true
            }).then(() => {
              /* 发送请求 */
              that.$api.delete('', params, res => {
                that.currentPage = 1
                that.getListData()
                that.$message({
                  type: 'success',
                  message: '操作成功!'
                })
              }, err => {
                console.log(err)
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              })
            })
          },
          //完成治疗
          complatePatient(obj){
            let params = {
              ids: obj.id
            }
            let that = this
            this.$confirm('确认患者'+obj.userName+'已完成治疗么？', '温馨提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center:true
            }).then(() => {
              /* 发送请求 */
              that.$api.delete('', params, res => {
                that.currentPage = 1
                that.getListData()
                that.$message({
                  type: 'success',
                  message: '操作成功!'
                })
              }, err => {
                console.log(err)
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              })
            })
          },
          //
          transferPatient(item){
            this.previewBox = true
          },
          appointment(item){
            this.appointmentBox = true
          },

        },
    }
</script>
<style lang="less" scoped>
.btnSrarch{
	padding-top: 2px;
    margin-left: 10px;
}
.previewBox{
  width: 100%;
  height: auto;
  .previewBox_head{
    border-bottom: 1px solid #d1d1d1;
    padding-bottom: 5px;
  }
}
.previewBox_time{
  height: 60px;
  line-height: 60px;
  &>div{
    display: inline-block;
  }
  .time{
    font-size: 20px;
    color: #666;
    margin-right: 10px;
  }
}
.previewBox_doctor{
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d1d1d1;
  span{
    font-size: 18px;
    color: #333;
    display: inline-block;
    margin-right:20px;
    font-weight: 600;
  }
}
.previewBox_remark{
  margin: 30px 0 10px 0;
  border-bottom: 1px solid #d1d1d1;
  span{
    line-height: 30px;
    font-size: 14px;
    color: #333;
  }
}
.appointment_head{
  border-bottom: 1px solid #d1d1d1;
  padding-bottom: 10px;
  p{
    line-height: 40px;
  }
}
.box_title{
  line-height: 30px;
  background-color: #409EFF;
  color: #fff;
  margin-bottom: 15px;
  padding-left: 10px;
}
.item_box{
  margin-bottom: 10px;
  .item_head{
    line-height: 30px;
    background: #d1d1d1;
  }

}

</style>
