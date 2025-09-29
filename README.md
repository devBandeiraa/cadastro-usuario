# Cadastro de Usuário

API REST simples para cadastro e gerenciamento de usuários, construída com Spring Boot, Spring Web e Spring Data JPA, usando banco de dados em memória H2.

<p align="left">
  <img alt="Java" src="https://img.shields.io/badge/Java-25-007396?logo=java&logoColor=white" />
  <img alt="Spring Boot" src="https://img.shields.io/badge/Spring%20Boot-3.5.6-6DB33F?logo=springboot&logoColor=white" />
  <img alt="Maven" src="https://img.shields.io/badge/Maven-Build-C71A36?logo=apachemaven&logoColor=white" />
  <img alt="H2" src="https://img.shields.io/badge/DB-H2-1C6BA0?logo=databricks&logoColor=white" />
  <img alt="Angular" src="https://img.shields.io/badge/Angular-20-E23237?logo=angular&logoColor=white" />
</p>

—

## 🧰 Stack

- Spring Boot 3.5.6
- Spring Web
- Spring Data JPA
- H2 Database (em memória)
- Lombok
- Maven
- Java 25 (conforme `pom.xml`)
- Angular 20 (pasta `frontend/`)

## 🚀 Como executar

Pré-requisitos:
- Java (JDK) na versão compatível com o projeto (definido como 25 no `pom.xml`)
- Maven (ou use o wrapper incluso `mvnw`/`mvnw.cmd`)

Passos:
1. Clonar/baixar o projeto.
2. Na raiz do projeto, executar o backend:
   - Windows:
     ```powershell
     .\mvnw.cmd spring-boot:run
     ```
   - Linux/Mac:
     ```bash
     ./mvnw spring-boot:run
     ```
3. A API subirá por padrão na porta definida em `src/main/resources/application.properties`:
   - `server.port=8081`

### 🖥️ Frontend Angular (pasta `frontend/`)

Pré-requisitos:
- Node.js LTS (>= 20.19) ou Node 22.12+
- NPM (instalado com Node)

Comandos principais (executar dentro de `frontend/`):
```bash
npm install
npm start          # inicia em http://localhost:4200 com proxy
npm start -- --port 4201  # porta alternativa
```

Proxy de desenvolvimento: `frontend/proxy.conf.json`
```json
{
  "/usuario": {
    "target": "http://localhost:8081",
    "secure": false,
    "changeOrigin": true
  }
}
```
Isso permite chamar a API via `/usuario` sem CORS.

Rota principal do app:
- `http://localhost:4200/cadastro`

Páginas e serviços:
- Componente: `frontend/src/app/pages/usuario-cadastro/usuario-cadastro.component.ts`
- Serviço: `frontend/src/app/services/usuario.service.ts`
- Modelo: `frontend/src/app/models/usuario.ts`

Paleta de cores utilizada (global em `frontend/src/styles.scss`):
- `#0D0D0D` (fundo escuro)
- `#8C8C8C` (cinza)
- `#F2F2F2` (texto claro)
- `#B7BF7A` (accent)

Para gerar o jar:
```bash
./mvnw clean package
```
Em seguida, execute o jar:
```bash
java -jar target/cadastro-usuario-0.0.1-SNAPSHOT.jar
```

## ⚙️ Configurações (H2 e Datasource)

Arquivo: `src/main/resources/application.properties`
- H2 Console habilitado: `/h2-console`
- Datasource: `jdbc:h2:mem:usuario`
- Usuário: `sa`
- Senha: vazio

Acesse o console do H2 após iniciar a aplicação:
- URL do console: `http://localhost:8081/h2-console`
- JDBC URL: `jdbc:h2:mem:usuario`
- User Name: `sa`
- Password: (deixe em branco)

## 🧱 Modelo de Dados

Entidade: `Usuario` (`com.jhordanbandeira.cadastro_usuario.infraestructure.entitys.Usuario`)
- `id` (Integer, auto-gerado)
- `email` (String, único)
- `nome` (String)

