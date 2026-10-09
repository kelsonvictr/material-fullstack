package br.com.gestorpro.api.service;

import java.util.List;
import br.com.gestorpro.api.dto.ClienteRequestDTO;
import br.com.gestorpro.api.dto.ClienteResponseDTO;
import br.com.gestorpro.api.mapper.ClienteMapper;
import br.com.gestorpro.api.model.Cliente;
import br.com.gestorpro.api.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class ClienteService {
    private final ClienteRepository repository;

    public ClienteResponseDTO cadastrar(ClienteRequestDTO dto) {
        Cliente cliente = ClienteMapper.toEntity(dto);
        Cliente salvo = repository.save(cliente);
        return ClienteMapper.toResponse(salvo);
    }

    public List<ClienteResponseDTO> listar() {
        List<Cliente> clientes = repository.findAll();
        return clientes.stream()
                .map(cliente -> ClienteMapper.toResponse(cliente))
                .toList();
    }

    public ClienteResponseDTO buscar(Long id) {
        Cliente cliente = buscarOuFalhar(id);
        return ClienteMapper.toResponse(cliente);
    }

    public ClienteResponseDTO atualizar(Long id, ClienteRequestDTO dto) {
        Cliente cliente = buscarOuFalhar(id);
        ClienteMapper.atualizar(cliente, dto);
        Cliente salvo = repository.save(cliente);
        return ClienteMapper.toResponse(salvo);
    }

    public void excluir(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado");
        }
        repository.deleteById(id);
    }

    private Cliente buscarOuFalhar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Cliente não encontrado"));
    }
}
