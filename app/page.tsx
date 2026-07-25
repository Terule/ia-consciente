import { FeedbackForm } from "@/components/FeedbackForm";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Modules } from "@/components/Modules";
import { QuizModule } from "@/components/QuizModule";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Modules />
        <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24">
          <QuizModule />
        </section>
        <FeedbackForm />
      </main>
      <footer className="border-t border-slate-200 bg-white px-5 py-8 text-center text-sm text-slate-600 sm:px-8">
        Projeto de extensão universitária · IA Consciente
      </footer>
    </>
  );
}
