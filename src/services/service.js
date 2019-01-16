import config from "./config";
import {
  get,
  getUrl,
  postJson,
  postForm,
  postFormData,
  jointUrl,
  jointUrlPost
} from "./http";

// 方法前用户 _ 或者 $ 开头

/**
 * user
 * @param {} param
 */

export function _getOftenGoods(params) {
  return get('/pos/oftenGoods', params)
}

export function _getTypeGoods(params) {
  return get('/pos/type0Goods',params)
}
