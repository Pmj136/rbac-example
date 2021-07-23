package com.pmj.api.service;

import com.pmj.api.entity.Role;
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
public interface IRoleService extends IService<Role> {
    Result add(Role role);
    Result del(Integer roleId);
    Result edit(Role role);
    Result getList();
}
