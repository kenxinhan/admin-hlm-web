<template>
  <div>
    <br>
    <div class="imageBox-top">
      <span>影像类型&nbsp;</span>
      <el-select v-model="typeCode" placeholder="请选择" @change="getLibraryList">
        <el-option label="全部影像" value="" ></el-option>
        <el-option
          size="mini"
          v-for="(item, index) in imageTypeList"
          :key="index"
          :label="item.name"
          :value="item.code"
        ></el-option>
      </el-select>
      <span style="margin-left:30px;"><el-button type="primary" @click="clickUpload">上传影像</el-button></span>
    </div>
    <br>
    <div class="imageBox-body" v-if="!showUploadBox">
      <div class="imageBox-row" v-for="(item, index) in ImageLibraryList" :key="index" v-if="ImageLibraryList.length > 0">
          <p class="rowTitle"><span></span>{{item.reservationDate}}</p>
          <div class="imageBox-list">
              <li class="childrenBox"
                v-for="(val, ind) in item.list"
                :key="ind"
                >
               <span class="">
                 <i class="deleteIcon el-icon-delete" @click="deleteImage(val)"></i>
                 <img :src="reditImg(val.imgUrl)" class="img_item">
                 <span v-if="val.show">
                   <p class="imgRemark" @dblclick="editRemark(val, ind)" :title="val.remark" v-if="val.remark">{{val.remark}}</p>
                   <p class="imgRemark" @dblclick="editRemark(val, ind)" v-else>双击添加备注</p>
                 </span>
                   <input
                     class="changeName"
                     type="text"
                     id="changeInput"
                      v-if="!val.show"
                     v-model="changeRemark"
                     maxlength="50"
                     @blur="blurInput(val, ind)"
                     @keyup.enter="blurInput(val)"
                    >

               </span>
              </li>

          </div>
      </div>
      <div class="no-result" v-if="ImageLibraryList.length==0">
        <p>暂无影像资料</p>
      </div>
    </div>
    <br>
    <div  v-if="showUploadBox" class="uploadBox">
      <p class="upTitle">上传影像</p>
      <div class="">
        <el-form ref="uploadForm" :model="uploadForm" :rules="rules" label-width="100px" style="max-width:700px;min-height:400px;">
          <el-form-item label="关联预约" prop="reservationDate">
            <el-select v-model="uploadForm.reservationDate" placeholder="请选择">
              <el-option
                size="mini"
                v-for="(item, index) in reserveList"
                :key="index"
                :label="item.reservationDate"
                :value="item.reservationDate"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="影像类型" prop="imgTypeCode">
            <el-select v-model="uploadForm.imgTypeCode" placeholder="请选择">
              <el-option
                size="mini"
                v-for="(item, index) in imageTypeList"
                :key="index"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分享图片：" >
            <UploadImage ref="imguplode" :limitNumber="limitNumber" :file-list="fileList"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('uploadForm')">确定</el-button>
            <el-button @click="showUploadBox = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UploadImage from '@/components/Core/UploadImage'
import storage from "@/tools/local_storage.js";

