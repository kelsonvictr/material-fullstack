# Catálogo de mensagens REAIS do javac 21 (Corretto 21.0.10) — copiar verbatim

### 01-string-em-int
```
public class Main {
    public static void main(String[] args) {
        int idade = "32";
        System.out.println(idade + 1);
    }
}
```
**javac:**
```
Main.java:3: error: incompatible types: String cannot be converted to int
        int idade = "32";
                    ^
1 error
```

### 02-faltou-ponto-virgula
```
public class Main {
    public static void main(String[] args) {
        System.out.println("oi")
    }
}
```
**javac:**
```
Main.java:3: error: ';' expected
        System.out.println("oi")
                                ^
1 error
```

### 03-double-em-int
```
public class Main {
    public static void main(String[] args) {
        int preco = 320;
        preco = 3.5;
    }
}
```
**javac:**
```
Main.java:4: error: incompatible types: possible lossy conversion from double to int
        preco = 3.5;
                ^
1 error
```

### 04-variavel-nao-declarada
```
public class Main {
    public static void main(String[] args) {
        estoque = 4;
        System.out.println(estoque);
    }
}
```
**javac:**
```
Main.java:3: error: cannot find symbol
        estoque = 4;
        ^
  symbol:   variable estoque
  location: class Main
Main.java:4: error: cannot find symbol
        System.out.println(estoque);
                           ^
  symbol:   variable estoque
  location: class Main
2 errors
```

### 05-int-em-String
```
public class Main {
    public static void main(String[] args) {
        String nome = 320;
    }
}
```
**javac:**
```
Main.java:3: error: incompatible types: int cannot be converted to String
        String nome = 320;
                      ^
1 error
```

### 06-boolean-em-int
```
public class Main {
    public static void main(String[] args) {
        int x = true;
    }
}
```
**javac:**
```
Main.java:3: error: incompatible types: boolean cannot be converted to int
        int x = true;
                ^
1 error
```

### 07-null-em-int
```
public class Main {
    public static void main(String[] args) {
        int x = null;
    }
}
```
**javac:**
```
Main.java:3: error: incompatible types: <null> cannot be converted to int
        int x = null;
                ^
1 error
```

### 08-int-em-Long
```
public class Main {
    public static void main(String[] args) {
        Long id = 320;
    }
}
```
**javac:**
```
Main.java:3: error: incompatible types: int cannot be converted to Long
        Long id = 320;
                  ^
1 error
```

### 09-string-em-double-arg
```
public class Main {
    static double aplicarDesconto(double preco, int porcentagem) {
        return preco - preco * porcentagem / 100;
    }
    public static void main(String[] args) {
        double x = aplicarDesconto("320", 10);
    }
}
```
**javac:**
```
Main.java:6: error: incompatible types: String cannot be converted to double
        double x = aplicarDesconto("320", 10);
                                   ^
Note: Some messages have been simplified; recompile with -Xdiags:verbose to get full output
1 error
```

### 10-faltou-argumento
```
public class Main {
    static double aplicarDesconto(double preco, int porcentagem) {
        return preco - preco * porcentagem / 100;
    }
    public static void main(String[] args) {
        double x = aplicarDesconto(320);
    }
}
```
**javac:**
```
Main.java:6: error: method aplicarDesconto in class Main cannot be applied to given types;
        double x = aplicarDesconto(320);
                   ^
  required: double,int
  found:    int
  reason: actual and formal argument lists differ in length
1 error
```

### 11-void-em-double
```
public class Main {
    static void avisar() {
        System.out.println("Estoque baixo!");
    }
    public static void main(String[] args) {
        double x = avisar();
    }
}
```
**javac:**
```
Main.java:6: error: incompatible types: void cannot be converted to double
        double x = avisar();
                         ^
1 error
```

### 12-campo-inexistente
```
class Produto {
    String nome;
    double preco;
    int estoque;
}
public class Main {
    public static void main(String[] args) {
        Produto p1 = new Produto();
        p1.categoria = "Periféricos";
    }
}
```
**javac:**
```
Main.java:9: error: cannot find symbol
        p1.categoria = "Periféricos";
          ^
  symbol:   variable categoria
  location: variable p1 of type Produto
1 error
```

