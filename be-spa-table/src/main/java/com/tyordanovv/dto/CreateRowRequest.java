package com.tyordanovv.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateRowRequest(
        Long number,
        @NotBlank @Size(max = 255) String selector,
        @NotBlank @Size(max = 2048) String text
) {
    public CreateRowRequest {
        if (selector != null) selector = selector.trim();
        if (text != null) text = text.trim();
    }
}