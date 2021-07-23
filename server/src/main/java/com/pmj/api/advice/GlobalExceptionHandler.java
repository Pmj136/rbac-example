package com.pmj.api.advice;

import cn.dev33.satoken.exception.NotLoginException;
import cn.dev33.satoken.exception.NotPermissionException;
import com.pmj.api.util.Result;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常捕获
 *
 * @author 彭明久
 * @since 2021-03-19
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
//    @ExceptionHandler({Exception.class})
//    public void handleAllPointerExp(Exception e) {
//        System.out.println(e.getMessage());
//    }

    @ExceptionHandler({NotLoginException.class})
    public Result handleNotLoginExp(Exception e) {
        return Result.reject(403, "请先登录");
    }

    @ExceptionHandler({NotPermissionException.class})
    public Result handleNotPermissionExp(Exception e) {
        return Result.reject(403, "抱歉，你没有此权限");
    }
}
