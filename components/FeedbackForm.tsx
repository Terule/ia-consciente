"use client";

import { CheckCircle2, Printer, Send, X } from "lucide-react";
import { FormEvent, useState } from "react";

type FormValues = {
  nome: string;
  perfil: string;
  nota: string;
  aprendizado: string;
};

const initialValues: FormValues = { nome: "", perfil: "", nota: "", aprendizado: "" };

export function FeedbackForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  function updateField(field: keyof FormValues, value: string) {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSending(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, nota: Number(values.nota) }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(result.error || "Não foi possível enviar sua avaliação. Tente novamente.");
        return;
      }

      setShowConfirmation(true);
      setValues(initialValues);
    } catch {
      setError("Não foi possível conectar ao formulário agora. Verifique sua internet e tente de novo.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section id="avaliacao" className="bg-blue-50 py-16 sm:py-24" aria-labelledby="feedback-title">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Sua participação importa</p>
          <h2 id="feedback-title" className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Conte o que você aprendeu
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            Sua resposta ajuda a melhorar este material educativo. Leva menos de um minuto e você não precisa informar seu nome.
          </p>
        </div>

        <form className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-800">
              Nome <span className="font-normal text-slate-500">(opcional)</span>
              <input
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                maxLength={120}
                name="nome"
                onChange={(event) => updateField("nome", event.target.value)}
                value={values.nome}
              />
            </label>
            <label className="text-sm font-semibold text-slate-800">
              Qual perfil combina mais com você?
              <select
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                name="perfil"
                onChange={(event) => updateField("perfil", event.target.value)}
                required
                value={values.perfil}
              >
                <option value="">Escolha uma opção</option>
                <option value="Estudante">Estudante</option>
                <option value="Trabalhador(a)">Trabalhador(a)</option>
                <option value="Terceira idade">Terceira idade</option>
                <option value="Comunidade em geral">Comunidade em geral</option>
              </select>
            </label>
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm font-semibold text-slate-800">Como você avalia este conteúdo?</legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5].map((rating) => (
                <label className="cursor-pointer" key={rating}>
                  <input
                    className="peer sr-only"
                    checked={values.nota === String(rating)}
                    name="nota"
                    onChange={(event) => updateField("nota", event.target.value)}
                    required
                    type="radio"
                    value={rating}
                  />
                  <span className="inline-grid size-11 place-items-center rounded-full border border-slate-300 font-bold text-slate-700 transition peer-checked:border-blue-700 peer-checked:bg-blue-700 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-blue-600 peer-focus-visible:ring-offset-2">
                    {rating}
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-2 text-sm text-slate-500">1 significa “não ajudou” e 5 significa “ajudou muito”.</p>
          </fieldset>

          <label className="mt-6 block text-sm font-semibold text-slate-800">
            O que você aprendeu ou pretende fazer diferente?
            <textarea
              className="mt-2 min-h-32 w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              maxLength={2000}
              name="aprendizado"
              onChange={(event) => updateField("aprendizado", event.target.value)}
              required
              value={values.aprendizado}
            />
          </label>

          {error && <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm font-medium text-rose-800" role="alert">{error}</p>}

          <button
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
            disabled={isSending}
            type="submit"
          >
            <Send className="size-4" aria-hidden="true" />
            {isSending ? "Enviando..." : "Enviar avaliação"}
          </button>
        </form>
      </div>

      {showConfirmation && (
        <div className="feedback-confirmation fixed inset-0 z-50 grid overflow-y-auto bg-slate-950/60 p-5 sm:place-items-center" role="dialog" aria-modal="true" aria-labelledby="confirmation-title">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white p-7 shadow-2xl sm:p-10">
            <div className="flex items-start justify-between gap-5">
              <div className="grid size-12 place-items-center rounded-full bg-emerald-100 text-emerald-700" aria-hidden="true">
                <CheckCircle2 className="size-7" />
              </div>
              <button className="no-print rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600" onClick={() => setShowConfirmation(false)} type="button" aria-label="Fechar confirmação">
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-6 text-sm font-bold uppercase tracking-wider text-blue-700">Participação registrada</p>
            <h2 id="confirmation-title" className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Obrigado por compartilhar!</h2>
            <p className="mt-4 leading-7 text-slate-700">
              Sua avaliação foi recebida com sucesso e contribuirá para o relatório de impacto deste projeto de extensão.
            </p>

            <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
              <p className="font-bold text-slate-900">Projeto: IA Consciente</p>
              <p className="mt-2">Aluno responsável: Rafael Aguiar Gomes</p>
              <p>Curso: Engenharia de Software — Unicesumar</p>
            </div>

            <div className="no-print mt-7 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" onClick={() => window.print()} type="button">
                <Printer className="size-4" aria-hidden="true" />
                Imprimir confirmação
              </button>
              <button className="rounded-xl border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" onClick={() => setShowConfirmation(false)} type="button">
                Voltar ao conteúdo
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
