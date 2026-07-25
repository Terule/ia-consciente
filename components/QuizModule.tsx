"use client";

import { CheckCircle2, CircleHelp, RotateCcw, XCircle } from "lucide-react";
import { useState } from "react";

type Answer = "verdade" | "falso";

const questions: Array<{
  statement: string;
  answer: Answer;
  explanation: string;
}> = [
  {
    statement: "Uma imagem muito realista na internet pode ter sido criada por inteligência artificial.",
    answer: "verdade",
    explanation:
      "Verdadeiro. Hoje é possível criar imagens e vídeos bastante convincentes. Antes de acreditar ou compartilhar, procure a origem e veja se uma fonte conhecida confirmou a informação.",
  },
  {
    statement: "Se uma ferramenta de IA responde com segurança, a resposta sempre está correta.",
    answer: "falso",
    explanation:
      "Falso. A IA pode errar e até inventar informações. Pense nela como uma sugestão de caminho: é útil, mas vale conferir o mapa antes de seguir.",
  },
  {
    statement: "É mais seguro evitar colocar senhas, dados bancários ou documentos em uma conversa com IA.",
    answer: "verdade",
    explanation:
      "Verdadeiro. Esses dados são como a chave da sua casa: devem ficar protegidos. Compartilhe somente o necessário e prefira serviços confiáveis.",
  },
];

export function QuizModule() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const question = questions[questionIndex];
  const answered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question.answer;
  const isLastQuestion = questionIndex === questions.length - 1;

  function answerQuestion(answer: Answer) {
    if (answered) return;

    setSelectedAnswer(answer);
    if (answer === question.answer) setScore((currentScore) => currentScore + 1);
  }

  function continueQuiz() {
    if (isLastQuestion) {
      setIsCompleted(true);
      return;
    }

    setQuestionIndex((currentIndex) => currentIndex + 1);
    setSelectedAnswer(null);
  }

  function restartQuiz() {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsCompleted(false);
  }

  if (isCompleted) {
    const tips =
      score === questions.length
        ? [
            "Continue verificando a fonte e a data antes de repassar uma informação.",
            "Compartilhe esse cuidado com familiares e amigos: uma conversa pode evitar um golpe ou boato.",
          ]
        : score === questions.length - 1
          ? [
              "Você já está no caminho certo. Antes de compartilhar, compare a informação com uma fonte conhecida.",
              "Quando algo causar dúvida, prefira parar e pesquisar a repassar na pressa.",
            ]
          : [
              "Desconfie de mensagens que pedem decisão imediata, prometem algo fácil ou causam muito medo.",
              "Procure a origem da informação e peça ajuda a alguém de confiança quando tiver dúvida.",
            ];

    return (
      <section id="quiz" className="rounded-2xl bg-slate-950 p-7 text-white sm:p-10" aria-labelledby="quiz-title">
        <p className="text-sm font-bold uppercase tracking-wider text-blue-300">Verdadeiro ou Falso</p>
        <h2 id="quiz-title" className="mt-3 text-3xl font-bold">Você concluiu o quiz!</h2>
        <p className="mt-4 max-w-xl text-lg leading-8 text-slate-200">
          Você acertou {score} de {questions.length}. O importante é lembrar: antes de confiar ou compartilhar, pare um instante e confira.
        </p>
        <div className="mt-6 max-w-2xl rounded-xl bg-white/10 p-5">
          <h3 className="font-bold text-white">Dicas para levar com você</h3>
          <ul className="mt-3 space-y-2 text-slate-200">
            {tips.map((tip) => (
              <li className="flex gap-2" key={tip}>
                <span aria-hidden="true">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
        <button
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950"
          type="button"
          onClick={restartQuiz}
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Jogar novamente
        </button>
      </section>
    );
  }

  return (
    <section id="quiz" className="rounded-2xl bg-slate-950 p-7 text-white sm:p-10" aria-labelledby="quiz-title">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-blue-300">Verdadeiro ou Falso</p>
          <h2 id="quiz-title" className="mt-3 text-3xl font-bold">Vamos testar o que você aprendeu?</h2>
        </div>
        <p className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-slate-200">
          {questionIndex + 1} de {questions.length}
        </p>
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 text-slate-900 sm:p-8">
        <CircleHelp className="size-7 text-blue-700" aria-hidden="true" />
        <p className="mt-4 text-xl font-bold leading-8">{question.statement}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2" aria-label="Escolha sua resposta">
          {(["verdade", "falso"] as const).map((answer) => {
            const wasSelected = selectedAnswer === answer;
            const showsCorrect = answered && answer === question.answer;
            const showsIncorrect = answered && wasSelected && !isCorrect;
            const style = showsCorrect
              ? "border-emerald-600 bg-emerald-50 text-emerald-900"
              : showsIncorrect
                ? "border-rose-600 bg-rose-50 text-rose-900"
                : "border-slate-300 bg-white hover:border-blue-600 hover:bg-blue-50";

            return (
              <button
                className={`rounded-xl border-2 px-5 py-4 text-left font-bold transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-default ${style}`}
                disabled={answered}
                key={answer}
                onClick={() => answerQuestion(answer)}
                type="button"
              >
                {answer === "verdade" ? "Verdadeiro" : "Falso"}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={`mt-6 rounded-xl p-5 ${isCorrect ? "bg-emerald-50" : "bg-amber-50"}`} role="status">
            <div className="flex gap-3">
              {isCorrect ? (
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-700" aria-hidden="true" />
              ) : (
                <XCircle className="mt-0.5 size-5 shrink-0 text-amber-700" aria-hidden="true" />
              )}
              <div>
                <p className="font-bold text-slate-900">{isCorrect ? "Isso mesmo!" : "Quase lá — veja por quê:"}</p>
                <p className="mt-1 leading-7 text-slate-700">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {answered && (
          <button
            className="mt-6 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            onClick={continueQuiz}
            type="button"
          >
            {isLastQuestion ? "Finalizar quiz" : "Próxima pergunta"}
          </button>
        )}
      </div>
    </section>
  );
}
