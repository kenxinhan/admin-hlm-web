<template>
  <div class="MoreImgUpload">
    <el-upload
      action="/api/upload/uploadHeadImage.do"
      list-type="picture-card"
      accept=".jpg, .jpeg, .png, .bmp, .psd, .tga, .tiff"
      :file-list="fileList"
      :http-request="uploadSectionFile"
      :limit="limitNumber"
      :on-exceed="exceedNum"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import md5 from 'js-md5'
  export default {
    props:{
      limitNumber:{
        type: Number,
        default: 9,
      },
      dialogImageUrl:{
        type: String,
        default: ''
      },
      fileList:{
        type:Array,
        default:()=>[]
      },

    },
   data() {
     return {
       dialogVisible: false,
       //fileList:this.fileList
     };
   },
   methods: {
     // sendFloadImg(val){
     //   this.$emit('upFileList', this.val)
     // },
     //上传图片 文件
     uploadSectionFile(param){
        var merchantNo = this.$cfg.userInfo.memberNoMerchant
        var fileObj = param.file;
        var form = new FormData();
        const fileSizeM = fileObj.size / 1024 / 1024

        if (fileSizeM > 10) {
          let errMessage = '上传文件大小不能超过 10M'
          this.$message({
            type: 'error',
            message: errMessage
          })
          this.fileList = []
          return false
        }


        form.append("uploadFile", fileObj)
        //console.log(form.get('file'))
        this.$http.post('/api/upload/uploadHeadImage.do',form).then(res => {
          // console.log(res)
          if(res.data.result == true){
            this.$message({
              type:'success',
              message:'上传成功'
            })
          //  this.dialogImageUrl = res.data.returnObject
            this.fileList.push(res.data.returnObject)
          //  this.sendFloadImg(this.fileList)
          } else {
            this.$message({
              type:'error',
              message:res.data.errorMessage
            })
             this.fileList =[]
          }
        })
     },
     handleRemove(file, fileList) {
       //  console.log(this.fileList)
     },
     handlePictureCardPreview(file) {
       this.dialogImageUrl = file.url;
       this.dialogVisible = true;
     },
     exceedNum(file){
       this.$message({
         type: 'danger',
         message: '最多上传'+this.limitNumber+'张图片'
       });
     },

   },
   beforeDestroy(){
     this.fileList =[]
   }
 }

</script>

<style lang="less">
.MoreImgUpload .el-upload-list--picture-card .el-upload-list__item,.MoreImgUpload .el-upload--picture-card{width: 80px;height: 80px;}
.MoreImgUpload .el-upload--picture-card i{position: relative;bottom: 30px;right: 0;}

</style>
