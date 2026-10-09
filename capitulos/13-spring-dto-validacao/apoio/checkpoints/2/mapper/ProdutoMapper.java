package br.com.gestorpro.api.mapper;

import br.com.gestorpro.api.dto.ProdutoRequestDTO;
import br.com.gestorpro.api.dto.ProdutoResponseDTO;
import br.com.gestorpro.api.model.Produto;

public class ProdutoMapper {
    public static Produto toEntity(ProdutoRequestDTO dto) {
        Produto produto = new Produto();
        produto.setNome(dto.nome());
        produto.setPreco(dto.preco());
        produto.setEstoque(dto.estoque());
        produto.setCategoria(dto.categoria());
        return produto;
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
