package br.com.gestorpro.api.controller;

import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import br.com.gestorpro.api.model.Fornecedor;
import br.com.gestorpro.api.service.FornecedorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fornecedores")
@RequiredArgsConstructor
public class FornecedorController {
    private final FornecedorService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Fornecedor cadastrar(@RequestBody Fornecedor fornecedor) {
        return service.cadastrar(fornecedor);
    }

    @GetMapping
    public List<Fornecedor> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Fornecedor buscar(@PathVariable Long id) {
        return service.buscar(id);
    }
}
