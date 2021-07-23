package com.pmj.api.controller;


import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import com.pmj.api.dto.RewriteDto;
import com.pmj.api.entity.UserRole;
import com.pmj.api.service.impl.UserRoleServiceImpl;
import com.pmj.api.util.Result;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 彭明久
 * @since 2021-07-18
 */
@RestController
@RequestMapping("v1/user-role")
@SaCheckLogin
public class UserRoleController {

    @Resource
    private UserRoleServiceImpl userRoleService;

    @GetMapping("/list")
    public Result getList(@RequestParam Integer userId){
        return userRoleService.getList(userId);
    }

    @PutMapping("/edit")
    @SaCheckPermission("user-role:edit")
    public Result rewrite(@RequestBody RewriteDto<UserRole> dto){
        return userRoleService.rewrite(dto);
    }
}

