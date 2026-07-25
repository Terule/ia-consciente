import { BrainCircuit } from "lucide-react";

const navigation = [
  { href: "#entenda-a-ia", label: "Entenda a IA" },
  { href: "#use-com-seguranca", label: "Use com segurança" },
];

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <a className="flex items-center gap-3 font-bold text-slate-900" href="#inicio">
          <span className="grid size-10 place-items-center rounded-xl bg-blue-700 text-white" aria-hidden="true">
            <BrainCircuit className="size-5" />
          </span>
          <span>IA Consciente</span>
        </a>

        <nav aria-label="Navegação principal">
          <ul className="flex items-center gap-4 text-sm font-medium text-slate-700 sm:gap-6">
            {navigation.map((item) => (
              <li key={item.href}>
                <a className="rounded-md hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
