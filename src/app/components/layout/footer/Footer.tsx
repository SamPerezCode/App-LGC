const Footer = () => {
  return (
    <section>
      <footer
        className="
            h-10 flex items-center justify-between
            border-t border-lgc-border/60
            bg-lgc-surface/95 px-6 text-xs
            dark:border-lgc-darkBorder/60 dark:bg-lgc-darkSurface/90
          "
      >
        <span className="text-lgc-textMuted dark:text-lgc-darkTextMuted">
          Iglesia La Gran Comisión · LGC-App
        </span>
        <span className="text-lgc-textMuted dark:text-lgc-darkTextMuted">
          v0.1 · Solo uso interno
        </span>
      </footer>
    </section>
  );
};

export default Footer;