### 13-sem-new
```
class Produto {
    String nome;
}
public class Main {
    public static void main(String[] args) {
        Produto p3;
        p3.nome = "x";
    }
}
```
**javac:**
```
Main.java:7: error: variable p3 might not have been initialized
        p3.nome = "x";
        ^
1 error
```

### 14-construtor-args-errados
```
class Produto {
    String nome; double preco; int estoque;
    public Produto(String nome, double preco, int estoque) {
        this.nome = nome; this.preco = preco; this.estoque = estoque;
    }
}
public class Main {
    public static void main(String[] args) {
        Produto p = new Produto("Mouse Gamer", 89);
    }
}
```
**javac:**
```
Main.java:9: error: constructor Produto in class Produto cannot be applied to given types;
        Produto p = new Produto("Mouse Gamer", 89);
                    ^
  required: String,double,int
  found:    String,int
  reason: actual and formal argument lists differ in length
1 error
```

### 15-construtor-vazio-sumiu
```
class Produto {
    String nome; double preco; int estoque;
    public Produto(String nome, double preco, int estoque) {
        this.nome = nome; this.preco = preco; this.estoque = estoque;
    }
}
public class Main {
    public static void main(String[] args) {
        Produto p = new Produto();
    }
}
```
**javac:**
```
Main.java:9: error: constructor Produto in class Produto cannot be applied to given types;
        Produto p = new Produto();
                    ^
  required: String,double,int
  found:    no arguments
  reason: actual and formal argument lists differ in length
1 error
```

### 16-private-access
```
class Produto {
    private double preco;
}
public class Main {
    public static void main(String[] args) {
        Produto p = new Produto();
        p.preco = -50;
    }
}
```
**javac:**
```
Main.java:7: error: preco has private access in Produto
        p.preco = -50;
         ^
1 error
```

### 17-string-em-lista-de-Produto
```
import java.util.ArrayList;
import java.util.List;
class Produto { String nome; }
public class Main {
    public static void main(String[] args) {
        List<Produto> produtos = new ArrayList<>();
        produtos.add("banana");
    }
}
```
**javac:**
```
Main.java:7: error: incompatible types: String cannot be converted to Produto
        produtos.add("banana");
                     ^
Note: Some messages have been simplified; recompile with -Xdiags:verbose to get full output
1 error
```

### 18-non-static-context
```
import java.util.ArrayList;
import java.util.List;
class Produto { String nome; }
class ProdutoService {
    private List<Produto> produtos = new ArrayList<>();
    public void cadastrar(Produto produto) { produtos.add(produto); }
}
public class Main {
    public static void main(String[] args) {
        Produto p = new Produto();
        ProdutoService.cadastrar(p);
    }
}
```
**javac:**
```
Main.java:11: error: non-static method cadastrar(Produto) cannot be referenced from a static context
        ProdutoService.cadastrar(p);
                      ^
1 error
```

### 19-int-em-Long-arg
```
class ProdutoService {
    public String buscarPorId(Long id) { return null; }
}
public class Main {
    public static void main(String[] args) {
        ProdutoService service = new ProdutoService();
        service.buscarPorId(2);
    }
}
```
**javac:**
```
Main.java:7: error: incompatible types: int cannot be converted to Long
        service.buscarPorId(2);
                            ^
Note: Some messages have been simplified; recompile with -Xdiags:verbose to get full output
1 error
```

### 20-arquivo-diferente-da-classe
```
public class Produto {
    String nome;
}
```
**javac:**
```
Main.java:1: error: class Produto is public, should be declared in a file named Produto.java
public class Produto {
       ^
1 error
```

### 21-missing-return
```
import java.util.ArrayList;
import java.util.List;
class Produto { Long id; String nome; Long getId() { return id; } }
class ProdutoService {
    private List<Produto> produtos = new ArrayList<>();
    public Produto buscarPorId(Long id) {
        for (Produto p : produtos) {
            if (p.getId().equals(id)) {
                return p;
            }
        }
    }
}
public class Main { public static void main(String[] args) { } }
```
**javac:**
```
Main.java:12: error: missing return statement
    }
    ^
1 error
```

### 22-system-minusculo
```
public class Main {
    public static void main(String[] args) {
        system.out.println("oi");
    }
}
```
**javac:**
```
Main.java:3: error: package system does not exist
        system.out.println("oi");
              ^
1 error
```

