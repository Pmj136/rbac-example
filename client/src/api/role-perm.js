import request from "../utils/request";

export function list(params) {
    return request({
        url: "/role-perm/list",
        method: "get",
        params
    })
}

export function edit(data) {
    return request({
        url: "/role-perm/edit",
        method: "put",
        data
    })
}