package br.com.gestorpro.api.service;

import java.time.LocalDateTime;
import java.util.List;
import br.com.gestorpro.api.dto.ProdutoRequestDTO;
import br.com.gestorpro.api.dto.ProdutoResponseDTO;
import br.com.gestorpro.api.mapper.ProdutoMapper;
import br.com.gestorpro.api.model.Produto;
import br.com.gestorpro.api.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    public List<ProdutoResponseDTO> listar() {
        List<Produto> produtos = repository.findAll();
        return produtos.stream()
                .map(produto -> ProdutoMapper.toResponse(produto))
                .toList();
    }

    public ProdutoResponseDTO buscar(Long id) {
        Produto produto = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Produto não encontrado"));
        return ProdutoMapper.toResponse(produto);
    }
}
