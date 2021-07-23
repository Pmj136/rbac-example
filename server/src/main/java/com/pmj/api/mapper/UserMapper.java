package com.pmj.api.mapper;

import com.pmj.api.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author 彭明久
 * @since 2021-07-18
 */
public interface UserMapper extends BaseMapper<User> {

    User findUserByAccount(String account);
}
