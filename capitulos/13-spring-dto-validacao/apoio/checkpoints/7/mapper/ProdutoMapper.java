package com.gestorpro.api.mapper;

import com.gestorpro.api.dto.ProdutoRequestDTO;
import com.gestorpro.api.dto.ProdutoResponseDTO;
import com.gestorpro.api.model.Produto;

public class ProdutoMapper {

    public static Produto toEntity(ProdutoRequestDTO dto) {
        Produto produto = new Produto();
        atualizar(produto, dto);
        return produto;
    }

    public static void atualizar(Produto produto, ProdutoRequestDTO dto) {
        produto.setNome(dto.nome());
        produto.setPreco(dto.preco());
        produto.setEstoque(dto.estoque());
        produto.setCategoria(dto.categoria());
    }

    public static ProdutoResponseDTO toResponse(Produto produto) {
        return new ProdutoResponseDTO(
                produto.getId(),
                produto.getNome(),
                produto.getPreco(),
                produto.getEstoque(),
                produto.getCategoria(),
                produto.getCriadoEm()
        );
    }
}
