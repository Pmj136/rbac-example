package com.pmj.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RewriteDto<T> {
    private Integer id;
    private List<T> rows;
}
