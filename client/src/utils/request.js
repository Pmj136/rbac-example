import axios from "axios";
import Qs from "qs"
import NProgress from "nprogress";
import "nprogress/nprogress.css"
import {message, Modal} from "antd";
import {ContentType} from "./contants";

message.config({
    top: 80,
    duration: 2,
})
const service = axios.create({
    baseURL: process.env.REACT_APP_BASEURL+'/v1',
    timeout: 5000,
    withCredentials: true
})

service.interceptors.request.use(
    config => {
        NProgress.start();
        const {headers, data} = config
        if (headers['Content-Type'] === ContentType.FORM_URLENCODED) {
            config.data = Qs.stringify(data)
        }
        // config.headers['Authorization'] = get("token")
        return config
    },
    error => {
        NProgress.done()
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        NProgress.done()
        if (response.status === 200) {
            const {code, msg} = response.data
            if (code > 400) {
                // if (code === 403) {
                //     store.dispatch(clearUser())
                // }
                message.warning(msg)
                return Promise.reject(response.data)
            }
            return response.data
            // if (code === 4000) {
            //     clear()
            //     return Promise.reject("认证失败")
            // }
        }
        Modal.error({
            title: "服务异常"
        })
        return Promise.reject("服务异常")
    },
    error => {
        Modal.error({
            title: "网络请求错误"
        })
        NProgress.done()
        return Promise.reject(error)
    }
)

export default service