<template>
    <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :before-upload="beforeAvatarUpload">
        <img v-if="value" :src="value" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>
<script>
    import OSS from 'ali-oss'
    import axios from 'axios'
    export default {
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        methods:{
            beforeAvatarUpload(file) {
                let fileName = new Array(0)
                fileName = file.name.split('.')
                const imageType = ['png', 'jpg', 'gif', 'jpeg']
                const isJPG = imageType.indexOf(fileName[fileName.length - 1])
                const isLt2M = file.size / 1024 / 1024 < 2;
                let isUpload = true
                if (isJPG === -1) {
                    this.$message.error('上传头像图片只能是 png, jpg, gif,jpeg 格式!');
                    return false
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                    return false
                }
                this.alyOssUpload(file)
                return false
            },
            //阿里云上传
            alyOssUpload(file){
                let storeAs = file.name
                //console.log(file.name + ' => ' + storeAs);
                axios.get('http://www.appdown.vip/sts-server/dc-jys.php').then(res=>{
                    let result = res.data
                    let client = new OSS.Wrapper({
                        accessKeyId: result.AccessKeyId,
                        accessKeySecret: result.AccessKeySecret,
                        stsToken: result.SecurityToken,
                        endpoint: 'oss-cn-beijing.aliyuncs.com',
                        bucket: 'dc-exchanges'
                    })
                    client.multipartUpload(storeAs, file).then((result) => {
                        let imageUrl = 'http://dc-exchanges.oss-cn-beijing.aliyuncs.com/' + storeAs
                        this.$emit("input", imageUrl)
                    }).catch((err) => {
                        //console.log(err);
                    })
                })
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
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
.avatar {
    width: 50px;
    height: 50px;
    display: block;
}
</style>
