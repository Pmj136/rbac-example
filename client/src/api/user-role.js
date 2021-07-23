import request from "../utils/request";

export function list(params) {
    return request({
        url: "/user-role/list",
        method: "get",
        params
    })
}

export function edit(data) {
    return request({
        url: "/user-role/edit",
        method: "put",
        data
    })
}