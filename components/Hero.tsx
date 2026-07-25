import { ArrowDown, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-28" aria-labelledby="hero-title">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.35),_transparent_42%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-100 ring-1 ring-inset ring-blue-300/30">
            <Sparkles className="size-4" aria-hidden="true" />
            Um guia simples para o dia a dia
          </p>
          <h1 id="hero-title" className="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            Tecnologia pode ajudar. Você continua no comando.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
            Vamos entender a inteligência artificial com calma, reconhecer informações duvidosas e proteger seus dados — sem complicação.
          </p>
          <a
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 shadow-lg shadow-blue-950/30 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950"
            href="#entenda-a-ia"
          >
            Começar a aprender
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
