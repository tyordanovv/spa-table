package com.tyordanovv.resource;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import io.smallrye.jwt.build.Jwt;

import java.util.Map;

import static com.tyordanovv.util.Constants.*;
import static javax.management.timer.Timer.ONE_DAY;

@Path("/api/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {
    @POST
    @Path("/login")
    public Response login(Credentials credentials) {
        if (USERNAME.equals(credentials.username) && PASSWORD.equals(credentials.password)) {
            try {
                String token = Jwt.issuer("http://localhost:8080")
                        .upn(USERNAME)
                        .subject(USERNAME)
                        .groups(USER_GROUP)
                        .expiresIn(ONE_DAY)
                        .sign();

                return Response.ok(Map.of("token", token)).build();
            } catch (Exception e) {
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                        .entity(Map.of("error", "Token generation failed: " + e.getMessage()))
                        .build();
            }
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