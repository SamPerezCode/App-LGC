// src/app/components/layout/container/Contain.tsx
const Contain = () => {
  return (
    <main className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6">
      <div
        className="
          rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 shadow-sm
          dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted
        "
      >
        <p className="text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
          Aquí irá el contenido del módulo seleccionado (por ahora, podemos dejarlo vacío o con
          tarjetas de ejemplo).
        </p>
      </div>
    </main>
  );
};

export default Contain;
