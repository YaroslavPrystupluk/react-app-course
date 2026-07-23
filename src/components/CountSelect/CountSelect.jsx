import s from "./index.module.css";

const CountSelect = ({ value, onChange, children }) => {
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
