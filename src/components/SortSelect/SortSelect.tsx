import type { ChangeEvent, FC } from "react";
import s from "./index.module.css";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const SortSelect: FC<Props> = ({ value, onChange }) => {
  return (
    <select className={s.select} value={value} onChange={onChange}>
      <option value="">Sort by</option>
      <hr />
      <option value="level">Level ASC</option>
      <option value="-level">Level DESC</option>
      <option value="completed">Completed ASC</option>
      <option value="-completed">Completed DESC</option>
    </select>
  );
};

export default SortSelect;
