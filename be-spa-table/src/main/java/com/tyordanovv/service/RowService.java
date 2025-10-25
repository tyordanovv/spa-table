package com.tyordanovv.service;

import com.tyordanovv.dto.CreateRowRequest;
import com.tyordanovv.dto.PagedResult;
import com.tyordanovv.dto.RowDto;
import com.tyordanovv.entity.RowEntity;
import com.tyordanovv.mapper.RowMapper;
import com.tyordanovv.repo.RowRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class RowService {

    @Inject
    RowRepository repo;

    public PagedResult<RowDto> fetchAll(String username, int offset, int limit) {
        List<RowDto> rows = repo.findByUsername(username, offset, limit).stream()
                .map(RowMapper::toDto)
                .collect(Collectors.toList());
        long total = repo.countByUsername(username);
        boolean hasMore = offset + rows.size() < total;

        return new PagedResult<>(rows, hasMore);
    }

    @Transactional
    public RowDto create(CreateRowRequest req, String createdBy) {
        RowEntity e = RowMapper.fromCreate(req, createdBy);
        repo.persist(e);
        repo.flush();
        return RowMapper.toDto(e);
    }
}