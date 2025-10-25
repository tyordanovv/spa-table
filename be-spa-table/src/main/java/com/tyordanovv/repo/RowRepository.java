package com.tyordanovv.repo;

import com.tyordanovv.entity.RowEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.panache.common.Parameters;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class RowRepository implements PanacheRepository<RowEntity> {

    public List<RowEntity> findByUsername(String username, int offset, int limit) {
        return find("#RowEntity.findByUsername", Parameters.with("username", username))
                .range(offset, offset + limit - 1)
                .list();
    }

    public long countByUsername(String username) {
        return find("#RowEntity.findByUsername", Parameters.with("username", username)).count();
    }
}
