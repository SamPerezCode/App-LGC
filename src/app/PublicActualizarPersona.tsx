import { type FC } from "react";
import Footer from "./components/layout/footer/Footer";
import SuccessModal from "./components/common/SuccessModal";
import ProgressBar from "./components/public/actualizacion/ProgressBar";
import StepSelector from "./components/public/actualizacion/StepSelector";
import StepDatosPersonales from "./components/public/actualizacion/StepDatosPersonales";
import StepContacto from "./components/public/actualizacion/StepContacto";
import StepBautismo from "./components/public/actualizacion/StepBautismo";
import StepAdultoResponsable from "./components/public/actualizacion/StepAdultoResponsable";
import StepDatosMenor from "./components/public/actualizacion/StepDatosMenor";
import StepVidaIglesiaMenor from "./components/public/actualizacion/StepVidaIglesiaMenor";
import { useActualizacionForm } from "./components/public/actualizacion/useActualizacionForm";
import { Link } from "react-router-dom";

interface PublicActualizarPersonaPageProps {
  isDark: boolean;
}

const PublicActualizarPersonaPage: FC<
  PublicActualizarPersonaPageProps
> = ({ isDark }) => {
  const {
    step,
    form,
    age,
    isMinor,
    error,
    showFinalError,
    showSuccess,
    adultoResponsable,
    buscarAdultoResponsable,
    updateField,
    setRegistrando,
    setAdultoRelacion,
    setVinculadoMinisterio,
    toggleMinisterio,
    setBautizado,
    nextStep,
    prevStep,
    submitForm,
    closeSuccess,
  } = useActualizacionForm();

  const logoSrc = isDark
    ? "/lgc-solo-manna.PNG"
    : "/lgc-solo-color.PNG";

  return (
    <div className="min-h-screen flex flex-col bg-lgc-bg dark:bg-lgc-darkBg">
      <main className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lgc-surface shadow-sm dark:bg-lgc-darkSurfaceMuted">
              <img
                src={logoSrc}
                alt="Logo LGC"
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
                Actualizacion de datos
              </h1>
              <p className="text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
                La Gran Comision - Comunidad Cristiana Integral. Toma
                1-2 minutos.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-lgc-border/60 bg-lgc-surface p-5 md:p-7 shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
            <ProgressBar current={step} />

            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
              className="mt-6 space-y-6"
            >
              {step === 1 && (
                <StepSelector
                  form={form}
                  onSetRegistrando={setRegistrando}
                />
              )}

              {step === 2 &&
                (isMinor ? (
                  <StepAdultoResponsable
                    form={form}
                    onUpdate={updateField}
                    onBuscar={buscarAdultoResponsable}
                    adultoEncontrado={adultoResponsable}
                    error={error}
                  />
                ) : (
                  <StepDatosPersonales
                    form={form}
                    age={age}
                    isMinor={isMinor}
                    onUpdate={updateField}
                  />
                ))}

              {step === 3 &&
                (isMinor ? (
                  <StepDatosMenor
                    form={form}
                    adulto={adultoResponsable}
                    onUpdate={updateField}
                    onSetRelacion={setAdultoRelacion}
                  />
                ) : (
                  <StepContacto
                    form={form}
                    onUpdate={updateField}
                    onSetVinculado={setVinculadoMinisterio}
                    onToggleMinisterio={toggleMinisterio}
                  />
                ))}

              {step === 4 &&
                (isMinor ? (
                  <StepVidaIglesiaMenor
                    form={form}
                    onUpdate={updateField}
                    onSetVinculado={setVinculadoMinisterio}
                    onToggleMinisterio={toggleMinisterio}
                    onSetBautizado={setBautizado}
                  />
                ) : (
                  <StepBautismo
                    form={form}
                    onUpdate={updateField}
                    onSetBautizado={setBautizado}
                  />
                ))}

              {step === 4 && showFinalError && error && (
                <p className="text-xs md:text-sm text-lgc-danger dark:text-lgc-darkAccent">
                  {error}
                </p>
              )}

              <div className="flex items-center justify-between pt-2">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted px-4 py-2 text-xs md:text-sm text-lgc-text hover:bg-lgc-surface
                 dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText dark:hover:bg-lgc-darkSurface"
                  >
                    Volver
                  </button>
                ) : (
                  <Link
                    to="/registro-persona"
                    className="rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted px-4 py-2 text-xs md:text-sm text-lgc-text hover:bg-lgc-surface
                 dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText dark:hover:bg-lgc-darkSurface"
                  >
                    Volver
                  </Link>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="rounded-xl bg-lgc-primary px-4 py-2 text-xs md:text-sm font-semibold text-lgc-onPrimary shadow-sm hover:bg-lgc-primarySoft
                 dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna"
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submitForm}
                    className="rounded-xl bg-lgc-primary px-4 py-2 text-xs md:text-sm font-semibold text-lgc-onPrimary shadow-sm hover:bg-lgc-primarySoft
                 dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna"
                  >
                    Finalizar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <SuccessModal
          open={showSuccess}
          title="Registro exitoso"
          message={
            form.nombreCompleto
              ? `${form.nombreCompleto} fue inscrito con exito.`
              : "La persona fue inscrita con exito."
          }
          onClose={closeSuccess}
        />
      </main>

      <Footer />
    </div>
  );
};

export default PublicActualizarPersonaPage;
