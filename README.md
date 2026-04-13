# Toughts

- Aplicação fullstack com backend em Express e frontend em React.
- Este guia mostra como configurar e rodar o projeto do zero.

---

## Estrutura

```
toughts/
├── backend/
├── frontend/
└── README.md
```

---

## Backend

Acesse a pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

### Configuração (Firebase)

Antes de rodar o backend, configure o Firebase:

1. Acesse o Firebase Console
2. Crie um novo projeto
3. Vá em Settings
4. Acesse Service Accounts
5. Gere uma nova chave privada

---

### Variáveis de ambiente

Crie um arquivo `.env` dentro de `backend`:

```env
FRONTEND_URL=http://localhost:3000
PORT=3000
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-email
FIREBASE_PRIVATE_KEY=your-key
```

---

### Rodar o backend

```bash
npm run start
```

Disponível em:
http://localhost:3000

---

## Frontend

Acesse a pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

### Variáveis de ambiente

Crie um `.env` em `frontend`:

```env
VITE_API_URL=http://localhost:3000/api/
```

---

### Rodar o frontend

```bash
npm run dev
```

Disponível em:
http://localhost:5173

---

## Endpoints da API

- POST `/login` - Autenticação do usuário

- POST `/register` - Criação de usuário

- POST `/logout` - Encerramento de sessão

- GET `/` - Lista todos os pensamentos

- GET `/dashboard` - Lista pensamentos do usuário (auth)

- GET `/:id` - Busca por ID

- POST `/` - Cria um pensamento (auth)

- PUT `/:id` - Atualiza um pensamento (auth)

- DELETE `/:id` - Remove um pensamento (auth)

---

## Observação

Rotas com (auth) exigem autenticação.
