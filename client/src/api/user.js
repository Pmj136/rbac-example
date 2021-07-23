import request from "../utils/request";
import {ContentType} from "../utils/contants";

export function doLogin(data) {
    return request({
        url: "/user/login",
        method: "post",
        headers: {
            'Content-Type': ContentType.FORM_URLENCODED
        },
        data
    })
}

export function getPermission() {
    return request({
        url: "/user/permission",
        method: "get",
    })
}


export function add(data) {
    return request({
        url: "/user/add",
        method: "post",
        data
    })
}

export function del(data) {
    return request({
        url: "/user/del",
        method: "delete",
        headers: {
            'Content-Type': ContentType.FORM_URLENCODED
        },
        data
    })
}

export function edit(data) {
    return request({
        url: "/user/edit",
        method: "put",
        data
    })
}

export function list() {
    return request({
        url: "/user/list",
        method: "get",
    })
}