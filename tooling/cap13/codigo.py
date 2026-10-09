"""Fonte única do código Java do Cap 13.

Cada etapa lista só os arquivos que mudam nela; o estado da etapa N é a soma das etapas 1..N.
`build-cap13.py` usa este módulo para gerar os checkpoints, os ZIPs e os blocos de código do HTML.
Nunca edite o código direto no HTML ou nos checkpoints: edite aqui e rode o build.
"""

PACOTE = 'br/com/gestorpro/api/'

# ───────────────────────── Etapa 1 · POST com DTO ─────────────────────────
PRODUTO_1 = '''package br.com.gestorpro.api.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "produtos")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal preco;

    @Column(nullable = false)
    private Integer estoque;

    private String categoria;

    @Column(nullable = false)
    private LocalDateTime criadoEm;
}
'''

PRODUTO_REPOSITORY = '''package br.com.gestorpro.api.repository;

import br.com.gestorpro.api.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
'''

REQUEST_1 = '''package br.com.gestorpro.api.dto;

import java.math.BigDecimal;

public record ProdutoRequestDTO(
        String nome,
        BigDecimal preco,
        Integer estoque,
        String categoria
) {
}
'''

RESPONSE_1 = '''package br.com.gestorpro.api.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ProdutoResponseDTO(
        Long id,
        String nome,
        BigDecimal preco,
        Integer estoque,
        String categoria,
        LocalDateTime criadoEm
) {
}
'''

MAPPER_1 = '''package br.com.gestorpro.api.mapper;

import br.com.gestorpro.api.dto.ProdutoRequestDTO;
import br.com.gestorpro.api.dto.ProdutoResponseDTO;
import br.com.gestorpro.api.model.Produto;

public class ProdutoMapper {
    public static Produto toEntity(ProdutoRequestDTO dto) {
        Produto produto = new Produto();
        produto.setNome(dto.nome());
        produto.setPreco(dto.preco());
        produto.setEstoque(dto.estoque());
        produto.setCategoria(dto.categoria());
        return produto;
    }

    public static ProdutoResponseDTO toResponse(Produto produto) {
        return new ProdutoResponseDTO(
                produto.getId(),
                produto.getNome(),
                produto.getPreco(),
                produto.getEstoque(),
                produto.getCategoria(),
                produto.getCriadoEm()
        );
    }
}
'''

SERVICE_1 = '''package br.com.gestorpro.api.service;

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
'''

CONTROLLER_1 = '''package br.com.gestorpro.api.controller;

import br.com.gestorpro.api.dto.ProdutoRequestDTO;
import br.com.gestorpro.api.dto.ProdutoResponseDTO;
import br.com.gestorpro.api.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/produtos")
@RequiredArgsConstructor
public class ProdutoController {
    private final ProdutoService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProdutoResponseDTO cadastrar(@RequestBody ProdutoRequestDTO dto) {
        return service.cadastrar(dto);
    }
}
'''

# ───────────────────────── Etapa 2 · GET lista ─────────────────────────
SERVICE_2 = '''package br.com.gestorpro.api.service;

import java.time.LocalDateTime;
import java.util.List;
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

    public List<ProdutoResponseDTO> listar() {
        List<Produto> produtos = repository.findAll();
        return produtos.stream()
                .map(produto -> ProdutoMapper.toResponse(produto))
                .toList();
    }
}
'''

CONTROLLER_2 = '''package br.com.gestorpro.api.controller;

import java.util.List;
import br.com.gestorpro.api.dto.ProdutoRequestDTO;
import br.com.gestorpro.api.dto.ProdutoResponseDTO;
import br.com.gestorpro.api.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/produtos")
@RequiredArgsConstructor
public class ProdutoController {
    private final ProdutoService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProdutoResponseDTO cadastrar(@RequestBody ProdutoRequestDTO dto) {
        return service.cadastrar(dto);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ProdutoResponseDTO> listar() {
        return service.listar();
    }
}
'''

# ───────────────────────── Etapa 3 · GET por ID (404) ─────────────────────────
SERVICE_3 = '''package br.com.gestorpro.api.service;

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
'''

