package com.gestorpro.api.service;

import com.gestorpro.api.dto.ClienteRequestDTO;
import com.gestorpro.api.dto.ClienteResponseDTO;
import com.gestorpro.api.model.Cliente;
import com.gestorpro.api.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteResponseDTO cadastrar(ClienteRequestDTO dto) {
        Cliente cliente = new Cliente();
        cliente.setNome(dto.nome());
        cliente.setEmail(dto.email());
        cliente.setTelefone(dto.telefone());
        cliente.setCidade(dto.cidade());

        Cliente salvo = clienteRepository.save(cliente);
        return paraResposta(salvo);
    }

    public List<ClienteResponseDTO> listar() {
        List<Cliente> clientes = clienteRepository.findAll();
        return clientes.stream()
                .map(cliente -> paraResposta(cliente))
                .toList();
    }

    public ClienteResponseDTO buscar(Long id) {
        Cliente cliente = buscarOuFalhar(id);
        return paraResposta(cliente);
    }

    public ClienteResponseDTO atualizar(Long id, ClienteRequestDTO dto) {
        Cliente cliente = buscarOuFalhar(id);
        cliente.setNome(dto.nome());
        cliente.setEmail(dto.email());
        cliente.setTelefone(dto.telefone());
        cliente.setCidade(dto.cidade());

        Cliente salvo = clienteRepository.save(cliente);
        return paraResposta(salvo);
    }

    public void excluir(Long id) {
        if (!clienteRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado");
        }
        clienteRepository.deleteById(id);
    }

    private Cliente buscarOuFalhar(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Cliente não encontrado"));
    }

    private ClienteResponseDTO paraResposta(Cliente cliente) {
        return new ClienteResponseDTO(
                cliente.getId(),
                cliente.getNome(),
                cliente.getEmail(),
                cliente.getTelefone(),
                cliente.getCidade()
        );
    }
}
