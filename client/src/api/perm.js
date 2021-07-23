import request from "../utils/request";

export function add(data) {
    return request({
        url: "/permission/add",
        method: "post",
        data
    })
}

export function del(pk) {
    return request({
        url: "/permission/del",
        method: "delete",
        params:{
            pk
        }
    })
}

export function edit(data) {
    return request({
        url: "/permission/edit",
        method: "put",
        data
    })
}

export function list() {
    return request({
        url: "/permission/list",
        method: "get",
    })
}

export function getMenu() {
    return request({
        url: "/permission/menu",
        method: "get",
    })
}

export function search(params) {
    return request({
        url: "/permission/search",
        method: "get",
        params
    })
}

export function updateSort(data) {
    return request({
        url: "/permission/updateSort",
        method: "put",
        data
    })
}
