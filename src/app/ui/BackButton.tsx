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
        <span className="text-base leading-none">{"←"}</span>
      }
    >
      {label}
    </Button>
  );
};

export default BackButton;
