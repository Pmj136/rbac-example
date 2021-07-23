package com.pmj.api.mapper;

import com.pmj.api.entity.Perm;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author 彭明久
 * @since 2021-07-18
 */
public interface PermMapper extends BaseMapper<Perm> {
    //查询所有权限
    List<Perm> selectAll();

    //查询所有权限
    List<Perm> selectAll(String type);

    //查询用户的所有权限
    List<Perm> selectByUserId(Object userId);

    //搜索权限
    List<Perm> selectAsSearch(String keyword, String type);

}
