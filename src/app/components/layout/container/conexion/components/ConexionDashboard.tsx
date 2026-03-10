import type { FC } from "react";
import type { ConexionMetrics } from "../hooks/useConexionMetrics";

type ConexionDashboardProps = {
  metrics: ConexionMetrics;
};

const ConexionDashboard: FC<ConexionDashboardProps> = ({ metrics }) => {
  const kpis = [
    {
      label: "Total Personas",
      value: metrics.totalPersonas,
      change: "+12%",
      changeType: "positive" as const,
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      bgColor: "bg-slate-50 dark:bg-slate-800/50",
      iconColor: "text-slate-600 dark:text-slate-400",
    },
    {
      label: "Nuevos Creyentes",
      value: metrics.nuevos,
      sublabel: "Requieren seguimiento",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      iconColor: "text-amber-600 dark:text-amber-400",
      valueColor: "text-amber-700 dark:text-amber-400",
    },
    {
      label: "Asistentes Regulares",
      value: metrics.asistentesRegulares,
      sublabel: "En proceso",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      valueColor: "text-blue-700 dark:text-blue-400",
    },
    {
      label: "Miembros",
      value: metrics.miembros,
      sublabel: "Integrados",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      valueColor: "text-emerald-700 dark:text-emerald-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="
            group relative overflow-hidden rounded-xl border border-lgc-border/40
            bg-white p-5 transition-all duration-200
            hover:border-lgc-border hover:shadow-lg hover:shadow-lgc-primary/5
            dark:border-lgc-darkBorder/40 dark:bg-lgc-darkSurface
            dark:hover:border-lgc-darkBorder dark:hover:shadow-lgc-darkPrimary/5
          "
        >
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-lgc-textMuted dark:text-lgc-darkTextMuted">
                {kpi.label}
              </p>
              <p className={`text-3xl font-bold tabular-nums ${kpi.valueColor ?? "text-lgc-text dark:text-lgc-darkText"}`}>
                {kpi.value}
              </p>
              {kpi.sublabel && (
                <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  {kpi.sublabel}
                </p>
              )}
            </div>
            <div className={`rounded-lg p-2.5 ${kpi.bgColor}`}>
              <span className={kpi.iconColor}>{kpi.icon}</span>
            </div>
          </div>

          {/* Decorative gradient */}
          <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-lgc-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-lgc-darkPrimary/10" />
        </div>
      ))}
    </div>
  );
};

export default ConexionDashboard;
