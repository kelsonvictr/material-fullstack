package com.gestorpro.api.dto;

public record ClienteResponseDTO(
        Long id,
        String nome,
        String email,
        String telefone,
        String cidade
) {
}
