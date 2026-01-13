import { type FC, type ChangeEvent } from "react";
import Input from "../../../../../ui/Input";
import Button from "../../../../../ui/Button";

type PersonasListToolbarProps = {
  search: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCreate: () => void;
};

const PersonasListToolbar: FC<PersonasListToolbarProps> = ({
  search,
  onSearchChange,
  onCreate,
}) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="w-full md:max-w-sm">
        <Input
          type="text"
          placeholder="Buscar por nombre, teléfono o estado..."
          value={search}
          onChange={onSearchChange}
        />
      </div>

      <Button onClick={onCreate} variant="primary" size="md">
        Registrar persona
      </Button>
    </div>
  );
};

export default PersonasListToolbar;
