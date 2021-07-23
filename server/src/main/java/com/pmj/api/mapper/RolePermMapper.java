package com.pmj.api.mapper;

import com.pmj.api.entity.Perm;
import com.pmj.api.entity.RolePerm;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author 彭明久
 * @since 2021-07-18
 */
public interface RolePermMapper extends BaseMapper<RolePerm> {
    List<Perm> getPermByRoleId(Integer roleId);
}
