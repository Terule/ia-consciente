import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type FeedbackInput = {
  nome?: unknown;
  perfil?: unknown;
  nota?: unknown;
  aprendizado?: unknown;
};

function parseFeedback(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return null;
  }

  const input = body as FeedbackInput;
  const nome = typeof input.nome === "string" ? input.nome.trim() : "";
  const perfil = typeof input.perfil === "string" ? input.perfil.trim() : "";
  const aprendizado = typeof input.aprendizado === "string" ? input.aprendizado.trim() : "";
  const nota = typeof input.nota === "number" ? input.nota : Number(input.nota);

  if (
    nome.length > 120 ||
    !perfil ||
    perfil.length > 80 ||
    !aprendizado ||
    aprendizado.length > 2_000 ||
    !Number.isInteger(nota) ||
    nota < 1 ||
    nota > 5
  ) {
    return null;
  }

  return { nome: nome || null, perfil, nota, aprendizado };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Envie os dados do formulário em formato JSON." }, { status: 400 });
  }

  const parsed = parseFeedback(body);

  if (!parsed) {
    return NextResponse.json(
      {
        error:
          "Informe seu perfil, uma nota inteira de 1 a 5 e o que você aprendeu. O nome é opcional.",
      },
      { status: 400 },
    );
  }

  const feedback = await prisma.feedback.create({ data: parsed });
  return NextResponse.json(feedback, { status: 201 });
}

export async function GET() {
  const feedbacks = await prisma.feedback.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(feedbacks);
}
