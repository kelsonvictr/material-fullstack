package br.com.gestorpro.api.service;

import java.util.Optional;
import java.util.List;
import br.com.gestorpro.api.model.Fornecedor;
import br.com.gestorpro.api.repository.FornecedorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class FornecedorService {
    private final FornecedorRepository repository;

    public Fornecedor cadastrar(Fornecedor fornecedor) {
        validarNome(fornecedor);
        fornecedor.setId(null);
        return repository.save(fornecedor);
    }

    private void validarNome(Fornecedor fornecedor) {
        if (fornecedor.getNome() == null || fornecedor.getNome().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Informe o nome");
        }
    }

    public List<Fornecedor> listar() {
        return repository.findAll();
    }

    public Fornecedor buscar(Long id) {
        Optional<Fornecedor> resultado = repository.findById(id);
        if (resultado.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Fornecedor não encontrado");
        }
        return resultado.get();
    }
}
