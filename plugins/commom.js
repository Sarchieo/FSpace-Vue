
import Vue from 'vue'
var fsGeneralMethods = {
  install(Vue){
    Vue.prototype.fsGeneralMethods = {
      /**
       * 批量新增图片
       * @param {*} context 实例
       * @param {*} arr 需批量新增的列表
       * @param {*} skuName sku字段名称
       * @param {*} spuName spu字段名称
       * @param {*} imageType 图片尺寸
       */
      addImgages(context, arr, skuName, spuName, imageType) {
        if(!arr && arr.length === 0) {
          return
        }
        imageType = imageType || '200x200'
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
                      "-" + imageType +".jpg"
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
