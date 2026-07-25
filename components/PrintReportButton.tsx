"use client";

export function PrintReportButton() {
  return (
    <button
      className="no-print rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800"
      onClick={() => window.print()}
      type="button"
    >
      Imprimir relatório
    </button>
  );
}
