# 💻 code.dev

## Descrição
**code.dev** é um projeto de blog desenvolvido com **Next.js** e **GraphQL**, utilizando **ShadcnUI** para uma interface moderna e responsiva. Criado como parte de um treinamento sobre Next.js na Code Empresa Júnior de Computação, o projeto inclui funcionalidades como busca, paginação, integração de API de email e testes end-to-end com **Cypress**.

## Funcionalidades
- **Blog com GraphQL**: Gerenciamento de posts via API GraphQL com Apollo Client.
- **Busca e Paginação**: Navegação intuitiva com suporte a filtros e paginação.
- **API de Email**: Integração com Resend para envio de notificações.
- **Interface Moderna**: Estilizada com ShadcnUI e TailwindCSS.
- **Testes e2e**: Validação de fluxos com Cypress.

## Tecnologias
- Next.js
- TypeScript
- TailwindCSS
- ShadcnUI
- Apollo Client
- GraphQL API
- Resend
- Cypress

## Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/Santannafe12/code.dev
   cd code.dev
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure variáveis de ambiente (veja `.env.example`):
   ```plaintext
   GRAPHQL_API_URL=sua_url_api
   RESEND_API_KEY=sua_chave_resend
   ```
4. Execute o projeto:
   ```bash
   npm run dev
   ```
   - Acesse em `http://localhost:3000`.

## Como Usar
- **Explorar Posts**: Navegue pelos posts com busca e paginação.
- **Testar Emails**: Configure a API Resend para testar notificações.
- **Executar Testes**: Rode os testes e2e com:
  ```bash
  npx cypress run
  ```

## Observações
- Este projeto é parte de um treinamento educacional da Code Empresa Junior de Computacao, a qual fiz parte.
- Ajuste a URL da API GraphQL e a chave Resend no `.env` para uso real.
- Utilizei a API do Hygraph para o GraphQL.
