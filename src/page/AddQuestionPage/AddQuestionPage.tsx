import { useActionState, type FC } from "react";
import { toast } from "react-toastify";
import { delayFn } from "../../helper/delayFn.ts";
import { API_URL } from "../../constants/global.constants.ts";
import { QuestionForm } from "../../components/QuestionForm/index.ts";
import { Loader } from "../../components/Loader";

import s from "./index.module.css";
import type { QuestionCardStateType } from "../../types/global.types.ts";

const createQuestionAction = async (_prevState: Partial<QuestionCardStateType>, formData: FormData) => {
  try {
    await delayFn();
    const resourcesValue = formData.get("resources");

    const newLevel = formData.get("level");
    const isClearForm = formData.get("clearForm");
    const newResources = typeof resourcesValue === "string" ? resourcesValue.trim().split(",") : [];
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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    toast.error(message);
    return {};
  }
};

const AddQuestionPage: FC = () => {
  const [formState, formAction, isPending] = useActionState<Partial<QuestionCardStateType>, FormData>(createQuestionAction, {
    clearForm: true,
  });
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
