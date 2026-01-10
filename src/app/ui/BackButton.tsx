import type { FC } from "react";
import Button from "./Button";

type BackButtonProps = {
  onClick: () => void;
  label?: string;
};

const BackButton: FC<BackButtonProps> = ({
  onClick,
  label = "Volver",
}) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      startIcon={
        <span
          className="h-4 w-4 bg-lgc-text dark:bg-lgc-darkText"
          style={{
            WebkitMask: "url(/back.svg) no-repeat center / contain",
            mask: "url(/back.svg) no-repeat center / contain",
          }}
        />
      }
    >
      {label}
    </Button>
  );
};

export default BackButton;
