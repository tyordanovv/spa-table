package com.tyordanovv.filter;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.ext.Provider;
import java.io.IOException;

@Provider
public class CorsFilter implements ContainerResponseFilter {

    @Override
    public void filter(ContainerRequestContext requestContext,
                       ContainerResponseContext responseContext) throws IOException {

        responseContext.getHeaders().add("Access-Control-Allow-Origin", "http://localhost:3000");
        responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
        responseContext.getHeaders().add("Access-Control-Allow-Headers", "authorization,content-type,accept,origin,x-requested-with");
        responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,HEAD");
        responseContext.getHeaders().add("Access-Control-Expose-Headers", "authorization,content-type");

        // Handle preflight requests
        if ("OPTIONS".equals(requestContext.getMethod())) {
            responseContext.getHeaders().add("Access-Control-Max-Age", "86400");
        }
    }
}