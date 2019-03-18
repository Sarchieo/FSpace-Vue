<template>
  <div class="certificates-box">
    <div class="certificates-content">
        <h2 class="pharmacy-info">药店信息</h2>
        <a-form
          :form="form"
          @submit="handleSubmit"
        >
        <!-- 表单元素 -->

        <h2 class="certificate-title">药店资质</h2>
        <div class="photo-box">
          <div class="business-license">
             <a-upload
                name="avatar"
                listType="picture-card"
                class="avatar-uploader"
                :showUploadList="false"
                action="//jsonplaceholder.typicode.com/posts/"
                :beforeUpload="beforeUpload"
                @change="handleChange"
              >
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
          </div>
          <div class="management">
            <a-upload
                name="avatar"
                listType="picture-card"
                class="avatar-uploader"
                :showUploadList="false"
                action="//jsonplaceholder.typicode.com/posts/"
                :beforeUpload="beforeUpload"
                @change="handleChange"
              >
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
          </div>
          <div>
            <a-upload
                name="avatar"
                listType="picture-card"
                class="avatar-uploader"
                :showUploadList="false"
                action="//jsonplaceholder.typicode.com/posts/"
                :beforeUpload="beforeUpload"
                @change="handleChange"
              >
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
          </div>
        </div>
        <p class="certificate-text">
          <span>营业执照</span>
          <span>药品经营许可证</span>
          <span>GSP证书</span>
        </p>
        <p class="certificate-fill">
          <span>(必填)</span>
          <span>(必填)</span>
          <span>(必填)</span>
        </p>
        <button class="save-btn">保存提交</button>
        </a-form>
    </div>
  </div>
</template>
<script>
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
    data() {
        return {
            loading: false,
            imageUrl: '',
            options: [{
                    value: 'zhejiang',
                    label: 'Zhejiang',
                    children: [{
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [{
                        value: 'xihu',
                        label: 'West Lake',
                    }],
                    }],
                }, {
                    value: 'jiangsu',
                    label: 'Jiangsu',
                    children: [{
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [{
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    }],
                    }],
                }]
                    }
    },
    methods: {
      onChange(value) {
        console.log(value);
      },
       handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style scoped lang="less">
@import "../../../components/fspace-ui/container/index.less";
@import "../../../components/fspace-ui/button/index.less";
 .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  .certificates-box {
    .container-size(block,985px,1015px,0,0px);
    padding: 40px 0;
    .certificates-content {
     .container-size(block,730px,935px,0 auto,0px);
     .pharmacy-info {
       .p-size(60px,60px,20px,left,0px,#333333);
     }
     .photo-box {
        .container-size(inline-block,730px,345px,0,0px);
        div {
          .container-size(inline-block,210px,280px,0,0px);
          .position(relative,0px,0px);
          float:left;
        }
        .business-license,.management {
            margin-right: 40px;
        }
     }
     .certificate-title {
       .p-size(60px,60px,20px,left,0px,#333333);
     }
     .certificate-text {
       .p-size(50px,50px,20px,center,0px,#333333);
       span {
         .container-size(inline-block,239px,50px,0,0px);
       }
     }
     .certificate-fill {
        .p-size(50px,50px,16px,center,0px,#ed3025);
       span {
         .container-size(inline-block,239px,50px,0,0px);
       }
     }
     .save-btn {
       .button-display(block, 15px auto 0 auto);
       .button-size (120px,48px,48px,18px,0px,5px);
       .button-color(1px solid transparent,#ed3025,#ffffff);
     }
    }
  }
</style>


