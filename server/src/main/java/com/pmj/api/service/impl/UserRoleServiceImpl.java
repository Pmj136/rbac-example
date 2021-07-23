package com.pmj.api.service.impl;

import com.pmj.api.dto.RewriteDto;
import com.pmj.api.entity.UserRole;
import com.pmj.api.mapper.RoleMapper;
import com.pmj.api.mapper.UserRoleMapper;
import com.pmj.api.service.IUserRoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pmj.api.util.Result;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;


/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author 彭明久
 * @since 2021-07-18
 */
@Service
public class UserRoleServiceImpl extends ServiceImpl<UserRoleMapper, UserRole> implements IUserRoleService {

    @Resource
    private RoleMapper roleMapper;

    @Override
    public Result getList(Integer userId) {
        HashMap<String, Object> map = new HashMap<>();
        map.put("allRoles", roleMapper.getList());
        map.put("hasRoles", baseMapper.getList(userId));
        return Result.resolve(map);
    }

    @Override
    public Result rewrite(RewriteDto<UserRole> dto) {
        removeById(dto.getId());
        saveBatch(dto.getRows());
        return Result.resolve(true, "更新成功");
    }
}
