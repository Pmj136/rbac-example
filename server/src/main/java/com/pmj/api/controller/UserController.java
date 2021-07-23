package com.pmj.api.controller;


import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import com.pmj.api.entity.User;
import com.pmj.api.service.impl.UserServiceImpl;
import com.pmj.api.util.Result;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author 彭明久
 * @since 2021-07-18
 */
@RestController
@RequestMapping("/v1/user")
public class UserController {
    @Resource
    private UserServiceImpl userService;

    @PostMapping("/login")
    public Result login(String account, String password) {
        return userService.login(account, password);
    }

    @GetMapping("/permission")
    @SaCheckLogin
    public Result getPermission() {
        return userService.getPermission();
    }

    @PostMapping("/add")
    @SaCheckPermission("user:add")
    public Result add(@RequestBody User user) {
        return userService.add(user);
    }

    @DeleteMapping("/del")
    @SaCheckPermission("user:del")
    public Result del(Integer id) {
        return userService.del(id);
    }

    @PutMapping("/edit")
    @SaCheckPermission("user:edit")
    public Result edit(@RequestBody User user) {
        return userService.edit(user);
    }

    @GetMapping("/list")
    @SaCheckPermission("user:list")
    public Result list() {
        return userService.getList();
    }


}

