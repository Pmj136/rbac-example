package com.pmj.api.service;

import com.pmj.api.dto.RewriteDto;
import com.pmj.api.entity.RolePerm;
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
public interface IRolePermService extends IService<RolePerm> {

    Result getList(Integer roleId);

    Result edit(RewriteDto<RolePerm> dto);
}
