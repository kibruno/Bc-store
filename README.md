# BC STORE V2 — Painel de Produtos + WhatsApp

## O que esta versão faz

- Loja pública responsiva.
- Foto, nome, marca, categoria e preço dos produtos.
- Página individual do produto.
- Botão para finalizar a venda pelo WhatsApp.
- Painel administrativo protegido por login.
- Cadastro, edição e exclusão de produtos.
- Upload de foto pelo painel.
- Estoque, tamanhos e cores.
- PostgreSQL via Prisma.
- Upload de imagens no Supabase Storage.

## 1. Instalar

Recomendado: Node.js 20+.

```bash
npm install
```

## 2. Banco de dados

Crie um projeto PostgreSQL (Supabase é uma opção simples).

Copie `.env.example` para `.env` e preencha `DATABASE_URL`.

Depois:

```bash
npx prisma db push
npm run db:seed
```

## 3. Login do painel

Preencha no `.env`:

```env
ADMIN_EMAIL="admin@bcstore.com"
ADMIN_PASSWORD="uma-senha-forte"
SESSION_SECRET="uma-chave-secreta-bem-grande"
```

O painel fica em:

`/login`

Depois do login:

`/admin`

## 4. Fotos

O painel envia a foto para o Supabase Storage.

No Supabase:
1. Crie um bucket chamado `products`.
2. Deixe o bucket público para que as fotos possam aparecer na loja.
3. Copie a URL do projeto e a Service Role Key para `.env`.

NUNCA coloque `SUPABASE_SERVICE_ROLE_KEY` em código que roda no navegador. Ela fica somente no servidor.

## 5. WhatsApp

No `.env`, troque:

```env
WHATSAPP_NUMBER="5588999999999"
```

Use 55 + DDD + número, sem espaços, parênteses ou traços.

## 6. Rodar

```bash
npm run dev
```

Abra:

`http://localhost:3000`

## 7. Colocar online

A opção recomendada é:
- GitHub para guardar o código
- Vercel para hospedar o Next.js
- Supabase para PostgreSQL e Storage

Na Vercel, cadastre as mesmas variáveis do `.env` em Settings > Environment Variables.

## IMPORTANTE

Antes de colocar em produção:
- use uma senha forte no ADMIN_PASSWORD;
- gere um SESSION_SECRET longo e aleatório;
- nunca publique o `.env`;
- mantenha a Service Role Key somente no servidor;
- configure backup do banco;
- configure domínio e HTTPS;
- considere adicionar recuperação de senha e usuários administradores se a equipe crescer.

Esta V2 foi feita para você cadastrar os produtos pelo painel sem alterar o código.