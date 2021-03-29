/**
 * ajax请求配置
 */
import axios from 'axios'
import apiURL from '@/config/url'
import merge from 'lodash/merge'
import qs from 'qs'
// axios默认配置
axios.defaults.timeout = 10000;   // 超时时间
// console.log("apiURL:" + apiURL);
// axios.defaults.baseURL = apiURL;  // 默认地址

// `transformRequest` 允许在向服务器发送前，修改请求数据
// 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
// 后面的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
// axios.defaults.transformRequest = function (data) {
//     data = JSON.stringify(data);
//     return data;
// };
const http = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})
/**
 * get请求参数处理，添加时间戳保证不使用缓存数据
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
    var defaults = {
        't': new Date().getTime()
    }
    return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
    var defaults = {
        't': new Date().getTime()
    }
    data = openDefultdata ? merge(defaults, data) : data
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default http