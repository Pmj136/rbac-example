package com.pmj.api.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import com.pmj.api.entity.Role;
import com.pmj.api.mapper.RoleMapper;
import com.pmj.api.service.IRoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pmj.api.util.Result;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.time.LocalDateTime;


/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author 彭明久
 * @since 2021-07-18
 */
@Service
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements IRoleService {

    @Override
    public Result add(Role role) {
        role.setCreateId(StpUtil.getLoginIdAsInt());
        role.setCreateAt(LocalDateTime.now());
        return Result.resolve(save(role));
    }

    @Override
    public Result del(Integer roleId) {
        boolean b = removeById(roleId);
        if (b) return Result.resolve(true, "删除成功");
        return Result.resolve(false, "删除失败");
    }

    @Override
    public Result edit(Role role) {
        return Result.resolve(updateById(role));
    }

    @Override
    public Result getList() {
        return Result.resolve(baseMapper.getList());
    }
}
