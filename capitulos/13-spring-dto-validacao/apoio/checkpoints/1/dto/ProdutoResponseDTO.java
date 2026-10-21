package com.gestorpro.api.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ProdutoResponseDTO(
        Long id,
        String nome,
        BigDecimal preco,
        Integer estoque,
        String categoria,
        LocalDateTime criadoEm
) {
}
