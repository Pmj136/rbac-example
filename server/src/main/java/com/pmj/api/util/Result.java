package com.pmj.api.util;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
public class Result implements Serializable {
    private Integer code;
    private Object data;
    private String msg;

    public static Result build(Integer code, Object data, String msg) {
        return new Result(code, data, msg);
    }

    public static Result resolve(Object data) {
        return new Result(200, data, "success");
    }

    public static Result resolve(Object data, String msg) {
        return new Result(200, data, msg);
    }

    public static Result reject(Integer code, String msg) {
        return new Result(code, null, msg);
    }


}