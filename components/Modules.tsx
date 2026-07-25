"use client";

import { BrainCircuit, ChevronLeft, ChevronRight, SearchCheck, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const modules = [
  {
    icon: BrainCircuit,
    id: "entenda-a-ia",
    eyebrow: "1. Entenda sem medo",
    title: "IA é como uma ajudante que leu muitos exemplos",
    description:
      "Pense em uma pessoa que aprendeu milhares de receitas e sugere uma combinação para o jantar. A inteligência artificial faz algo parecido: observa muitos exemplos e monta uma resposta. Ela pode ajudar, mas não sabe tudo e também pode errar.",
    takeaway: "Dica prática: use a IA para ter ideias, resumir e organizar. Para decisões importantes, confira em fontes confiáveis.",
    tone: "bg-blue-50 text-blue-800 ring-blue-100",
  },
  {
    icon: SearchCheck,
    id: "confira-informacoes",
    eyebrow: "2. Pare e confira",
    title: "Uma resposta bonita não é prova de que ela está certa",
    description:
      "É como receber uma dica de caminho de alguém simpático na rua: pode ajudar, mas vale abrir o mapa antes de seguir. Um link que leva a uma página na internet também não prova que a notícia é verdadeira. Textos, imagens e áudios podem parecer reais mesmo quando têm erros ou tentam enganar.",
    takeaway: "Dica prática: antes de compartilhar, veja quem publicou, quem assina, a data e se uma fonte conhecida confirma a mesma informação.",
    tone: "bg-amber-50 text-amber-800 ring-amber-100",
  },
  {
    icon: ShieldCheck,
    id: "use-com-seguranca",
    eyebrow: "3. Proteja o que é seu",
    title: "Seus dados são como a chave da sua casa",
    description:
      "Não entregamos nossa chave a qualquer pessoa. Do mesmo jeito, evite colocar senhas, documentos, dados bancários ou histórias muito pessoais em ferramentas online. Quanto menos informação sensível você compartilhar, mais protegido estará.",
    takeaway: "Dica prática: crie senhas fortes, ative a confirmação em duas etapas e desconfie de mensagens com pressa ou promessas fáceis.",
    tone: "bg-emerald-50 text-emerald-800 ring-emerald-100",
  },
  {
    icon: SearchCheck,
    id: "pare-antes-de-compartilhar",
    eyebrow: "4. Pare antes de compartilhar",
    title: "Consumir, criar e espalhar conteúdo pede cuidado",
    description:
      "Ao consumir uma notícia, veja quem publicou e quando. Ao criar uma postagem, não invente dados, fotos ou falas para parecerem verdadeiros. Ao compartilhar, lembre-se: um encaminhamento rápido pode levar um boato para muitas pessoas.",
    takeaway: "Dica prática: se você não sabe a origem, não compartilhe. Guardar a mensagem ou perguntar antes é mais seguro do que repassar.",
    tone: "bg-violet-50 text-violet-800 ring-violet-100",
  },
];

export function Modules() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateScrollButtons() {
    const carousel = carouselRef.current;
    if (!carousel) return;

    setCanScrollLeft(carousel.scrollLeft > 4);
    setCanScrollRight(carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 4);
  }

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, []);

  function scrollCards(direction: "left" | "right") {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: (direction === "left" ? -1 : 1) * Math.round(carousel.clientWidth * 0.82),
      behavior: "smooth",
    });
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="modules-title">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Aprenda passo a passo</p>
        <h2 id="modules-title" className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Quatro ideias para usar a tecnologia com mais tranquilidade
        </h2>
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-600">Use as setas ou deslize os cartões para o lado.</p>
          <div className="flex gap-2">
            <button
              aria-controls="modules-carousel"
              aria-label="Ver cartões anteriores"
              className="grid size-10 place-items-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:border-blue-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!canScrollLeft}
              onClick={() => scrollCards("left")}
              type="button"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              aria-controls="modules-carousel"
              aria-label="Ver próximos cartões"
              className="grid size-10 place-items-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:border-blue-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!canScrollRight}
              onClick={() => scrollCards("right")}
              type="button"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          aria-label="Cartões do passo a passo"
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pr-1 scroll-smooth [scrollbar-width:thin]"
          id="modules-carousel"
          onScroll={updateScrollButtons}
          ref={carouselRef}
          role="region"
          tabIndex={0}
        >
          {modules.map(({ icon: Icon, id, eyebrow, title, description, takeaway, tone }) => (
            <article id={id} key={id} className="w-[min(22rem,85vw)] shrink-0 snap-start scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:w-96 sm:p-7">
              <div className={`grid size-12 place-items-center rounded-xl ring-1 ring-inset ${tone}`} aria-hidden="true">
                <Icon className="size-6" />
              </div>
              <p className="mt-6 text-sm font-bold text-slate-500">{eyebrow}</p>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900">{title}</h3>
              <p className="mt-4 leading-7 text-slate-700">{description}</p>
              <p className="mt-5 border-l-4 border-blue-600 pl-4 text-sm font-medium leading-6 text-slate-700">{takeaway}</p>
            </article>
          ))}
        </div>
      </div>

      <aside className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-slate-800 sm:p-7" aria-labelledby="fontes-title">
        <p className="text-sm font-bold uppercase tracking-wider text-amber-800">Antes de encaminhar</p>
        <h3 id="fontes-title" className="mt-2 text-xl font-bold">Uma página na web não é prova por si só</h3>
        <p className="mt-3 max-w-4xl leading-7">
          Qualquer pessoa pode criar uma página, usar um nome parecido com o de uma instituição ou publicar uma notícia sem mostrar de onde ela veio. Por isso, não compartilhe uma informação apenas porque ela tem link, foto ou aparência profissional.
        </p>
        <ul className="mt-4 grid gap-3 text-sm font-medium leading-6 sm:grid-cols-3">
          <li className="rounded-xl bg-white/70 p-4">1. Veja quem publicou e se a página é realmente conhecida.</li>
          <li className="rounded-xl bg-white/70 p-4">2. Confira a data, o autor e se há fontes citadas.</li>
          <li className="rounded-xl bg-white/70 p-4">3. Procure a mesma notícia em outro veículo confiável.</li>
        </ul>
      </aside>

      <aside className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-slate-800 sm:p-7" aria-labelledby="lei-fake-news-title">
        <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Cidadania digital</p>
        <h3 id="lei-fake-news-title" className="mt-2 text-xl font-bold">E a chamada “Lei das Fake News”?</h3>
        <p className="mt-3 max-w-4xl leading-7">
          No Brasil, o tema é discutido no PL 2.630/2020, conhecido como “PL das Fake News”. Ele propõe regras de liberdade, responsabilidade e transparência na internet, mas ainda é um projeto de lei em tramitação — não uma lei já aprovada. Enquanto isso, criar ou espalhar conteúdo falso pode causar danos reais e, dependendo do caso, envolver outras regras e responsabilidades.
        </p>
        <a
          className="mt-4 inline-flex rounded-lg font-semibold text-blue-800 underline decoration-2 underline-offset-4 hover:text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          href="https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2256735"
          rel="noreferrer"
          target="_blank"
        >
          Consultar a situação oficial do PL 2.630/2020 na Câmara dos Deputados
        </a>
      </aside>
    </section>
  );
}
