package com.pmj.api.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 
 * </p>
 *
 * @author 彭明久
 * @since 2021-07-18
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("t_role_perm")
public class RolePerm implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "role_id", type = IdType.INPUT)
    private Integer roleId;

    private Integer permId;

}
