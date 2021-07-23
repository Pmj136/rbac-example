package com.pmj.api.service.impl;

import cn.dev33.satoken.secure.SaSecureUtil;
import cn.dev33.satoken.stp.StpUtil;
import com.pmj.api.entity.Perm;
import com.pmj.api.entity.User;
import com.pmj.api.mapper.PermMapper;
import com.pmj.api.mapper.UserMapper;
import com.pmj.api.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pmj.api.util.CommonUtil;
import com.pmj.api.util.Result;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;


/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author 彭明久
 * @since 2021-07-18
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

    @Resource
    private PermMapper permMapper;

    @Override
    public Result login(String account, String password) {
        User user = baseMapper.findUserByAccount(account);
        if (user == null) return Result.reject(403, "用户名或密码有误");

        if (!getSecurityPwd(password).equals(user.getPwd()))
            return Result.reject(403, "用户名或密码有误");
        StpUtil.login(user.getId());
        Map<String, Object> map = new HashMap<>();
        map.put("info",user);

        List<Perm> perms = permMapper.selectByUserId(user.getId());
        map.put("perms",resolvePerm(perms));

        return Result.resolve(map);
    }


    @Override
    public Result getPermission() {
        int userId = StpUtil.getLoginIdAsInt();
        List<Perm> perms = permMapper.selectByUserId(userId);
        return Result.resolve(resolvePerm(perms));
    }



    public Map<String, Object> resolvePerm(List<Perm> perms) {
        Map<String, Object> map = new HashMap<>();
        List<String> actions = new LinkedList<>();
        List<String> menus = new LinkedList<>();
        List<Perm> menu = new LinkedList<>();

        for (Perm p:perms){
            if("action".equals(p.getType())){
                actions.add(p.getStr());
            }
            if("menu".equals(p.getType())){
                menus.add(p.getStr());
                menu.add(p);
            }
        }

        map.put("actions", actions);
        map.put("menus",menus);
        map.put("menuTree", CommonUtil.list2tree(menu));
        return map;
    }

    @Override
    public Result add(User user) {
        user.setPwd(getSecurityPwd(user.getPwd()));
        user.setCreateAt(LocalDateTime.now());
        return Result.resolve(save(user));
    }

    @Override
    public Result del(Integer id) {
        return Result.resolve(removeById(id));
    }

    @Override
    public Result edit(User user) {
        user.setPwd(getSecurityPwd(user.getPwd()));
        return Result.resolve(updateById(user));
    }

    @Override
    public Result getList() {
        return Result.resolve(list());
    }


    private String getSecurityPwd(String pwd) {
        return SaSecureUtil.md5BySalt(pwd, "xp_01_auth");
    }
}
