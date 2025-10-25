package com.tyordanovv.dto;

import java.util.List;

public record PagedResult<T>(
        List<T> items,
        boolean hasMore
) {}