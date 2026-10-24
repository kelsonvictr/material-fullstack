package com.gestorpro.api.service;

import com.gestorpro.api.dto.ProdutoRequestDTO;
import com.gestorpro.api.dto.ProdutoResponseDTO;
import com.gestorpro.api.model.Fornecedor;
import com.gestorpro.api.model.Produto;
import com.gestorpro.api.repository.FornecedorRepository;
import com.gestorpro.api.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final FornecedorRepository fornecedorRepository;

    public ProdutoResponseDTO cadastrar(ProdutoRequestDTO dto) {
        Produto produto = new Produto();
        produto.setNome(dto.nome());
        produto.setPreco(dto.preco());
        produto.setEstoque(dto.estoque());
        produto.setCategoria(dto.categoria());
        produto.setFornecedor(buscarFornecedorOuFalhar(dto.fornecedorId()));
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

    public ProdutoResponseDTO buscar(Long id) {
        Produto produto = buscarOuFalhar(id);
        return paraResposta(produto);
    }

    public ProdutoResponseDTO atualizar(Long id, ProdutoRequestDTO dto) {
        Produto produto = buscarOuFalhar(id);
        produto.setNome(dto.nome());
        produto.setPreco(dto.preco());
        produto.setEstoque(dto.estoque());
        produto.setCategoria(dto.categoria());
        produto.setFornecedor(buscarFornecedorOuFalhar(dto.fornecedorId()));

        Produto salvo = produtoRepository.save(produto);
        return paraResposta(salvo);
    }

    public void excluir(Long id) {
        if (!produtoRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado");
        }
        produtoRepository.deleteById(id);
    }

    private Produto buscarOuFalhar(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Produto não encontrado"));
    }

    private Fornecedor buscarFornecedorOuFalhar(Long id) {
        return fornecedorRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Fornecedor não encontrado"));
    }

    private ProdutoResponseDTO paraResposta(Produto produto) {
        return new ProdutoResponseDTO(
                produto.getId(),
                produto.getNome(),
                produto.getPreco(),
                produto.getEstoque(),
                produto.getCategoria(),
                produto.getCriadoEm(),
                produto.getFornecedor().getId(),
                produto.getFornecedor().getNome()
        );
    }
}
