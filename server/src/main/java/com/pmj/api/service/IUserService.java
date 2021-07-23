package com.pmj.api.service;

import com.pmj.api.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;
import com.pmj.api.util.Result;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 彭明久
 * @since 2021-07-18
 */
public interface IUserService extends IService<User> {
    Result login(String account, String password);

    Result getPermission();

    Result add(User user);

    Result del(Integer id);

    Result edit(User user);

    Result getList();

}
