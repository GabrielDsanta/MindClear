# Projeto FullStack

Este é um projeto FullStack que consiste em uma API backend e um aplicativo mobile. Abaixo estão as instruções para configurar e executar o projeto localmente.

## Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Docker (para rodar o banco de dados PostgreSQL)
- Expo CLI (para rodar o aplicativo mobile)
- Xcode (para iOS) ou Android Studio (para Android)

## Passo a Passo

### 1. Clonar o repositório

Primeiro, clone o repositório do projeto:

```
git clone git@github.com:GabrielDsanta/MindClear.git
cd seu-projeto
```
2. Instalar as dependências

```
# No diretório do backend
cd backend
npm install

# No diretório do aplicativo mobile
cd ../mobile
yarn install
```

3. Configurar os arquivos .env

```
.env no diretório do aplicativo mobile (mobile/.env):
EXPO_PUBLIC_API_BASE='http://localhost:3000'

.env no diretório do backend (backend/.env):
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nestjs_db?schema=public"
JWT_SECRET="mindclear"
```

4. Iniciar a API (Backend)
```
# Iniciar o banco de dados com Docker
sudo docker compose up -d

# Rodar as migrações do Prisma
npx prisma migrate dev

# Iniciar o servidor de desenvolvimento
npm run start:dev

Comando completo: sudo docker compose up -d && npx prisma migrate dev && npm run start:dev
```
5. Iniciar o Aplicativo Mobile
```
Para iOS:
npx expo run:ios

Para Android:
npx expo run:android
```
# Decisões Técnicas
Aqui estão as principais decisões técnicas do projeto, com explicações breves:

### 1. LocalStorage para Dados de Contabilidade
Decisão: Dados de dias de sobriedade são salvos no LocalStorage.

Justificativa: Simples e eficiente para persistir dados no cliente, mantendo a experiência do usuário fluida.

### 2. JWT no NestJS para Autenticação
Decisão: Autenticação implementada com JWT, integrado ao NestJS.

Justificativa: Seguro, stateless e de fácil implementação, com suporte nativo do framework.

### 3. Docker para Banco de Dados
Decisão: Uso do Docker para inicializar o PostgreSQL.

Justificativa: Configuração rápida e consistente, com ambiente isolado e reproduzível.

### 4. Hooks Personalizados e useCallback
Decisão: Hooks personalizados para integração com a API e useCallback para otimização.

Justificativa: Reutilização de código e melhoria de desempenho, evitando recriação desnecessária de funções.

