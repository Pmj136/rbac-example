package com.pmj.api.service.impl;

import com.pmj.api.dto.RewriteDto;
import com.pmj.api.entity.Perm;
import com.pmj.api.entity.RolePerm;
import com.pmj.api.mapper.PermMapper;
import com.pmj.api.mapper.RolePermMapper;
import com.pmj.api.service.IRolePermService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pmj.api.util.CommonUtil;
import com.pmj.api.util.Result;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.LinkedList;
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
public class RolePermServiceImpl extends ServiceImpl<RolePermMapper, RolePerm> implements IRolePermService {

    @Resource
    private PermMapper permMapper;

    @Override
    public Result getList(Integer roleId) {
        List<Perm> allPerms = permMapper.selectAll();
        List<Perm> treeData = CommonUtil.list2tree(allPerms);

        List<Perm> hasPerms = baseMapper.getPermByRoleId(roleId);
        List<String> checkedKeys = getCheckedKeys(CommonUtil.list2tree(hasPerms));

        HashMap<String, Object> map = new HashMap<>();
        map.put("treeData", treeData);
        map.put("checkedKeys", checkedKeys);

        return Result.resolve(map);
    }

    @Override
    @Transactional
    public Result edit(RewriteDto<RolePerm> dto) {
        removeById(dto.getId());
        saveBatch(dto.getRows());
        return Result.resolve(true, "更新成功");
    }

    private List<String> getCheckedKeys(List<Perm> list) {
        List<String> ret = new LinkedList<>();
        for (Perm p : list) {
            if (p.getChildren() == null) {
                ret.add(p.getId()+"");
            } else {
                ret.addAll(getCheckedKeys(p.getChildren()));
            }
        }
        return ret;
    }
}
