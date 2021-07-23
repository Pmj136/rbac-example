package com.pmj.api.controller;


import cn.dev33.satoken.annotation.SaCheckPermission;
import com.pmj.api.entity.Role;
import com.pmj.api.service.impl.RoleServiceImpl;
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
@RequestMapping("v1/role")
public class RoleController {
    @Resource
    private RoleServiceImpl roleService;

    @PostMapping("/add")
    @SaCheckPermission("role:add")
    public Result add(@RequestBody Role role) {
        return roleService.add(role);
    }

    @DeleteMapping("/del")
    @SaCheckPermission("role:del")
    public Result del(@RequestParam Integer pk) {
        return roleService.del(pk);
    }

    @PutMapping("/edit")
    @SaCheckPermission("role:edit")
    public Result edit(@RequestBody Role role) {
        return roleService.edit(role);
    }

    @GetMapping("/list")
    @SaCheckPermission("role:list")
    public Result getList() {
        return roleService.getList();
    }
}

