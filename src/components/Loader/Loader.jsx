import s from "./index.module.css";

const Loader = () => {
  return (
    <div className={s.backdrop}>
      <span className={s.loader}></span>;
    </div>
  );
};

export default Loader;