### 23-string-minusculo
```
public class Main {
    public static void main(String[] args) {
        string nome = "Ana";
    }
}
```
**javac:**
```
Main.java:3: error: cannot find symbol
        string nome = "Ana";
        ^
  symbol:   class string
  location: class Main
1 error
```

### 24-List-sem-import
```
class Produto { String nome; }
public class Main {
    public static void main(String[] args) {
        List<Produto> produtos = new ArrayList<>();
    }
}
```
**javac:**
```
Main.java:4: error: cannot find symbol
        List<Produto> produtos = new ArrayList<>();
        ^
  symbol:   class List
  location: class Main
Main.java:4: error: cannot find symbol
        List<Produto> produtos = new ArrayList<>();
                                     ^
  symbol:   class ArrayList
  location: class Main
2 errors
```

### 25-Nome-maiusculo-variavel
```
public class Main {
    public static void main(String[] args) {
        String nome = "Ana";
        System.out.println(Nome);
    }
}
```
**javac:**
```
Main.java:4: error: cannot find symbol
        System.out.println(Nome);
                           ^
  symbol:   variable Nome
  location: class Main
1 error
```

---

# Saídas REAIS em tempo de execução (java 21, Corretto 21.0.10) — copiar verbatim

| Código | Saída no console |
|---|---|
| `System.out.println(new Produto("Teclado Mecânico", 320, 12))` com `toString` `"#" + id + " " + nome + " - R$ " + preco + " (estoque: " + estoque + ")"` ANTES de cadastrar | `#null Teclado Mecânico - R$ 320.0 (estoque: 12)` |
| idem DEPOIS de `service.cadastrar(t)` (Service seta id 1L) | `#1 Teclado Mecânico - R$ 320.0 (estoque: 12)` |
| `System.out.println(0.1 + 0.2)` | `0.30000000000000004` (igual ao JS — meme do Cap 2) |
| `System.out.println(objeto)` de classe SEM toString, sem package | `SemToString@5451c3a8` ("o seu número vai ser outro") |
| idem com `package br.com.sistemagestao.api;` | `br.com.sistemagestao.api.Produto@15db9742` |
| `System.out.println(320 / 100)` (int / int) | `3` (divisão inteira!) |
| `System.out.println(320 * 10 / 100)` | `32` |
| `double d = 320; System.out.println(d)` | `320.0` |
| `String a = "Ana"; String suf = "a"; String b = "An" + suf; a == b` / `a.equals(b)` | `false` / `true` |
| `t.getNome() == "Teclado Mecânico"` (nome veio de literal no `new`) | **`true`** (literais internados — NÃO usar como exemplo do bug do `==`; usar a string construída `"An" + suf`) |
| `Produto achado = service.buscarPorId(99L); achado.getNome();` **no IntelliJ** (compila com -g) | `Exception in thread "main" java.lang.NullPointerException: Cannot invoke "Produto.getNome()" because "achado" is null` + `\tat Main.main(Main.java:37)` |
| idem compilado com javac "puro" (sem -g) | `… because "<local9>" is null` (por isso o material diz "no IntelliJ aparece assim") |
| `service.buscarPorId(99L).getNome()` (encadeado — NÃO depende de -g) | `Exception in thread "main" java.lang.NullPointerException: Cannot invoke "Produto.getNome()" because the return value of "ProdutoService.buscarPorId(java.lang.Long)" is null` |
| `produtos.get(7)` numa lista com 1 elemento | `Exception in thread "main" java.lang.IndexOutOfBoundsException: Index 7 out of bounds for length 1` (+ 5 linhas `at java.base/…` e `at Main.main(Main.java:39)`) |
| `java -version` | `openjdk version "21.0.10" 2026-01-20 LTS` / `OpenJDK Runtime Environment Corretto-21.0.10.7.1 (build 21.0.10+7-LTS)` / `OpenJDK 64-Bit Server VM Corretto-21.0.10.7.1 (build 21.0.10+7-LTS, mixed mode, sharing)` (Temurin imprime `Temurin-21.0.x+y` no lugar de Corretto) |

Notas: mensagens de tipo em chamada de método com 1 candidato vêm seguidas de `Note: Some messages have been simplified; recompile with -Xdiags:verbose to get full output` — mostrar só a 1ª linha (é a que o IntelliJ destaca). O `^` do javac aponta a coluna; no `';' expected` ele aponta o FIM da linha anterior.
