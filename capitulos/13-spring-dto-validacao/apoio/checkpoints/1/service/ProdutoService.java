package br.com.gestorpro.api.service;

import java.time.LocalDateTime;
import br.com.gestorpro.api.dto.ProdutoRequestDTO;
import br.com.gestorpro.api.dto.ProdutoResponseDTO;
import br.com.gestorpro.api.mapper.ProdutoMapper;
import br.com.gestorpro.api.model.Produto;
import br.com.gestorpro.api.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProdutoService {
    private final ProdutoRepository repository;

    public ProdutoResponseDTO cadastrar(ProdutoRequestDTO dto) {
        Produto produto = ProdutoMapper.toEntity(dto);
        produto.setCriadoEm(LocalDateTime.now());
        Produto salvo = repository.save(produto);
        return ProdutoMapper.toResponse(salvo);
    }
}
