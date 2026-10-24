package com.gestorpro.api.service;

import com.gestorpro.api.dto.ProdutoRequestDTO;
import com.gestorpro.api.dto.ProdutoResponseDTO;
import com.gestorpro.api.model.Produto;
import com.gestorpro.api.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoResponseDTO cadastrar(ProdutoRequestDTO dto) {
        Produto produto = new Produto();
        produto.setNome(dto.nome());
        produto.setPreco(dto.preco());
        produto.setEstoque(dto.estoque());
        produto.setCategoria(dto.categoria());
        produto.setCriadoEm(LocalDateTime.now());

        Produto salvo = produtoRepository.save(produto);
        return new ProdutoResponseDTO(
                salvo.getId(),
                salvo.getNome(),
                salvo.getPreco(),
                salvo.getEstoque(),
                salvo.getCategoria(),
                salvo.getCriadoEm()
        );
    }
}
