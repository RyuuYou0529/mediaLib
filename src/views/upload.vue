<template>
  <div>
    <a-upload
      action="http://localhost:3000/api/picture/upload"
      list-type="text"
      :showUploadList="true"
      :fileList="fileList"
      :before-upload="beforeUpload"
      :remove="remove"
      @change='uploadChange'
    >
      <a-button> <a-icon type="upload" /> upload </a-button>
    </a-upload>
  </div>
</template>

<script>
var extnames = ['image/jpeg', 'image/png', 'image/jpg']
export default {
  data () {
    return {
      fileList: []
    }
  },
  methods: {
    beforeUpload (file) {
      const isJpgOrPng = extnames.includes(file.type)
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    uploadChange (info) {
      console.log(info)
      if (info.file.status === 'uploading') {
        console.log('uploading')
        this.fileList = info.fileList
      } else if (info.file.status === 'done') {
        console.log('done', this.fileList.length)
        console.log(info.file.response)
        this.$message.success('Success!')
        console.log(this.fileList)
      } else {
        this.$message.error('Error')
      }
    },
    remove (info) {
      this.fileList.splice(this.fileList.indexOf(info))
    }
  }
}
</script>
<style scoped>
/* tile uploaded pictures */
.upload-list-inline >>> .ant-upload-list-item {
  float: left;
  width: 200px;
  margin-right: 8px;
}
.upload-list-inline >>> .ant-upload-animate-enter {
  animation-name: uploadAnimateInlineIn;
}
.upload-list-inline >>> .ant-upload-animate-leave {
  animation-name: uploadAnimateInlineOut;
}
</style>
