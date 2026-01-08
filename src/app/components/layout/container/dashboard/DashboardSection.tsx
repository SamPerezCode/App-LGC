import { useState, type FC } from "react";
import KpiCard from "./KpiCard";
import RangeSelector from "./RangeSelector";
import {
  useDashboardMetrics,
  type RangeOption,
} from "./useDashboardMetrics";

const RANGE_OPTIONS: RangeOption[] = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
];

const DashboardSection: FC = () => {
  const [range, setRange] = useState(RANGE_OPTIONS[1]);
  const metrics = useDashboardMetrics(range);

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
            Panel ejecutivo
          </h2>
          <p className="text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
            Resumen de personas, ruta y seguimiento en un
            solo lugar.
          </p>
        </div>
        <RangeSelector
          options={RANGE_OPTIONS}
          value={range}
          onChange={setRange}
        />
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.kpis.map((kpi) => (
          <KpiCard key={kpi.id} data={kpi} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
              Distribucion por estado
            </h3>
            <span className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
              Personas actuales
            </span>
          </div>

          <div className="mt-4 space-y-3 text-sm">
            {metrics.distribution.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                    {item.label}
                  </span>
                  <span className="text-xs font-medium text-lgc-text dark:text-lgc-darkText">
                    {item.value} ({item.percent}%)
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-lgc-border/40 dark:bg-lgc-darkBorder/40">
                  <div
                    className="h-full rounded-full bg-lgc-primary dark:bg-lgc-darkPrimary"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
          <h3 className="text-sm font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
            Alertas clave
          </h3>
          <div className="mt-4 space-y-3 text-sm">
            {metrics.alerts.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl border border-lgc-border/60 bg-lgc-surfaceMuted px-3 py-2 dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted"
              >
                <span className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
          <h3 className="text-sm font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
            Actividad reciente
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {metrics.recentActivity.length === 0 && (
              <li className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                No hay registros en este rango.
              </li>
            )}
            {metrics.recentActivity.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between rounded-xl border border-lgc-border/60 bg-lgc-surfaceMuted px-3 py-2 dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted"
              >
                <div>
                  <p className="text-sm font-medium text-lgc-text dark:text-lgc-darkText">
                    {item.title}
                  </p>
                  <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                    {item.subtitle} · {item.dateLabel}
                  </p>
                </div>
                <span className="text-[11px] uppercase text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  {item.kind}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
          <h3 className="text-sm font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
            Avance por paso de ruta
          </h3>
          <div className="mt-4 space-y-3">
            {metrics.routeSteps.map((step) => (
              <div key={step.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  <span>{step.name}</span>
                  <span>{step.completed} completadas</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-lgc-border/40 dark:bg-lgc-darkBorder/40">
                  <div
                    className="h-full rounded-full bg-lgc-olive dark:bg-lgc-darkPrimary"
                    style={{ width: `${step.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
