package com.pmj.api.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pmj.api.entity.Perm;
import com.pmj.api.mapper.PermMapper;
import com.pmj.api.service.IPermService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pmj.api.util.CommonUtil;
import com.pmj.api.util.Result;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author 彭明久
 * @since 2021-07-18
 */
@Service
public class PermServiceImpl extends ServiceImpl<PermMapper, Perm> implements IPermService {

    @Override
    public Result add(Perm perm) {
        Perm one = getOne(new QueryWrapper<Perm>().eq("str", perm.getStr()));
        if (one != null) {
            String msg = "菜单路径重复";
            if ("action".equals(perm.getType())) msg = "资源标识重复";
            return Result.build(201, false, msg);
        }
        boolean b = save(perm);
        if (b)
            return Result.resolve(true, "添加成功");
        return Result.build(201, false, "未作更改");
    }

    @Override
    public Result del(Integer permId) {
        List<Integer> ids = CommonUtil.findRelatedIds(list(), permId);
        boolean b = removeByIds(ids);
        if (b)
            return Result.resolve(true, "删除成功");
        return Result.build(201, false, "未作更改");
    }


    @Override
    public Result edit(Perm perm) {
        boolean b = updateById(perm);
        if (b)
            return Result.resolve(true, "更新成功");
        return Result.build(206, false, "更新失败");
    }

    @Override
    public Result getList() {
        List<Perm> permList = baseMapper.selectAll();
        return Result.resolve(CommonUtil.list2tree(permList));
    }

    @Override
    public Result getMenu() {
        List<Perm> menuList = baseMapper.selectAll("menu");
        return Result.resolve(menuList);
    }

    @Override
    public Result updateSort(List<Perm> list) {
        boolean b = updateBatchById(list);
        return Result.resolve(b);
    }

    @Override
    public Result search(String keyword, String type) {
        List<Perm> perms = baseMapper.selectAsSearch(keyword, type);
        if (type != null)
            return Result.resolve(CommonUtil.list2tree(perms));
        return Result.resolve(perms);
    }
}
