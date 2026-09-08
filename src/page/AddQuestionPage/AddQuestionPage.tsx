import { useActionState, type FC } from "react";
import { toast } from "react-toastify";
import { delayFn } from "../../helper/delayFn.ts";
import { QuestionForm } from "../../components/QuestionForm/index.ts";
import { Loader } from "../../components/Loader";
import type { QuestionCardStateType } from "../../types/global.types.ts";
import { useCreateCard } from "../../api/questions/index.ts";

import s from "./index.module.css";

const createQuestionAction =
  (createCardMutation: ReturnType<typeof useCreateCard>["mutateAsync"]) =>
  async (_prevState: Partial<QuestionCardStateType>, formData: FormData) => {
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

      const question = await createCardMutation(newQuestion);

      toast.success("New question is created successfully");
      return isClearForm ? {} : question;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(message);
      return {};
    }
  };

const AddQuestionPage: FC = () => {
  const { mutateAsync: createCardMutation } = useCreateCard();

  const [formState, formAction, isPending] = useActionState<Partial<QuestionCardStateType>, FormData>(
    createQuestionAction(createCardMutation),
    { clearForm: true },
  );

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
