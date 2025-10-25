package com.tyordanovv.service;

import com.tyordanovv.dto.CreateRowRequest;
import com.tyordanovv.dto.PagedResult;
import com.tyordanovv.dto.RowDto;
import com.tyordanovv.entity.RowEntity;
import com.tyordanovv.repo.RowRepository;
import io.quarkus.test.InjectMock;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@QuarkusTest
public class RowServiceUnitTest {

    @Inject
    RowService service;

    @InjectMock
    RowRepository repo;

    @Test
    void fetchAll_shouldReturnPagedResult_andComputeHasMoreCorrectly() {
        RowEntity e1 = RowEntity
                .builder()
                .id(1L)
                .number(1L)
                .selector("Option1")
                .text("Test1")
                .build();

        RowEntity e2 = RowEntity
                .builder()
                .id(2L)
                .number(2L)
                .selector("Option2")
                .text("Test2")
                .build();

        when(repo.findByUsername(eq("user1"), eq(0), eq(10)))
                .thenReturn(List.of(e1, e2));
        when(repo.countByUsername(eq("user1")))
                .thenReturn(12L);

        PagedResult<RowDto> result = service.fetchAll("user1", 0, 10);

        assertThat(result.items()).hasSize(2);
        assertThat(result.items().get(0).number()).isEqualTo(1L);
        assertThat(result.hasMore()).isTrue(); // 12 - 10 > 0 -> true

        verify(repo).findByUsername("user1", 0, 10);
        verify(repo).countByUsername("user1");
    }

    @Test
    void create_shouldPersistRowAndReturnDto() {
        CreateRowRequest req = new CreateRowRequest(5L, "Option1  ", "  Test");

        doAnswer(invocation -> {
            RowEntity entity = invocation.getArgument(0);
            entity.setId(99L);
            return null;
        }).when(repo).persist(any(RowEntity.class));

        RowDto dto = service.create(req, "admin");

        assertThat(dto.id()).isEqualTo(99L);
        assertThat(dto.number()).isEqualTo(5);
        assertThat(dto.selector()).isEqualTo("Option1");
        assertThat(dto.text()).isEqualTo("Test");

        verify(repo).persist(any(RowEntity.class));
        verify(repo).flush();
    }
}
