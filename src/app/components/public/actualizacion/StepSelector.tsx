import type { FC } from "react";
import type { UpdateForm } from "./actualizacion.types";

type StepSelectorProps = {
  form: UpdateForm;
  onSetRegistrando: (value: "self" | "other") => void;
};

const StepSelector: FC<StepSelectorProps> = ({
  form,
  onSetRegistrando,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
        Paso 1 de 4. A quien estas registrando?
      </h2>

      <div className="flex flex-wrap gap-3">
        <label className="flex items-center gap-2 rounded-full border border-lgc-border/60 bg-lgc-surfaceMuted/80 px-4 py-2 text-sm text-lgc-text dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText">
          <input
            type="radio"
            name="registrando"
            value="self"
            checked={form.registrando === "self"}
            onChange={() => onSetRegistrando("self")}
            className="h-4 w-4 accent-lgc-primary dark:accent-lgc-darkPrimary"
          />
          Registrar mayor de edad
        </label>

        <label className="flex items-center gap-2 rounded-full border border-lgc-border/60 bg-lgc-surfaceMuted/80 px-4 py-2 text-sm text-lgc-text dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText">
          <input
            type="radio"
            name="registrando"
            value="other"
            checked={form.registrando === "other"}
            onChange={() => onSetRegistrando("other")}
            className="h-4 w-4 accent-lgc-primary dark:accent-lgc-darkPrimary"
          />
          Registrar menor de edad
        </label>
      </div>

      <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
        Al continuar te guiaremos paso a paso.
      </p>
    </div>
  );
};

export default StepSelector;
