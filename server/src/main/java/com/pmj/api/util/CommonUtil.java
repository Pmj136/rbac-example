package com.pmj.api.util;

import com.pmj.api.entity.Perm;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class CommonUtil {
    public static List<Perm> list2tree(List<Perm> list) {
        List<Perm> tree = new LinkedList<>();
        Map<Integer, Perm> map = new HashMap<>();
        for (Perm p : list) {
            map.put(p.getId(), p);
        }
        for (Perm p : list) {
            Perm o = map.get(p.getParentId());
            if (o != null) {
                List<Perm> cl = o.getChildren();
                if (cl == null) cl = new LinkedList<>();
                cl.add(p);
                o.setChildren(cl);
            } else {
                tree.add(p);
            }
        }
        return tree;
    }

    public static List<Integer> findRelatedIds(List<Perm> list, Integer permId) {
        return _findRelatedIds(CommonUtil.list2tree(list), permId);
    }

    public static List<Integer> _findRelatedIds(List<Perm> list, Integer permId) {
        List<Integer> ids = new LinkedList<>();
        for (Perm p : list) {
            Integer pid = p.getParentId();
            if (pid.equals(permId) || (pid == 0 && permId.equals(p.getId()))) {
                ids.add(p.getId());
                if (p.getChildren() != null) {
                    ids.addAll(findRelatedIds(p.getChildren(), p.getId()));
                }
                continue;
            }
            if (p.getChildren() != null) {
                ids.addAll(findRelatedIds(p.getChildren(), permId));
            }
        }
        return ids;
    }
}
