package com.tyordanovv.resource;

import com.tyordanovv.dto.CreateRowRequest;
import com.tyordanovv.dto.PagedResult;
import com.tyordanovv.dto.RowDto;
import com.tyordanovv.service.RowService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.JsonWebToken;

@Path("/api/rows")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RowResource {

    @Inject
    RowService rowService;

    @Inject
    JsonWebToken jwt;

    @GET
    @RolesAllowed("user")
    public Response getRows(
            @QueryParam("offset") @DefaultValue("0") int offset,
            @QueryParam("limit") @DefaultValue("10") int limit
    ) {
        String username = jwt.getName();
        PagedResult<RowDto> result = rowService.fetchAll(username, offset, limit);
        return Response.ok(result).build();
    }

    @POST
    @RolesAllowed("user")
    public Response createRow(@Valid CreateRowRequest request) {
        String username = jwt.getName();
        RowDto created = rowService.create(request, username);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }
}