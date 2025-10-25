package com.tyordanovv.dto;

public record RowDto(
        Long id,
        Long number,
        String selector,
        String text
) {}