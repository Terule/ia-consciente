# IA Consciente — Desmistificando a Inteligência Artificial

[![Versão](https://img.shields.io/badge/versão-0.1.0-blue)](https://iaconsciente.terule.dev.br)
[![Next.js](https://img.shields.io/badge/Next.js-15%2B-black?logo=nextdotjs)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker)](https://www.docker.com/)
[![Licença](https://img.shields.io/badge/licença-uso%20acadêmico-success)](#licença)

> Projeto educativo sobre o uso consciente, seguro e responsável da inteligência artificial.

## 🎓 Contexto acadêmico

**IA Consciente** é um Projeto de Extensão Universitária do curso de **Engenharia de Software da Unicesumar**, desenvolvido por **Rafael Aguiar Gomes**.

O projeto promove o letramento digital da comunidade por meio de conteúdos simples, acessíveis e práticos. A aplicação explica o que é inteligência artificial, orienta sobre segurança digital, verificação de fontes e cuidados com conteúdos falsos ou manipulados.

Além do conteúdo público, o sistema coleta avaliações da comunidade para registrar o impacto da ação de extensão e gerar evidências para avaliação acadêmica.

## 🌐 Projeto em produção

Acesse a aplicação online:

**[https://iaconsciente.terule.dev.br](https://iaconsciente.terule.dev.br)**

## ✨ Funcionalidades

- 📚 **Módulos educativos:** explicações didáticas sobre IA, segurança digital, checagem de fontes e consumo responsável de conteúdo.
- 🧭 **Passo a passo interativo:** cartões com rolagem lateral e controles por seta para facilitar a navegação pelo conteúdo.
- ✅ **Quiz “Verdadeiro ou Falso”:** perguntas com retorno imediato, explicação das respostas e resumo final com dicas personalizadas conforme o desempenho.
- 📝 **Formulário de avaliação:** coleta nome opcional, perfil, nota e aprendizado percebido pela pessoa participante.
- 💾 **Persistência de dados:** avaliações são registradas em SQLite por meio do Prisma ORM.
- 📊 **Painel administrativo:** rota `/admin/relatorio` com métricas, gráficos de notas e perfis alcançados, além de depoimentos.
- 🖨️ **Relatório imprimível:** layout A4 para salvar as evidências em PDF usando `Ctrl+P` ou `Cmd+P`.
- ❤️ **Healthcheck:** endpoint `/api/health` para monitoramento do container.

## 🧰 Stack tecnológica

| Camada | Tecnologias |
| --- | --- |
| Frontend | Next.js 15+, React, TypeScript, Tailwind CSS |
| Interface | Lucide React, Chart.js, React Chart.js 2 |
| Backend | Route Handlers do Next.js (App Router) |
| Banco de dados | SQLite |
| ORM | Prisma 7 com adaptador `better-sqlite3` |
| Infraestrutura | Docker multi-stage, Docker Compose e Coolify |

> A versão atualmente instalada do Next.js pode ser consultada no `package.json`.

## 📁 Estrutura resumida

```text
.
├── app/
│   ├── api/
│   │   ├── feedback/       # Registro e listagem das avaliações
│   │   └── health/         # Healthcheck do container
│   ├── admin/relatorio/    # Painel de métricas e impressão
│   └── page.tsx            # Página pública
├── components/             # Componentes educacionais e interativos
├── prisma/
│   ├── migrations/         # Migrações versionadas
│   └── schema.prisma       # Modelo Feedback
├── Dockerfile
└── docker-compose.yml
```

## 🚀 Como executar localmente

### Pré-requisitos

- Node.js 22 ou superior
- npm
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/ia-consciente.git
cd ia-consciente
```

> Substitua `SEU-USUARIO` pelo endereço correto do repositório quando ele estiver publicado.

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie o arquivo `.env` a partir do exemplo disponível:

```bash
cp .env.example .env
```

O conteúdo esperado é:

```env
DATABASE_URL="file:./data/dev.db"
```

### 4. Gere o Prisma Client e prepare o banco de dados

```bash
npx prisma generate
npx prisma db push
```

### 5. Inicie a aplicação

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Comandos úteis

```bash
# Verificar qualidade do código
npm run lint

# Criar build de produção
npm run build

# Gerar o Prisma Client
npm run prisma:generate

# Aplicar migrações versionadas (cenários de deploy)
npm run prisma:migrate:deploy
```

## 🐳 Como executar via Docker

O projeto possui um `Dockerfile` multi-stage baseado em `node:22-alpine` e um `docker-compose.yml` com volume persistente para o banco SQLite.

### 1. Construa e inicie os serviços

```bash
docker compose up --build -d
```

### 2. Acesse a aplicação

Como o Compose publica a porta do host dinamicamente, descubra a porta atribuída:

```bash
docker compose port ia-consciente 3000
```

Exemplo de saída:

```text
0.0.0.0:51864
```

Nesse exemplo, acesse:

```text
http://localhost:51864
```

### 3. Acompanhe os logs (opcional)

```bash
docker compose logs -f ia-consciente
```

### 4. Encerre os serviços

```bash
docker compose down
```

### Persistência do SQLite

O arquivo SQLite é armazenado no volume nomeado `prisma_data`, montado em `/app/prisma/data` dentro do container. Assim, os dados permanecem disponíveis após reinicializações ou recriações do container.

Na inicialização, o container executa automaticamente:

```bash
npx prisma migrate deploy
node server.js
```

O healthcheck consulta `GET /api/health` para verificar se a aplicação está respondendo.

## 📊 Acesso ao painel administrativo

O relatório de impacto está disponível na rota:

```text
/admin/relatorio
```

Em ambiente local:

```text
http://localhost:3000/admin/relatorio
```

No painel é possível acompanhar:

- Total de pessoas participantes;
- Média das avaliações recebidas;
- Distribuição dos perfis alcançados;
- Depoimentos e aprendizados enviados.

Para gerar as evidências da faculdade, clique em **“Imprimir relatório”** ou use `Ctrl+P` (`Cmd+P` no macOS). Escolha a opção **“Salvar como PDF”** no diálogo de impressão. O CSS de impressão organiza o conteúdo em formato A4.

## 🔌 Endpoints principais

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/health` | Retorna o estado de saúde da aplicação. |
| `GET` | `/api/feedback` | Lista as avaliações registradas. |
| `POST` | `/api/feedback` | Registra uma nova avaliação da comunidade. |

Exemplo de envio de avaliação:

```json
{
  "nome": "Maria",
  "perfil": "Comunidade em geral",
  "nota": 5,
  "aprendizado": "Aprendi a verificar a fonte antes de compartilhar uma notícia."
}
```

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos no contexto da extensão universitária da Unicesumar. Para reutilização, publicação ou adaptação fora desse contexto, entre em contato com o autor.

---

Desenvolvido por **Rafael Aguiar Gomes** · Engenharia de Software · Unicesumar
