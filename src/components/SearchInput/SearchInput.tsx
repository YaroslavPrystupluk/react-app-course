import { useId, type FC } from "react";
import { SearchIcon } from "../icons";
import s from "./index.module.css";

type Props = {
  value: string;
  onChange: () => void;
};

const SearchInput: FC<Props> = ({ value, onChange }) => {
  const inputId = useId();

  return (
    <div className={s.inputWrapper}>
      <label htmlFor={inputId}>
        <SearchIcon className={s.searchIcon} />
      </label>
      <input className={s.input} type="text" id={inputId} value={value} onChange={onChange} placeholder="Пошук..." />
    </div>
  );
};

export default SearchInput;
