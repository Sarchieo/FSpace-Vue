<template>
  <div class="certificates-box">
    <div class="certificates-content">
        <h2 class="pharmacy-info">药店信息</h2>
        <a-form
        class="form-box"
          :form="form"
          @submit="handleSubmit"
        >
          <a-form-item
            label="所属药店："
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-input
              v-decorator="[
                'storeName',
                {rules: [{ required: true, message: '请填写营业执照上一致的药店名!' }]}
              ]"
            />
          </a-form-item>
          <a-form-item
            label="省市区"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-cascader :options="options" @change="onChange" placeholder="请选择省市区" class="city"  v-decorator="[
                    'addressCode',
                    {rules: [{ required: true, message: '请选择省市区' }]}
                  ]"/>
          </a-form-item>
          <a-form-item
                label="药店详细地址："
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-textarea
                placeholder="请填写营业执照上一致的药店地址"
                  v-decorator="[
                    'address',
                    {rules: [{ required: true, message: '请填写药店详细地址' }]}
                  ]"
                />
          </a-form-item>
          <p class="authentication">认证状态: <a-icon type="profile" /> <span>{{ authenticationMessage }}</span>  </p>
          <h2 class="certificate-title">药店资质</h2>
          <a-form-item
            v-bind="formItemLayout"
            class="upload"
          >
            <div class="dropbox">
             <a-upload
              v-decorator="[
               'businessImg',
               { rules: [{ required: true, message: '请上传营业执照' }] }
              ]"
              name="avatar"
              :headers= headers
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              action="http://192.168.1.145:8080/upload"
              :beforeUpload="beforeUpload"
              @change="handleChange"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">营业执照</div>
              </div>
            </a-upload>
            </div>
          </a-form-item>
          <a-form-item
          class="upload"
            v-bind="formItemLayout"
          >
            <a-upload
              v-decorator="[
               'GSPImg',
               { rules: [{ required: true, message: '请上传药品经营许可证' }] }
              ]"
              name="avatar"
              :headers= headers
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              action="http://192.168.1.145:8080/upload"
              :beforeUpload="beforeUpload"
              @change="handleChange"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">药品经营许可证</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item
          class="upload"
            v-bind="formItemLayout"
          >
            <div class="dropbox">
               <a-upload
                v-decorator="[
                'DrugImg',
                { rules: [{ required: true, message: '请上传GSP认证' }] }
                ]"
                name="avatar"
                :headers= headers
                listType="picture-card"
                class="avatar-uploader"
                :showUploadList="false"
                action="http://192.168.1.145:8080/upload"
                :beforeUpload="beforeUpload"
                @change="handleChange"
              >
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">GSP认证</div>
              </div>
              </a-upload>
            </div>
          </a-form-item>
          <!-- <button class="save-btn">保存</button> -->
          <a-form-item
            :wrapper-col="{ span: 12, offset: 6 }"
          >
            <a-button
              class="save-btn"
              html-type="submit"
            >
              保存
            </a-button>
          </a-form-item>
        </a-form>
        <ul class="user-info">
          <li class="two-line">
            <a-checkbox checked>已设置</a-checkbox>
            <span>登录密码</span>
            <p>安全性高的密码可以使账号更安全。建议您定期更换密码，且设置一个包含数字和字母，并长度超过6位以上的密码</p>
            <a class="one-updata">修改</a>
          </li>
          <li class="one-line">
            <a-checkbox checked>已设置</a-checkbox>
            <span>手机绑定</span>
            <p>绑定手机后，您即可享受丰富的手机服务，如手机找回密码等。</p>
            <a>修改</a>
          </li>
          <li class="one-line">
            <a-checkbox checked>已设置</a-checkbox>
            <span>所属药店</span>
            <p>加入药店通过资质认证后可享受平台丰富的优惠活动</p>
            <a>修改</a>
          </li>
        </ul>
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
  computed: {
    storeInfo () {
      return this.$store.state.user;
    },
  },
  watch: {
    storeInfo (val) {
      this.form.setFieldsValue(val);
    }
  },
  data() {
      return {
        businessImg: '',
        GSPImg: '',
        DrugImg: '',
        authenticationMessage: '',
        headers: {
          "specify-path": "/2/536862982/",
          "specify-filename": "1.jpg"
        },
        storeName: '',
        addressCode: '',
        address: '',
        uploadInfo: {},
        isSeting: true,
        formItemLayout: {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        },
        form: this.$form.createForm(this),
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
  mounted() {
    // this.getBasicInfo()
  },
  methods: {
    fileServerInfo() {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "InformationModule";
      iRequest.method = "fileServerInfo";
      this.$refcallback(
        "userServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            console.log(result)
            if(result.code === 200) {
              _this.uploadInfo = map
            }else {
              // 文件地址获取失败 .

            }
          }
        )
      );
    },
    getBasicInfo(values) {
      let _this = this;
      let iRequest = new inf.IRequest();
      iRequest.cls = "InformationModule";
      iRequest.method = "basicInfo";
      iRequest.param.token = localStorage.getItem("identification")
      this.$refcallback(
        "userServer",
        iRequest,
        new this.$iceCallback(
          function result(result) {
            if(result.code === 200) {
              _this.$store.dispatch('setUser', result.data)
              _this.form.setFieldsValue(result.data)
              _this.authenticationMessage = result.data.authenticationMessage
            }else {
            }
          }
        )
      );
    },
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
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let _this = this;
          let iRequest = new inf.IRequest();
          iRequest.cls = "StoreManageModule";
          iRequest.method = "updateStoreInfo";
          iRequest.param.token = localStorage.getItem("identification")
          iRequest.param.json = JSON.stringify({
            storeName: '红牛旗舰店',
            addressCode: 100000,
            address: '红牛企业广场',
            longitude: 0,
            latitude: 0
          })
          this.$refcallback(
            "userServer",
            iRequest,
            new this.$iceCallback(
              function result(result) {
                if(result.code === 200) {
                  console.log(result)
                }else {
                  // 文件地址获取失败 .

                }
              }
            )
          );
        }
      });
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M
    },
    normFile  (e) {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },
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
        .container-size(inline-block,730px,170px,0,0px);
        .adress {
          width: 200px;
          text-align: left!important;
        }
        div {
          .container-size(inline-block,150px,150px,0,0px);
          .position(relative,0px,0px);
          float:left;
        }
        .business-license,.management {
            margin-right: 130px;
        }
     }
     .certificate-title {
       .p-size(60px,60px,20px,left,0px,#333333);
       margin-bottom: 10px;
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
       .button-size(120px,48px,48px,18px,0px,5px);
       .button-color(1px solid transparent,#ed3025,#ffffff);
     }
    }
  }
  .ant-form-item-label {
    text-align: left!important;
  }
  .authentication {
    font-size: 16px;
    span {
      color: #3189f5;
    }
  }
  .user-info {
     .container-size(inline-block,730px,325px,0,0px);
     li{
       .container-size(inline-block,730px,108px,0,0px);
        border-top: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        padding:　0　18px!important;
        p{
          .container-size(inline-block,450px,auto,0 40px 0 45px,0px);
        }
     }
     .one-line{
       line-height: 100px;
     }
     .two-line{
       line-height: 37px;
       .one-updata{
         .position(relative,0px,86px);
       }
       p{
         .position(relative,17px,45px);
         margin: 0;
         height: auto;
         }
     }
  }
  .ant-input{
     border: 1px solid #e0e0e0;
     border-radius: 0px!important;
   }
   .city {
    width:305px;
    border: 1px solid #e0e0e0;
   }
   .ant-upload.ant-upload-drag p.ant-upload-drag-icon .anticon{
     color: #999999;
   }
   .upload {
     display: inline-block;
     width: 240px;
     height: 200px;
   }
</style>


