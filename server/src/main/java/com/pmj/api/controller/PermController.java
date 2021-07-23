package com.pmj.api.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import com.pmj.api.entity.Perm;
import com.pmj.api.service.impl.PermServiceImpl;
import com.pmj.api.util.Result;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author 彭明久
 * @since 2021-07-18
 */
@RestController
@RequestMapping("v1/permission")
@SaCheckLogin
public class PermController {
    @Resource
    private PermServiceImpl permService;

    /*新增权限*/
    @PostMapping("/add")
    @SaCheckPermission("permission:add")
    public Result add(@RequestBody Perm perm) {
        return permService.add(perm);
    }

    /*删除权限*/
    @DeleteMapping("/del")
    @SaCheckPermission("permission:del")
    public Result del(@RequestParam Integer pk) {
        return permService.del(pk);
    }

    /*更新权限*/
    @PutMapping("/edit")
    @SaCheckPermission("permission:edit")
    public Result edit(@RequestBody Perm perm) {
        return permService.edit(perm);
    }

    /*权限列表*/
    @GetMapping("/list")
    @SaCheckPermission("permission:list")
    public Result getList() {
        return permService.getList();
    }

    @GetMapping("/menu")
    public Result getMenu(){
        return permService.getMenu();
    }

    @GetMapping("/search")
    public Result search(@RequestParam String keyword,
                         @RequestParam(required = false) String type) {
        return permService.search(keyword, type);
    }

    @PutMapping("/updateSort")
    public Result updateSort(@RequestBody List<Perm> list) {
        return permService.updateSort(list);
    }

}

