package com.gestorpro.api.service;

import com.gestorpro.api.dto.ProdutoRequestDTO;
import com.gestorpro.api.dto.ProdutoResponseDTO;
import com.gestorpro.api.model.Produto;
import com.gestorpro.api.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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
        return paraResposta(salvo);
    }

    public List<ProdutoResponseDTO> listar() {
        List<Produto> produtos = produtoRepository.findAll();
        return produtos.stream()
                .map(produto -> paraResposta(produto))
                .toList();
    }

    private ProdutoResponseDTO paraResposta(Produto produto) {
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
