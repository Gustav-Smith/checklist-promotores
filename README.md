Ótimo! O README está no ar. Agora vamos melhorá-lo para cobrir o projeto fullstack completo. Substitua o conteúdo do `README.md` por este:

```markdown
# 🛒 Checklist Promotores

Sistema fullstack para gerenciamento de visitas de promotores de trade merchandising em supermercados. Desenvolvido para uso real em campo, onde promotores executam checklists durante visitas a redes varejistas.

## 🚀 Tecnologias

### Backend
- Java 21 + Spring Boot 3
- Spring Security + JWT
- Spring Data JPA + Hibernate
- PostgreSQL 16
- Docker
- Maven

### Frontend
- React + Vite
- React Router DOM
- Axios

## 📋 Funcionalidades

- Autenticação com JWT (login seguro)
- Perfis de acesso: Admin, Coordenador e Promotor
- Gestão de indústrias, supermercados e usuários
- Agendamento de visitas por promotor
- Checklist por visita com barra de progresso
- Fluxo de status: Pendente → Em Andamento → Concluída
- Senhas criptografadas com BCrypt

## 🖥️ Telas do sistema

- **Login** — autenticação com JWT
- **Dashboard** — visão geral com cards e navegação
- **Visitas** — listagem com status coloridos e ações
- **Checklist** — itens por visita com progresso em tempo real

## ▶️ Como rodar localmente

### Pré-requisitos
- Java 21
- Node.js 20+
- Docker Desktop

### 1. Clone o repositório
```bash
git clone https://github.com/Gustav-Smith/checklist-promotores.git
cd checklist-promotores
```

### 2. Suba o banco de dados
```bash
docker run --name checklist-db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin123 \
  -e POSTGRES_DB=checklist \
  -p 5432:5432 \
  -d postgres:16
```

### 3. Rode o backend
```bash
cd checklist-api
./mvnw spring-boot:run
```
API disponível em `http://localhost:8080`

### 4. Rode o frontend
```bash
cd checklist-frontend
npm install
npm run dev
```
Frontend disponível em `http://localhost:5173`

## 🔐 Autenticação

```json
POST /api/auth/login
{
  "email": "joao@promotores.com",
  "senha": "123456"
}
```

## 📁 Estrutura do projeto

```
checklist-promotores/
├── checklist-api/          → Backend Spring Boot
│   └── src/main/java/
│       ├── controller/     → endpoints REST
│       ├── service/        → regras de negócio
│       ├── repository/     → acesso ao banco
│       ├── entity/         → entidades JPA
│       ├── dto/            → objetos de transferência
│       └── security/       → filtros JWT
│
└── checklist-frontend/     → Frontend React
    └── src/
        ├── pages/          → telas da aplicação
        ├── components/     → componentes reutilizáveis
        ├── services/       → chamadas à API
        └── context/        → estado global
```

## 👨‍💻 Autor

Desenvolvido por **GustavJ3an**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-GustavJ3an-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/gustavj3an/)
```

---

Depois de atualizar, suba com:

```bash
git add README.md
git commit -m "docs: README fullstack completo"
git push
```

Esse README vai impressionar qualquer recrutador — explica o projeto, as tecnologias, como rodar e ainda tem o link do LinkedIn com badge! 🚀