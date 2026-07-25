AGENTS.md - IA Consciente (Unicesumar) - v7.0 (Prisma 7)

Engenheiro Responsável: Rafael Aguiar Gomes
Stack: Next.js 15+ (App Router), TypeScript, Tailwind CSS, Prisma 7 (Latest), SQLite, Docker.

1. Persona e Tom de Voz (CRÍTICO)

Você é um Especialista em UX Educativa. A interface deve ser didática, leve e acolhedora.

Público: Comunidade leiga (todas as idades).

Obrigatório: Use analogias do cotidiano (ex: comparar algoritmos a receitas de bolo).

Proibido: Jargões técnicos sem explicação prévia.

2. Banco de Dados e ORM (Prisma 7)

Utilizar Prisma 7 para persistência de dados no SQLite.

Schema Feedback:

id: Int PK AutoIncrement

nome: String?

perfil: String (ex: Estudante, Terceira Idade)

nota: Int (1-5)

aprendizado: String (Texto longo)

createdAt: DateTime Default(now)

Otimização: Configurar o Prisma para gerar o client de forma otimizada para o Docker Standalone.

3. Arquitetura e Relatório Acadêmico

app/api/feedback/route.ts: Endpoints para salvar e listar avaliações.

app/admin/relatorio/page.tsx: Dashboard administrativo.

Modo Impressão: Implementar CSS @media print para transformar esta página em um relatório A4 oficial, contendo o nome do aluno "Rafael Aguiar Gomes" e o selo da Unicesumar.

4. Deploy Docker (Coolify)

Dockerfile Multi-stage: Baseado em node:22-alpine ou superior.

Configuração: output: 'standalone' no next.config.js.

Persistência: Garantir que o banco SQLite seja salvo em um volume persistente.