package com.tyordanovv.resource;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.JsonWebToken;
import io.smallrye.jwt.build.Jwt;
import java.util.HashMap;
import java.util.Map;

import java.util.Map;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    private static final String USERNAME = "user";
    private static final String PASSWORD = "password";

    @POST
    @Path("/login")
    public Response login(Credentials credentials) {
        if (USERNAME.equals(credentials.username) && PASSWORD.equals(credentials.password)) {
            // Build JWT
            String token = JWT.issuer("http://localhost:8080")
                    .upn(USERNAME)
                    .groups("user")
                    .sign();

            Map<String, Object> resp = new HashMap<>();
            resp.put("token", token);
            Map<String, String> user = new HashMap<>();
            user.put("id", "1");
            user.put("username", USERNAME);
            resp.put("user", user);

            return Response.ok(resp).build();
        }
        return Response.status(Response.Status.UNAUTHORIZED)
                .entity(Map.of("error", "Invalid username or password"))
                .build();
    }

    public static class Credentials {
        public String username;
        public String password;
    }
}