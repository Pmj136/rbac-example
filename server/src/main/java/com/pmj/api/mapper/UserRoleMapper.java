package com.pmj.api.mapper;

import com.pmj.api.entity.UserRole;
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
public interface UserRoleMapper extends BaseMapper<UserRole> {

    List<UserRole> getList(Integer userId);
}
