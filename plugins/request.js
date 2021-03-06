'use strict';

function getError(option, xhr) {
  var msg = 'cannot post ' + option.action + ' ' + xhr.status + '\'';
  var err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = option.action;
  return err;
}

function getBody(xhr) {
  var text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

function upload(option, onSuccess) {
  if (typeof XMLHttpRequest === 'undefined') {
    return;
  }

  var xhr = new XMLHttpRequest();
  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      // 图片上传进度条
      // if (e.total > 0) {
      //   e.percent = e.loaded / e.total * 100;
      // }
      // option.onProgress(e);
    };
  }

  var formData = new FormData();

  if (option.data) {
    Object.keys(option.data).map(function (key) {
      formData.append(key, option.data[key]);
    });
  }

  formData.append(option.filename, option.file);

  xhr.onerror = function error(e) {
    option.onError(e);
  };

  xhr.onload = function onload() {
    if (xhr.status !== 200) {
      return option.onError(getError(option, xhr), getBody(xhr));
    }

    onSuccess(getBody(xhr));
  };

  xhr.open('post', option.action, true);

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  var headers = option.headers || {};
  for (var h in headers) {
    if (headers.hasOwnProperty(h)) {
      xhr.setRequestHeader(h, headers[h]);
    }
  }
  xhr.send(formData);
}

export default upload