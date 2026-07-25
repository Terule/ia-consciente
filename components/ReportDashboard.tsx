"use client";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { AlertCircle, BarChart3, LoaderCircle, UsersRound } from "lucide-react";
import { Bar, Doughnut } from "react-chartjs-2";
import { useEffect, useMemo, useState } from "react";
import { PrintReportButton } from "@/components/PrintReportButton";

ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Tooltip);

type Feedback = {
  id: number;
  nome: string | null;
  perfil: string;
  nota: number;
  aprendizado: string;
  createdAt: string;
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom" as const, labels: { boxWidth: 12, padding: 16 } },
  },
};

export function ReportDashboard() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadFeedbacks() {
      try {
        const response = await fetch("/api/feedback", { cache: "no-store" });
        const data = (await response.json()) as Feedback[] | { error?: string };

        if (!response.ok || !Array.isArray(data)) {
          throw new Error(Array.isArray(data) ? "Não foi possível carregar os dados." : data.error);
        }

        if (isMounted) setFeedbacks(data);
      } catch {
        if (isMounted) setError("Não foi possível carregar as avaliações. Atualize a página e tente novamente.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadFeedbacks();
    return () => {
      isMounted = false;
    };
  }, []);

  const metrics = useMemo(() => {
    const total = feedbacks.length;
    const average = total ? feedbacks.reduce((sum, feedback) => sum + feedback.nota, 0) / total : 0;
    const profiles = feedbacks.reduce<Record<string, number>>((counts, feedback) => {
      counts[feedback.perfil] = (counts[feedback.perfil] || 0) + 1;
      return counts;
    }, {});

    return { average, profiles, total };
  }, [feedbacks]);

  const averageData = {
    labels: ["Média alcançada", "Até a nota máxima"],
    datasets: [
      {
        data: [metrics.average, Math.max(0, 5 - metrics.average)],
        backgroundColor: ["#1d4ed8", "#dbeafe"],
        borderWidth: 0,
      },
    ],
  };

  const profileData = {
    labels: Object.keys(metrics.profiles),
    datasets: [
      {
        label: "Participantes",
        data: Object.values(metrics.profiles),
        backgroundColor: "#0f766e",
        borderRadius: 8,
        maxBarThickness: 48,
      },
    ],
  };

  return (
    <main className="report-page mx-auto min-h-screen max-w-6xl bg-white px-5 py-8 text-slate-900 sm:px-8 sm:py-10">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b-2 border-blue-700 pb-6">
        <div>
          <span className="inline-flex rounded-full bg-blue-700 px-3 py-1 text-xs font-bold tracking-wide text-white">
            UNICESUMAR · EXTENSÃO
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Relatório de impacto — IA Consciente</h1>
          <p className="mt-2 text-slate-600">Aluno responsável: Rafael Aguiar Gomes · Engenharia de Software</p>
        </div>
        <PrintReportButton />
      </header>

      {isLoading && (
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-6 text-slate-700" role="status">
          <LoaderCircle className="size-5 animate-spin text-blue-700" aria-hidden="true" />
          Carregando os dados do relatório…
        </div>
      )}

      {error && (
        <div className="flex gap-3 rounded-xl bg-rose-50 p-6 text-rose-900" role="alert">
          <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <>
          <section className="mb-8 grid gap-4 sm:grid-cols-2" aria-label="Métricas de participação">
            <article className="rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 text-slate-600">
                <UsersRound className="size-5 text-blue-700" aria-hidden="true" />
                <p className="text-sm font-semibold">Participantes que avaliaram</p>
              </div>
              <p className="mt-3 text-4xl font-bold text-blue-700">{metrics.total}</p>
            </article>
            <article className="rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 text-slate-600">
                <BarChart3 className="size-5 text-blue-700" aria-hidden="true" />
                <p className="text-sm font-semibold">Média de satisfação</p>
              </div>
              <p className="mt-3 text-4xl font-bold text-blue-700">
                {metrics.average.toFixed(1)} <span className="text-xl">/ 5</span>
              </p>
            </article>
          </section>

          {metrics.total === 0 ? (
            <p className="rounded-xl bg-slate-50 p-6 text-slate-700">
              Ainda não há avaliações registradas. Os gráficos aparecerão assim que a comunidade enviar suas respostas.
            </p>
          ) : (
            <>
              <section className="mb-8 grid gap-6 lg:grid-cols-2" aria-label="Gráficos do relatório">
                <article className="rounded-xl border border-slate-200 p-5 shadow-sm sm:p-6">
                  <h2 className="text-lg font-bold">Média das avaliações</h2>
                  <p className="mt-1 text-sm text-slate-600">A nota vai de 1 a 5.</p>
                  <div className="report-chart mt-5 h-64">
                    <Doughnut data={averageData} options={chartOptions} />
                  </div>
                </article>
                <article className="rounded-xl border border-slate-200 p-5 shadow-sm sm:p-6">
                  <h2 className="text-lg font-bold">Perfis alcançados</h2>
                  <p className="mt-1 text-sm text-slate-600">Quantidade de participantes por perfil informado.</p>
                  <div className="report-chart mt-5 h-64">
                    <Bar
                      data={profileData}
                      options={{
                        ...chartOptions,
                        scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
                      }}
                    />
                  </div>
                </article>
              </section>

              <section aria-labelledby="testimonials-title">
                <h2 id="testimonials-title" className="mb-4 text-xl font-bold">Depoimentos e aprendizados</h2>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full min-w-[700px] border-collapse text-left text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-3">Participante</th>
                        <th className="p-3">Perfil</th>
                        <th className="p-3">Nota</th>
                        <th className="p-3">Aprendizado</th>
                        <th className="p-3">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbacks.map((feedback) => (
                        <tr className="border-t border-slate-200" key={feedback.id}>
                          <td className="p-3">{feedback.nome || "Não informado"}</td>
                          <td className="p-3">{feedback.perfil}</td>
                          <td className="p-3">{feedback.nota}/5</td>
                          <td className="p-3">{feedback.aprendizado}</td>
                          <td className="p-3">{dateFormatter.format(new Date(feedback.createdAt))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}
        </>
      )}
    </main>
  );
}
