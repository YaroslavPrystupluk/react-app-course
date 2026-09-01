import { useActionState } from "react";
import { toast } from "react-toastify";
import { delayFn } from "../../helper/delayFn";
import { API_URL } from "../../constants/global.constants.js";
import { QuestionForm } from "../../components/QuestionForm/index.js";

import s from "./index.module.css";
import Loader from "../../components/Loader/Loader.jsx";

const createQuestionAction = async (_prevState, formData) => {
  try {
    await delayFn();
    const newLevel = formData.get("level");
    const isClearForm = formData.get("clearForm");
    const newResources = formData.get("resources").split(",");
    const newQuestion = {
      ...Object.fromEntries(formData),
      resources: newResources,
      level: Number(newLevel),
      completed: false,
      editDate: undefined,
    };

    const response = await fetch(`${API_URL}/react`, {
      method: "POST",
      body: JSON.stringify(newQuestion),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const question = await response.json();
    toast.success("New question is created successfully");
    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error.message);
    return {};
  }
};

const AddQuestionPage = () => {
  const [formState, formAction, isPending] = useActionState(createQuestionAction, { clearForm: true });
  return (
    <>
      {isPending && <Loader />}
      <h1 className={s.formTitle}>Add new question</h1>
      <div className={s.formContainer}>
        <QuestionForm formState={formState} formAction={formAction} isPending={isPending} submitBtnText="Add question" />
      </div>
    </>
  );
};

export default AddQuestionPage;
