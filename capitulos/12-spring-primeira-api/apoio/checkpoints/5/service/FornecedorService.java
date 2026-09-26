package br.com.gestorpro.api.service;

import java.util.List;
import java.util.Optional;
import br.com.gestorpro.api.model.Fornecedor;
import br.com.gestorpro.api.repository.FornecedorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FornecedorService {
    private final FornecedorRepository repository;

    public Fornecedor cadastrar(Fornecedor fornecedor) {
        return repository.save(fornecedor);
    }

    public List<Fornecedor> listar() {
        return repository.findAll();
    }

    public Optional<Fornecedor> buscar(Long id) {
        return repository.findById(id);
    }

    public Fornecedor atualizar(Long id, Fornecedor fornecedor) {
        fornecedor.setId(id);
        return repository.save(fornecedor);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}
