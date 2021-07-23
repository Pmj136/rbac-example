import request from "../utils/request";

export function add(data) {
    return request({
        url: "/role/add",
        method: "post",
        data
    })
}

export function del(pk) {
    return request({
        url: "/role/del",
        method: "delete",
        params:{
            pk
        }
    })
}
export function edit(data) {
    return request({
        url: "/role/edit",
        method: "put",
        data
    })
}
export function list() {
    return request({
        url: "/role/list",
        method: "get",
    })
}
//
// export function search(params) {
//     return request({
//         url: "/perm/search",
//         method: "get",
//         params
//     })
// }