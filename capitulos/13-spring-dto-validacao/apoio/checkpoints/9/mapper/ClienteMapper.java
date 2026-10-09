package br.com.gestorpro.api.mapper;

import br.com.gestorpro.api.dto.ClienteRequestDTO;
import br.com.gestorpro.api.dto.ClienteResponseDTO;
import br.com.gestorpro.api.model.Cliente;

public class ClienteMapper {
    public static Cliente toEntity(ClienteRequestDTO dto) {
        Cliente cliente = new Cliente();
        atualizar(cliente, dto);
        return cliente;
    }

    public static void atualizar(Cliente cliente, ClienteRequestDTO dto) {
        cliente.setNome(dto.nome());
        cliente.setEmail(dto.email());
        cliente.setTelefone(dto.telefone());
        cliente.setCidade(dto.cidade());
    }

    public static ClienteResponseDTO toResponse(Cliente cliente) {
        return new ClienteResponseDTO(
                cliente.getId(),
                cliente.getNome(),
                cliente.getEmail(),
                cliente.getTelefone(),
                cliente.getCidade()
        );
    }
}
