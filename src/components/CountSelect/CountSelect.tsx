import type { ChangeEvent, FC } from "react";
import s from "./index.module.css";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const CountSelect: FC<Props> = ({ value, onChange }) => {
  return (
    <select className={s.select} value={value} onChange={onChange}>
      <option disabled>Count</option>
      <hr />
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="40">40</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  );
};

export default CountSelect;
