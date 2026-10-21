package com.gestorpro.api.service;

import com.gestorpro.api.dto.ProdutoRequestDTO;
import com.gestorpro.api.dto.ProdutoResponseDTO;
import com.gestorpro.api.mapper.ProdutoMapper;
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
        Produto produto = ProdutoMapper.toEntity(dto);
        produto.setCriadoEm(LocalDateTime.now());
        Produto salvo = produtoRepository.save(produto);
        return ProdutoMapper.toResponse(salvo);
    }
}
