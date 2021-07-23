package com.pmj.api.service;

import com.pmj.api.entity.Perm;
import com.baomidou.mybatisplus.extension.service.IService;
import com.pmj.api.util.Result;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 彭明久
 * @since 2021-07-18
 */
public interface IPermService extends IService<Perm> {

    Result add(Perm perm);

    Result del(Integer permId);

    Result edit(Perm perm);

    Result getList();

    Result getMenu();

    Result updateSort(List<Perm> list);

    Result search(String keyword,String type);

}
