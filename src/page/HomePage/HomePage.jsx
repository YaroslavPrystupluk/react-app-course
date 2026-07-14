import { QuestionCard } from "../../components/QuestionCard";

import s from "./index.module.css";

const cards = [
  {
    id: "1",
    question: "Що таке React?",
    answer: "React — це бібліотека для створення користувацьких інтерфейсів.",
    description:
      "React — це JavaScript-бібліотека, розроблена Facebook, яка використовується для побудови UI з компонентним підходом. React дає змогу створювати користувацькі інтерфейси з окремих частин, які називаються компонентами.",
    resources: ["https://react.dev", "https://react.dev/reference/react"],
    level: 1,
    completed: true,
    editDate: "03.02.2025, 19:49",
  },
  {
    id: "2",
    question: "Що таке JSX?",
    answer: "JSX — це синтаксичне розширення JavaScript для React.",
    description:
      "JSX дає змогу писати HTML-подібний код у JavaScript, який потім транспілюється у виклики `React.createElement`. Він спрощує створення та візуальне представлення структури компонентів.",
    resources: ["https://react.dev/learn/writing-markup-with-jsx"],
    level: 2,
    completed: false,
    editDate: "03.02.2025, 20:25",
  },
  {
    id: "3",
    question: "Який основний принцип роботи React?",
    answer: "React використовує Virtual DOM для оптимізації рендерингу.",
    description:
      "React підтримує концепцію Virtual DOM — це представлення реального DOM у пам’яті. Коли стан компонента змінюється, React порівнює Virtual DOM із попереднім станом і оновлює лише змінені елементи на сторінці.",
    resources: ["https://react.dev/learn/render-and-commit"],
    level: 2,
    completed: false,
    editDate: "03.02.2025, 19:01",
  },
  {
    id: "4",
    question: "Як створити компонент у React?🍩",
    answer: "Компонент можна створити як функцію або клас.",
    description:
      "Функціональні компоненти — це функції, які приймають `props` і повертають JSX. Класові компоненти — це класи, успадковані від `React.Component`, із методом `render`.",
    resources: ["https://react.dev/learn/your-first-component"],
    level: 1,
    completed: false,
    editDate: "21.02.2025, 20:26",
  },
];

const HomePage = () => {
  return (
    <>
      HomePage
      {cards.map((card) => (
        <QuestionCard card={card} key={card.id} />
      ))}
    </>
  );
};

export default HomePage;
