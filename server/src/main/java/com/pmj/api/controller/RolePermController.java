package com.pmj.api.controller;


import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import com.pmj.api.dto.RewriteDto;
import com.pmj.api.entity.RolePerm;
import com.pmj.api.service.impl.RolePermServiceImpl;
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
@RequestMapping("v1/role-perm")
@SaCheckLogin
public class RolePermController {
    @Resource
    private RolePermServiceImpl rolePermService;

    @GetMapping("/list")
    public Result getList(@RequestParam Integer roleId) {
        return rolePermService.getList(roleId);
    }

    @PutMapping("/edit")
    @SaCheckPermission("role-perm:edit")
    public Result edit(@RequestBody RewriteDto<RolePerm> dto){
        return rolePermService.edit(dto);
    }
}