CONTROLLER_3 = CONTROLLER_2.replace(
    'import org.springframework.web.bind.annotation.GetMapping;\n',
    'import org.springframework.web.bind.annotation.GetMapping;\nimport org.springframework.web.bind.annotation.PathVariable;\n'
).replace('''        return service.listar();
    }
}
''', '''        return service.listar();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProdutoResponseDTO buscar(@PathVariable Long id) {
        return service.buscar(id);
    }
}
''')

# ───────────────────────── Etapa 4 · PUT ─────────────────────────
MAPPER_4 = '''package br.com.gestorpro.api.mapper;

import br.com.gestorpro.api.dto.ProdutoRequestDTO;
import br.com.gestorpro.api.dto.ProdutoResponseDTO;
import br.com.gestorpro.api.model.Produto;

public class ProdutoMapper {
    public static Produto toEntity(ProdutoRequestDTO dto) {
        Produto produto = new Produto();
        atualizar(produto, dto);
        return produto;
    }

    public static void atualizar(Produto produto, ProdutoRequestDTO dto) {
        produto.setNome(dto.nome());
        produto.setPreco(dto.preco());
        produto.setEstoque(dto.estoque());
        produto.setCategoria(dto.categoria());
    }

    public static ProdutoResponseDTO toResponse(Produto produto) {
        return new ProdutoResponseDTO(
                produto.getId(),
                produto.getNome(),
                produto.getPreco(),
                produto.getEstoque(),
                produto.getCategoria(),
                produto.getCriadoEm()
        );
    }
}
'''

SERVICE_4 = '''package br.com.gestorpro.api.service;

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
        Produto produto = buscarOuFalhar(id);
        return ProdutoMapper.toResponse(produto);
    }

    public ProdutoResponseDTO atualizar(Long id, ProdutoRequestDTO dto) {
        Produto produto = buscarOuFalhar(id);
        ProdutoMapper.atualizar(produto, dto);
        Produto salvo = repository.save(produto);
        return ProdutoMapper.toResponse(salvo);
    }

    private Produto buscarOuFalhar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Produto não encontrado"));
    }
}
'''

CONTROLLER_4 = CONTROLLER_3.replace(
    'import org.springframework.web.bind.annotation.PostMapping;\n',
    'import org.springframework.web.bind.annotation.PostMapping;\nimport org.springframework.web.bind.annotation.PutMapping;\n'
).replace('''        return service.buscar(id);
    }
}
''', '''        return service.buscar(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProdutoResponseDTO atualizar(@PathVariable Long id, @RequestBody ProdutoRequestDTO dto) {
        return service.atualizar(id, dto);
    }
}
''')

# ───────────────────────── Etapa 5 · DELETE ─────────────────────────
SERVICE_5 = SERVICE_4.replace('''    private Produto buscarOuFalhar(Long id) {''', '''    public void excluir(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado");
        }
        repository.deleteById(id);
    }

    private Produto buscarOuFalhar(Long id) {''')

CONTROLLER_5 = CONTROLLER_4.replace(
    'import org.springframework.http.HttpStatus;\n',
    'import org.springframework.http.HttpStatus;\nimport org.springframework.web.bind.annotation.DeleteMapping;\n'
).replace('''        return service.atualizar(id, dto);
    }
}
''', '''        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}
''')

# ───────────────────────── Etapa 6 · Validação ─────────────────────────
REQUEST_6 = '''package br.com.gestorpro.api.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public record ProdutoRequestDTO(
        @NotBlank(message = "O nome é obrigatório")
        String nome,

        @NotNull(message = "O preço é obrigatório")
        @Positive(message = "O preço deve ser maior que zero")
        BigDecimal preco,

        @NotNull(message = "O estoque é obrigatório")
        @PositiveOrZero(message = "O estoque não pode ser negativo")
        Integer estoque,

        String categoria
) {
}
'''

CONTROLLER_6 = CONTROLLER_5.replace(
    'import br.com.gestorpro.api.service.ProdutoService;\n',
    'import br.com.gestorpro.api.service.ProdutoService;\nimport jakarta.validation.Valid;\n'
).replace('@RequestBody ProdutoRequestDTO dto', '@RequestBody @Valid ProdutoRequestDTO dto')

