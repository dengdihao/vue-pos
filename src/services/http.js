import axios from "axios";
import * as qs from "querystring";
import config from "./config";

import Loading from "../components/loading/Loading";

let instance = axios.create({
  baseURL: config.baseURL, // api 的base_url
  timeout: 15000 // 请求时间
});

// 添加请求拦截器
instance.interceptors.request.use(
  request => {
    // 在发送请求之前做些什么
    Loading.open();
    return request;
  },
  error => {
    // 对请求错误做些什么
    // Loading.close();
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    Loading.close();
    return response;
  },
  error => {
    // 对响应错误做点什么
    // Loading.close();
    return Promise.reject(error);
  }
);

// GET 请求
export function get(url, body = {}, config = {}) {
  config.params = body;
  return instance.get(url, config);
}

// POST 请求
export function postJson(url, body = {}, config = {}) {
  return instance.post(url, body, config);
}

// POST 表单请求
export function postForm(url, body = {}, config = {}) {
  return instance.post(url, qs.stringify(body), config);
}

// POST 文件上传
export function postFormData(url, body = {}, config = {}) {
  let f = new FormData();
  Object.entries(body).forEach(data => {
    f.append(...data);
  });
  return instance.post(url, f, config);
}

// 截取URL
export function getUrl(url, body = {}) {
  let search = qs.stringify(body);
  if (search) {
    return config.baseURL + url + "?" + search;
  }
  return config.baseURL + url;
}

// /case/admin/caseUpdate/:case_id/:case_type
// 处理类似的接口
// GET方法
export function jointUrl(url, urls, body = {}, config = {}) {
  url = restful(url, urls);
  config.params = body;
  return instance.get(url, config);
}

// /case/admin/caseUpdate/:case_id/:case_type
// 处理类似的接口
// POST方法
export function jointUrlPost(url, urls, body = {}, config = {}) {
  url = restful(url, urls);
  return instance.post(url, body, config);
}

// restful 处理函数
function restful(url, body = {}) {
  let urls = url.split(/\//);
  return urls.reduce((a, b) => {
    if (b.indexOf(":") === 0) {
      return a + `/${body[b.substr(1)]}`;
    }
    return a + "/" + b;
  });
}
