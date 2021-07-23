package com.pmj.api.component;

import cn.dev33.satoken.stp.StpInterface;
import com.pmj.api.entity.Perm;
import com.pmj.api.mapper.PermMapper;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Component
public class StpInterfaceImpl implements StpInterface {
    @Resource
    private PermMapper permMapper;

    @Override
    public List<String> getPermissionList(Object o, String s) {
        List<Perm> perms = permMapper.selectByUserId(o);
        List<String> list = new ArrayList<>();
        for (Perm p : perms) {
            list.add(p.getStr());
        }
        return list;
    }

    @Override
    public List<String> getRoleList(Object o, String s) {
        return null;
    }
}