Tabela: `usuario`

## 📡 Endpoints

Base path do controller: `/usuario`

1. Criar usuário
   - Método: `POST /usuario`
   - Corpo (JSON):
     ```json
     {
       "email": "joao@example.com",
       "nome": "João da Silva"
     }
     ```
   - Respostas: `200 OK` (corpo vazio)

2. Buscar usuário por email
   - Método: `GET /usuario?email={email}`
   - Exemplo: `GET /usuario?email=joao@example.com`
   - Respostas:
     - `200 OK` com corpo:
       ```json
       {
         "id": 1,
         "email": "joao@example.com",
         "nome": "João da Silva"
       }
       ```
     - `500` com mensagem "Email não encontrado" (lançado como RuntimeException no service)

3. Deletar usuário por email
   - Método: `DELETE /usuario?email={email}`
   - Exemplo: `DELETE /usuario?email=joao@example.com`
   - Respostas: `200 OK` (corpo vazio)

4. Atualizar usuário por ID
   - Método: `PUT /usuario?id={id}`
   - Query param: `id` (Integer)
   - Corpo (JSON) com campos a atualizar (parcial):
     ```json
     {
       "email": "novoemail@example.com",
       "nome": "João Atualizado"
     }
     ```
   - Regras:
     - Se `email` ou `nome` forem nulos, mantém o valor atual (merge parcial).
   - Respostas: `200 OK` (corpo vazio) ou 
     erro `500` com mensagem "Usuário não encontrado" se o ID não existir.

## 🧪 Exemplos com cURL

- Criar:
  ```bash
  curl -X POST "http://localhost:8081/usuario" \
       -H "Content-Type: application/json" \
       -d '{"email":"joao@example.com","nome":"João da Silva"}'
  ```

- Buscar por email:
  ```bash
  curl "http://localhost:8081/usuario?email=joao@example.com"
  ```

- Atualizar por ID:
  ```bash
  curl -X PUT "http://localhost:8081/usuario?id=1" \
       -H "Content-Type: application/json" \
       -d '{"nome":"João Atualizado"}'
  ```

- Deletar por email:
  ```bash
  curl -X DELETE "http://localhost:8081/usuario?email=joao@example.com"
  ```

## 🗂️ Estrutura do Projeto

```
.
├── pom.xml
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── jhordanbandeira
│   │   │           └── cadastro_usuario
│   │   │               ├── CadastroUsuarioApplication.java
│   │   │               ├── business
│   │   │               │   └── UsuarioService.java
│   │   │               ├── controller
│   │   │               │   └── UsuarioController.java
│   │   │               └── infraestructure
│   │   │                   ├── entitys
│   │   │                   │   └── Usuario.java
│   │   │                   └── repository
│   │   │                       └── UsuarioRepository.java
│   │   └── resources
│   │       └── application.properties
│   └── test
│       └── java
├── frontend
│   ├── package.json
│   ├── proxy.conf.json
│   └── src
│       ├── index.html
│       ├── styles.scss
│       └── app
│           ├── app.html
│           ├── app.config.ts
│           ├── app.routes.ts
│           ├── models
│           │   └── usuario.ts
│           ├── services
│           │   └── usuario.service.ts
│           └── pages
│               └── usuario-cadastro
│                   ├── usuario-cadastro.component.ts
│                   ├── usuario-cadastro.component.html
│                   └── usuario-cadastro.component.scss
└── README.md
```

## 📎 Observações

- O banco H2 é em memória; os dados são perdidos a cada reinicialização.
- O campo `email` é único; criar/atualizar com email duplicado causará erro de persistência.
- Exceções de negócio atualmente lançam `RuntimeException` genérica (retorna 500). Para produção, recomenda-se tratamento com `@ControllerAdvice` e códigos HTTP apropriados (404, 400, etc.).


<p align="center">Feito com ❤️ por <strong>Jhordan</strong></p>
