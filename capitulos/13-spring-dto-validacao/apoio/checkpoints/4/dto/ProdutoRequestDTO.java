package com.gestorpro.api.dto;

import java.math.BigDecimal;

public record ProdutoRequestDTO(
        String nome,
        BigDecimal preco,
        Integer estoque,
        String categoria
) {
}
