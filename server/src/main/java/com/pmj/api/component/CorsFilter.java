package com.pmj.api.component;

import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

/**
 * @author 彭明久
 * @since 2021-03-19
 */
@Component
public class CorsFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        HttpServletResponse resp = (HttpServletResponse) servletResponse;
        String[] allowDomains = {
                "http://localhost:3000",
                "http://rbac.pmj136.top"
        };
        String originHeads = req.getHeader("Origin");
        if (Arrays.asList(allowDomains).contains(originHeads))
            resp.setHeader("Access-Control-Allow-Origin", originHeads);
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        resp.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
        resp.setHeader("Access-Control-Max-Age", "3600");
        resp.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
        filterChain.doFilter(servletRequest, servletResponse);
    }
}