export default {
  components: {
    UploadImage,
  },
  data() {
    return {
      uploadUrl: storage.get("userInfo").uploadUrl,
      typeCode: '',
      imageTypeList: [],
      ImageLibraryList: [],
      reserveList: [],
      showUploadBox: false,
      uploadForm: {
        reservationDate: '',
        imgTypeCode: '',
      },
      rules:{
        reservationDate: [
            { required: true, message: '请选择关联预约', trigger: 'change' }
          ],
          imgTypeCode: [
              { required: true, message: '请选择影像类型', trigger: 'change' }
            ],
      },
      limitNumber: 10,
      fileList: [],
      changeRemark: '',
    };
  },
  watch: {},
  computed: {},
  methods: {

    //删除影像
    deleteImage (val) {
      this.$http.post('/api/hx/medicalImg/delete.do',{
        patientCode: val.patientCode,
        code: val.code
      }).then(res => {
        if (res.data.result) {
          this.$message.success('删除成功')
          this.getLibraryList()
        } else {
          this.$message.error(res.data.errorMessage)
        }
      })
    },

    submitForm(formName) {
      let mediasUrl = this.fileList.map(item => {
        return item.url
      })

        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              patientCode: this.$route.params.code,
              imgUrl: mediasUrl.join(','),
              imgTypeCode: this.uploadForm.imgTypeCode,
              reservationDate: this.uploadForm.reservationDate,
              remark: '',
            }
            this.$http.post('/api/hx/medicalImg/save.do',params).then(res => {
              if (res.data.result) {
                this.$message.success('上传成功')
                this.getLibraryList()
                this.showUploadBox = false
                this.$refs[formName].resetFields()
                this.fileList = []
              } else {
                this.$message.error(res.data.errorMessage)
              }
            })
          }
        })
    },

    //修改备注
    editRemark (val, ind) {
      val.show = false
      this.changeRemark = val.remark

      this.$nextTick(() => {
        //原生获取  this.$refs会报错
        document.getElementById('changeInput').focus()
      })
    },

    async blurInput (val, ind) {
      val.show = true
      if (!this.changeRemark) {
        return false
      }
      if (this.changeRemark == val.remark) {
        return false
      }

      let params = {
        code: val.code,
        patientCode: val.patientCode,
        remark: this.changeRemark
      }

      this.$http.post('/api/hx/medicalImg/edit.do',params).then(res => {
        if (res.data.result) {
          this.$message.success('修改成功')
          this.getLibraryList()
        } else {
          this.$message.error(res.data.errorMessage)
        }
      })
    },

    clickUpload () {
      this.showUploadBox = true
      if (!this.reserveList.length) {
        this.getReservationDate()
      }

    },

    //获取影像列表
    getLibraryList () {
      this.$http.post('/api/hx/medicalImg/list.do',{
        patientCode: this.$route.params.code,
        imgTypeCode: this.typeCode
      }).then(res => {
        if (res.data.result) {
          let data = res.data.returnObject
          data.forEach( item => {
            item.list.forEach(val => {
              val.show = true
            })
          })
          this.ImageLibraryList = data

        } else {
          this.$message.error(res.data.errorMessage)
        }
      })
    },

    //获取影像类型
    getImageType () {
      this.$http.post('/api/hx/medicalImg/imgTypeList.do').then(res => {
        if (res.data.result) {
          this.imageTypeList = res.data.returnObject
        } else {
          this.$message.error(res.data.errorMessage)
        }
      })
    },

    //获取关联预约时间
    getReservationDate () {
      let patientNo = this.$route.params.code
      this.$http.post('/api/hx/ps/findPatientReservationList.do',{
        patientNo: patientNo
      }).then(res => {

        if (res.data.result) {
          this.reserveList = res.data.returnObject
        } else {
          this.$message.error(res.data.errorMessage)
        }
      })
    },

    reditImg (url) {
      if(url.includes('http')){
        return url
      } else {
        return this.uploadUrl + url
      }
    },
  },
  created() {},
  mounted() {
     this.getImageType()
     this.getLibraryList()
  }
};
</script>
<style lang="less" scoped>
  .imageBox-top{
    border-bottom: 1px dashed #d1d1d1;
    padding-bottom: 20px;
    box-sizing: border-box;
  }
  .imageBox-body{

    .imageBox-row{
      margin-bottom: 15px;
      padding: 10px;

      .rowTitle{
          font-size: 16px;
          padding-left: 15px;
          line-height: 16px;
          position: relative;
          margin-bottom: 10px;

          span{
            display: inline-block;
            width: 4px;
            height: 15px;
            position: absolute;
            left: 0;
            top: 50%;
            margin-top: -8px;
            background-color: #545c64;
          }
      }

      .imageBox-list{
        // display: flex;
        background-color: #F5F5F5;

        .childrenBox{
            width: 180px;
            height: 120px;
            display: inline-block;
            margin: 5px 5px 10px;
            padding-left: 0;
            padding-right: 0;
            border: 1px solid #e0e0e0;
            position: relative;
            box-sizing: border-box;
            text-align: center;

            .deleteIcon{
              color: red;
              font-size: 20px;
              position: absolute;
              right: 7px;
              top: 7px;
              cursor: pointer;
            }

            .img_item{
              max-width: 100%;
              max-height: 100%;
              vertical-align: middle;
              height: 120px;
              display: inline-block;
            }

            .imgRemark{
              margin-top: 8px;
              display: block;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              cursor: pointer;
            }

            .changeName {
              width: 100%;
              height: 24px;
              border-radius: 2px;
              border: 1px solid #a2a2a2;
              text-indent: 10px;
              margin-top: 8px;
            }
        }
      }

    }
    .no-result{
      text-align: center;
      color: #888;
      margin-top: 20px;
      font-size: 14px;
    }
  }
  .uploadBox{
    width: 100%;
    padding: 0px 0 0 20px;
    box-sizing: border-box;

    .upTitle{
      padding-left: 20px;
      font-size: 16px;
      margin-bottom: 30px;
      font-weight: bold;
    }
  }
  .MoreImgUpload .el-icon-plus{vertical-align: text-top;}
  .MoreImgUpload .el-icon-plus:before{width: 80px;height: 80px;display: inline-block;font-size: 60px;text-align: center;color: #797979;}
  .MoreImgUpload .el-upload-list__item:first-child,.MoreImgUpload .el-upload-list__item-name{width: 250px;}
</style>
