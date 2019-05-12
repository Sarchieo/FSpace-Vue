
import Vue from 'vue'
var fsGeneralMethods = {
  install(Vue) {
    Vue.prototype.fsGeneralMethods = {
       /**
       * 接口调用
       * @param {*} context 实例
       * @param {*} serverName 服务名
       * @param {*} cls 模块名
       * @param {*} method 方法名
       * @param {*} params json对象
       * @param {*} arr 数组
       */
      request(context,serverName, cls, method, params, arr) {
        console.log('模块名<' + cls + '>  方法名:<' + method + '>调用参数:' + JSON.stringify(params || {}))
        return new Promise((resolve, reject) => {
          if(serverName && serverName === 'orderServer') {
            serverName +=  Math.floor((context.storeInfo.comp.storeId / 8192) % 65535)
          }
          let iRequest = new inf.IRequest();
          iRequest.cls = cls;
          iRequest.method = method;
          iRequest.param.json = JSON.stringify(params || {});
          iRequest.param.arrays = arr || []
          iRequest.param.token = localStorage.getItem("identification") || ""; // Fingerprintjs2 设备指纹采集器生成
          context.$refcallback(
            context,
            serverName,
            iRequest,
            new context.$iceCallback(
              function result(result) {
                // 权限判断
                // 错误提示
                // 消息上线
                if(result.flag && context.$store.state.userStatus) {
                  let ice_callback = new Ice.Class(inf.PushMessageClient, {
                    receive: function(message, current) {
                      try{
                        let result = JSON.parse(message)
                      } catch(err){
                        context.$store
                          .dispatch("setNoticeList", { message: message.replace('sys:', '') })
                          .then(res => {
                            
                          })
                          .catch(err => {
                            console.log(err);
                          });
                      }
                    }
                  })
                  // websocket 上线
                  context.$initIceLong('orderServer', context.storeInfo.comp.storeId, new ice_callback());
                }
                resolve(result)
              },
              function error(e) {
                // 异常上传
                reject(e)
              }
            )
          );
        })
      },
      /**
       * 批量新增图片
       * @param {*} context 实例
       * @param {*} arr 需批量新增的列表
       * @param {*} skuName sku字段名称
       * @param {*} spuName spu字段名称
       * @param {*} imageType 图片尺寸
       * @param {*} isCache 是否浏览器缓存图片
       */
      addImages(context, arr, skuName, spuName, imageType, isCache) {
        if (!arr || arr.length === 0) {
          return
        }
        imageType = imageType || '200x200'
        isCache = isCache || true
        let _this = context;
        let iRequest = new inf.IRequest();
        iRequest.cls = "FileInfoModule";
        iRequest.method = "fileServerInfo";
        iRequest.param.token = localStorage.getItem("identification");
        let list = [];
        arr.forEach(c => {
          list.push({
            sku: c[skuName],
            spu: c[spuName]
          });
        });
        iRequest.param.json = JSON.stringify({
          list: list
        });
        context.$refcallback(
          context,
          "globalServer",
          iRequest,
          new context.$iceCallback(
            function result(result) {
              if (result.code === 200) {
                result.data.goodsFilePathList.forEach((c, index, list) => {
                  _this.$set(
                    arr[index],
                    "imgURl",
                    result.data.downPrev +
                    c +
                    "/" +
                    arr[index][skuName] +
                    "-" + imageType + ".jpg" +
                    '?' + Math.round(Math.random() * 10)
                  );
                });
              }
            }
          )
        );
      }
    }
  }
}

Vue.use(fsGeneralMethods);
