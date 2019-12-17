<template lang="html">
  <div>
    <el-upload
      accept=".jpg, .jpeg, .png, .bmp, .psd, .tga, .tiff"
      class="avatar-uploader"
      action="/api/upload/uploadMedicalImage.do"
      :show-file-list="false"
      :http-request="uploadSectionFile"
      >
      <span v-if="imageUrl_copy">
        <img :src="imageUrl_copy" class="avatar">
        <i class="el-icon-delete" title="删除" @click.stop="handleRemove"></i>
      </span>


      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import Bus from '../Data/bus.js'
import storage from "@/tools/local_storage.js";

export default {
  props: {
    imageUrl:{
      type: String,
      default: ''
    },
    name:{
      type: String,
      default: ''
    }
  },
  data() {
    return {
      uploadUrl: storage.get('userInfo').uploadUrl,
      imageUrl_copy: '',
    }
  },
  watch :{
    imageUrl(value){
      this.imageUrl_copy = value
    }
  },
  mounted(){
      this.imageUrl_copy = this.imageUrl
  },
  methods: {
     uploadSectionFile(param){

        var fileObj = param.file;
        var form = new FormData();
        const fileSizeM = fileObj.size / 1024 / 1024

        if (fileSizeM > 10) {
          let errMessage = '上传文件大小不能超过 10M'
          this.$message.error(errMessage)
          return false
        }

        form.append("uploadFile", fileObj)
        //console.log(form.get('file'))
        this.$http.post('/api/upload/uploadHeadImage.do',form).then(res => {
          // console.log(res)
          if(res.data.result == true){
            let data = res.data.returnObject
            if (data.includes(this.uploadUrl)) {
              this.imageUrl_copy = data
            } else {
              this.imageUrl_copy = this.uploadUrl + data
            }
            this.$message.success('上传成功')
             Bus.$emit('singleUpload', {
               name: this.name,
               url: this.imageUrl_copy
             })
          } else {
            this.$message.error(res.data.errorMessage)
            this.imageUrl_copy = ''
          }
        })
     },

     handleRemove () {
       this.imageUrl_copy = ''
     },

  }
}
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload {
  border: 1px solid #f1f1f1;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  border: 1px solid #d1d1d1;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}

</style>
