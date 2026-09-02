import type { FC } from "react";
import s from "./index.module.css";

type Props = {
  value: string;
  onChange: () => void;
};

const SortSelect: FC<Props> = ({ value, onChange }) => {
  return (
    <select className={s.select} value={value} onChange={onChange}>
      <option value="">Sort by</option>
      <hr />
      <option value="_sort=level">Level ASC</option>
      <option value="_sort=-level">Level DESC</option>
      <option value="_sort=completed">Completed ASC</option>
      <option value="_sort=-completed">Completed DESC</option>
    </select>
  );
};

export default SortSelect;