# ───────────────────────── Etapa 7 · Tratador de erros ─────────────────────────
TRATADOR = '''package br.com.gestorpro.api.exception;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class TratadorDeErros {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> tratarValidacao(MethodArgumentNotValidException erro) {
        Map<String, String> erros = new HashMap<>();
        for (FieldError campo : erro.getBindingResult().getFieldErrors()) {
            erros.put(campo.getField(), campo.getDefaultMessage());
        }
        return erros;
    }
}
'''

# ───────────────────────── Etapa 8 · Produto → Fornecedor ─────────────────────────
PRODUTO_8 = PRODUTO_1.replace(
    'import jakarta.persistence.Id;\n',
    'import jakarta.persistence.Id;\nimport jakarta.persistence.JoinColumn;\nimport jakarta.persistence.ManyToOne;\n'
).replace('''    @Column(nullable = false)
    private LocalDateTime criadoEm;
}
''', '''    @Column(nullable = false)
    private LocalDateTime criadoEm;

    @ManyToOne
    @JoinColumn(name = "fornecedor_id", nullable = false)
    private Fornecedor fornecedor;
}
''')

REQUEST_8 = REQUEST_6.replace('''        String categoria
) {''', '''        String categoria,

        @NotNull(message = "O fornecedor é obrigatório")
        Long fornecedorId
) {''')

RESPONSE_8 = RESPONSE_1.replace('''        LocalDateTime criadoEm
) {''', '''        LocalDateTime criadoEm,
        Long fornecedorId,
        String fornecedorNome
) {''')

MAPPER_8 = MAPPER_4.replace('''                produto.getCriadoEm()
        );''', '''                produto.getCriadoEm(),
                produto.getFornecedor().getId(),
                produto.getFornecedor().getNome()
        );''')

SERVICE_8 = '''package br.com.gestorpro.api.service;

import java.time.LocalDateTime;
import java.util.List;
import br.com.gestorpro.api.dto.ProdutoRequestDTO;
import br.com.gestorpro.api.dto.ProdutoResponseDTO;
import br.com.gestorpro.api.mapper.ProdutoMapper;
import br.com.gestorpro.api.model.Fornecedor;
import br.com.gestorpro.api.model.Produto;
import br.com.gestorpro.api.repository.FornecedorRepository;
import br.com.gestorpro.api.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class ProdutoService {
    private final ProdutoRepository repository;
    private final FornecedorRepository fornecedorRepository;

    public ProdutoResponseDTO cadastrar(ProdutoRequestDTO dto) {
        Produto produto = ProdutoMapper.toEntity(dto);
        produto.setFornecedor(buscarFornecedorOuFalhar(dto.fornecedorId()));
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
        Produto produto = buscarOuFalhar(id);
        return ProdutoMapper.toResponse(produto);
    }

    public ProdutoResponseDTO atualizar(Long id, ProdutoRequestDTO dto) {
        Produto produto = buscarOuFalhar(id);
        ProdutoMapper.atualizar(produto, dto);
        produto.setFornecedor(buscarFornecedorOuFalhar(dto.fornecedorId()));
        Produto salvo = repository.save(produto);
        return ProdutoMapper.toResponse(salvo);
    }

    public void excluir(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado");
        }
        repository.deleteById(id);
    }

    private Produto buscarOuFalhar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Produto não encontrado"));
    }

    private Fornecedor buscarFornecedorOuFalhar(Long id) {
        return fornecedorRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Fornecedor não encontrado"));
    }
}
'''

# ───────────────────────── Etapa 9 · Cliente (gabarito do aluno) ─────────────────────────
CLIENTE = '''package br.com.gestorpro.api.model;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "clientes")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String email;

    private String telefone;
    private String cidade;
}
'''

CLIENTE_REPOSITORY = '''package br.com.gestorpro.api.repository;

import br.com.gestorpro.api.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
'''

CLIENTE_REQUEST = '''package br.com.gestorpro.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ClienteRequestDTO(
        @NotBlank(message = "O nome é obrigatório")
        String nome,

        @NotBlank(message = "O e-mail é obrigatório")
        @Email(message = "Informe um e-mail válido")
        String email,

        String telefone,
        String cidade
) {
}
'''

