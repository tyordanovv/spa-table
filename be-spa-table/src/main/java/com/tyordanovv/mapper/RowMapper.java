package com.tyordanovv.mapper;

import com.tyordanovv.dto.CreateRowRequest;
import com.tyordanovv.dto.RowDto;
import com.tyordanovv.entity.RowEntity;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

public class RowMapper {
    private static final DateTimeFormatter ISO = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

    public static RowDto toDto(RowEntity e) {
        return new RowDto(e.getId(), e.getNumber(), e.getSelector(), e.getText());
    }

    public static RowEntity fromCreate(CreateRowRequest request, String username) {
        return RowEntity
                .builder()
                .number(request.number())
                .selector(request.selector())
                .text(request.text())
                .createdBy(username)
                .createdAt(OffsetDateTime.now())
                .build();
    }
}