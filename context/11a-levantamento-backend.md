# Levantamento — Material Java existente no workspace (agente Explore, 2026-09-03)

(Resumo executivo; ver BRIEF.md §8 para as consequências.)

## Achado principal
Não existe nenhum material "Java do zero / OO básico" no workspace (zero `public static void main`). O capítulo novo entra em terreno virgem.

## (A) backend-fullstack — stack e sequência
- Java 21 (Corretto/Temurin) · IntelliJ IDEA (exclusivo) · Maven · Spring Initializr · group/artifact `br.com.sistemagestao`/`api` → pacote `br.com.sistemagestao.api` · deps Spring Web, Data JPA, PostgreSQL, Lombok, Validation · PostgreSQL via Docker + DBeaver · Insomnia.
- Sequência do aluno: tour de banco (Docker/DBeaver/SQL) → overview → arquitetura (pizzaria, seringa 💉) → setup Initializr → Fornecedor: model (@Entity + Lombok) → repository (interface vazia "já funciona 🪄") → service (@Autowired de campo, void, List, Optional, throw) → controller → Produto (DTO record, Mapper, interface+Impl, @RequiredArgsConstructor+final, streams/lambda, enum, BigDecimal, @ManyToOne) → Cliente.
- A PRIMEIRA linha de Java que o aluno escreve na vida é `Fornecedor.java` com `@Entity` e Lombok.

## Conceitos ASSUMIDOS sem explicação (o cap novo cobre)
package/import · class vs interface · private + tipos (wrappers Long/Integer) · getters/setters (usados à mão em Service/Mapper) · construtor (só como efeito do Lombok) · new · genéricos <> · static (Mapper.toEntity) · final (@RequiredArgsConstructor) · void/tipo de retorno · throw new · anotação como categoria sintática · null/NPE · encadeamento a.getB().getC().

## Conceitos ENSINADOS pelo backend (o cap novo NÃO cobre)
camadas · injeção de dependência · @Entity/ORM (ficha de cadastro 🗂️) · Repository (arquivista) · Service (gerente) · Controller (recepcionista) · Optional (caixa de presente) · DTO · record (antes/depois) · Mapper (tradutor) · interface+Impl (cardápio × cozinha) · Bean Validation (segurança da porta) · @RequiredArgsConstructor+final · lambda/stream (esteira 🏭) · enum · @ManyToOne/@OneToOne · BigDecimal vs double (meme 0.1+0.2).

## Entidades (backend)
Fornecedor: nomeFantasia, cnpj, email, telefonePrincipal, telefoneSecundario, endereco(@OneToOne). Produto: nome, descricao, preco(BigDecimal), quantidadeEstoque(Integer), categoria(enum), fornecedor(@ManyToOne). Cliente: nomeCompleto, cpf, email, telefone, dataNascimento(LocalDate), endereco. Endereco: cep, logradouro, numero, complemento, bairro, cidade, uf.

## Código-alvo (o "dia 1" e o estado final)
```java
@NoArgsConstructor @AllArgsConstructor @Data @Table(name = "fornecedor") @Entity
public class Fornecedor {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nome_fantasia", nullable = false)
    private String nomeFantasia;
}
@Repository
public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> { }
@Service
public class FornecedorService {
    @Autowired FornecedorRepository fornecedorRepository;
    public void criarFornecedor(Fornecedor fornecedor) { fornecedorRepository.save(fornecedor); }
    public List<Fornecedor> listarTodosFornecedores() { return fornecedorRepository.findAll(); }
}
@RestController @RequestMapping("/fornecedores")
public class FornecedorController {
    @Autowired FornecedorService fornecedorService;
    @GetMapping public List<Fornecedor> listar() { return fornecedorService.listarTodosFornecedores(); }
}
// estado final (projetos-fullstack/final): interface FornecedorService + FornecedorServiceImpl implements,
// @RequiredArgsConstructor + private final Repository, Mapper com métodos static:
public static Fornecedor toEntity(FornecedorRequestDTO dto) {
    Fornecedor fornecedor = new Fornecedor();
    fornecedor.setNomeFantasia(dto.nomeFantasia());
    return fornecedor;
}
```

## (B) Outros materiais
- `trabalhando-com-java/` = palestra de carreira (por que Java, bancos) — sem código.
- `backend/` e `backend-uniesp-part2/` = versões antigas do mesmo backend (Java 17), sem OO básico; device "primeiro a dor, depois a solução".
- `java-avancado/` = público sênior ("nada de explicar o que é classe"); Sábado 2 = OO de verdade + SOLID (degrau ACIMA).
- `prep-entrevista-java-pleno/capitulos/01-java-moderno/` = melhor espelho de tom (records/crachá, streams/esteira, Optional/achados e perdidos, aviso de ligadura).
- `programacao-iniciantes(-v2)/` = Python; modelo de FORMA (BugZilla, 3 níveis, máquinas).

## (D) Recomendações
Cobrir: main/compilar/rodar no IntelliJ (+ troca VSCode→IntelliJ) · package/import/árvore src · classe=molde/objeto/new (ficha de cadastro) · atributos e tipos (String, int/Integer, Long, boolean, double + BigDecimal citado com o meme 0.1+0.2) · métodos · construtor vazio e cheio · private + getters/setters à mão (uma vez) · static × instância · final · interface/implements/@Override (ideia) · List<T> (só usar) · null/NPE/ideia do Optional · throw new (só citar) · o que é anotação · convenções de arquivo · encadeamento.
Não cobrir: record, lambda/stream, API do Optional, DTO/Mapper, DI/@Autowired, JPA, validation, enum, Maven/Initializr, herança/abstract/polimorfismo.
Riscos: não pregar @Autowired de campo; não pregar getter/setter à mão como permanente; dinheiro = BigDecimal no backend; manter aviso de ligadura; usar nomes do GestorPRO; posição = Cap 11 após a "Formatura do Frontend".