CLIENTE_RESPONSE = '''package br.com.gestorpro.api.dto;

public record ClienteResponseDTO(
        Long id,
        String nome,
        String email,
        String telefone,
        String cidade
) {
}
'''

CLIENTE_MAPPER = '''package br.com.gestorpro.api.mapper;

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
'''

CLIENTE_SERVICE = '''package br.com.gestorpro.api.service;

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
'''

CLIENTE_CONTROLLER = (CONTROLLER_6
    .replace('ProdutoRequestDTO', 'ClienteRequestDTO')
    .replace('ProdutoResponseDTO', 'ClienteResponseDTO')
    .replace('ProdutoService', 'ClienteService')
    .replace('ProdutoController', 'ClienteController')
    .replace('"/produtos"', '"/clientes"'))

ETAPAS = {
    1: {'model/Produto.java': PRODUTO_1, 'repository/ProdutoRepository.java': PRODUTO_REPOSITORY,
        'dto/ProdutoRequestDTO.java': REQUEST_1, 'dto/ProdutoResponseDTO.java': RESPONSE_1,
        'mapper/ProdutoMapper.java': MAPPER_1, 'service/ProdutoService.java': SERVICE_1,
        'controller/ProdutoController.java': CONTROLLER_1},
    2: {'service/ProdutoService.java': SERVICE_2, 'controller/ProdutoController.java': CONTROLLER_2},
    3: {'service/ProdutoService.java': SERVICE_3, 'controller/ProdutoController.java': CONTROLLER_3},
    4: {'mapper/ProdutoMapper.java': MAPPER_4, 'service/ProdutoService.java': SERVICE_4,
        'controller/ProdutoController.java': CONTROLLER_4},
    5: {'service/ProdutoService.java': SERVICE_5, 'controller/ProdutoController.java': CONTROLLER_5},
    6: {'dto/ProdutoRequestDTO.java': REQUEST_6, 'controller/ProdutoController.java': CONTROLLER_6},
    7: {'exception/TratadorDeErros.java': TRATADOR},
    8: {'model/Produto.java': PRODUTO_8, 'dto/ProdutoRequestDTO.java': REQUEST_8,
        'dto/ProdutoResponseDTO.java': RESPONSE_8, 'mapper/ProdutoMapper.java': MAPPER_8,
        'service/ProdutoService.java': SERVICE_8},
    9: {'model/Cliente.java': CLIENTE, 'repository/ClienteRepository.java': CLIENTE_REPOSITORY,
        'dto/ClienteRequestDTO.java': CLIENTE_REQUEST, 'dto/ClienteResponseDTO.java': CLIENTE_RESPONSE,
        'mapper/ClienteMapper.java': CLIENTE_MAPPER, 'service/ClienteService.java': CLIENTE_SERVICE,
        'controller/ClienteController.java': CLIENTE_CONTROLLER},
}

NOMES_ETAPAS = {1: 'POST', 2: 'GET lista', 3: 'GET por ID', 4: 'PUT', 5: 'DELETE',
                6: 'Validação', 7: 'Tratador de erros', 8: 'Produto → Fornecedor', 9: 'Cliente'}

# A partir da etapa 6 o pom.xml ganha a validação; a partir da 7, o properties ganha a mensagem do 404.
DEPENDENCIA_VALIDACAO = '''		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-validation</artifactId>
		</dependency>
'''
PROPRIEDADE_MENSAGEM = 'spring.web.error.include-message=always\n'


def estado(n):
    """Arquivos Java (caminho relativo ao pacote) depois da etapa n."""
    atual = {}
    for etapa in range(1, n + 1):
        atual.update(ETAPAS[etapa])
    return atual


def pom(pom_inicial, n):
    if n < 6:
        return pom_inicial
    ancora = '''		<dependency>
			<groupId>org.postgresql</groupId>'''
    assert ancora in pom_inicial
    return pom_inicial.replace(ancora, DEPENDENCIA_VALIDACAO + ancora, 1)


def properties(props_inicial, n):
    return props_inicial if n < 7 else props_inicial + PROPRIEDADE_MENSAGEM
