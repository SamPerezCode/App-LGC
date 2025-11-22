const Footer = () => {
  return (
    <footer className="px-4 pb-4 md:px-6 md:pb-6">
      <div
        className="
          mx-auto flex h-10 w-full items-center justify-center
          rounded-2xl border border-lgc-border/60 bg-lgc-surface/95 px-4 text-xs
          shadow-sm
          dark:border-lgc-darkBorder/60 dark:bg-lgc-darkSurface/90
        "
      >
        <span className="text-lgc-textMuted dark:text-lgc-darkTextMuted">
          Iglesia La Gran Comisión · LGC-App - 2025
        </span>
      </div>
    </footer>
  );
};

export default Footer;
