package com.tyordanovv.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Entity
@Table(name = "rows")
@Getter
@Setter
@Builder
@NamedQueries({
        @NamedQuery(name = "RowEntity.findByUsername",
                query = "SELECT r FROM RowEntity r WHERE r.createdBy = :username ORDER BY r.createdAt DESC")
})
public class RowEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "number_value", nullable = false)
    private Long number;

    @Column(name = "selector", nullable = false)
    private String selector;

    @Column(name = "text", nullable = false, length = 2048)
    private String text;

    @Column(name = "created_by", nullable = false, updatable = false) // this should be relation to user table
    private String createdBy;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();
}