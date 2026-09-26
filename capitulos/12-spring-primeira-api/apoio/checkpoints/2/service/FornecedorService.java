package br.com.gestorpro.api.service;

import java.util.List;
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
}
