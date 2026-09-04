import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { API_URL } from "../../constants/global.constants";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import EditQuestion from "./EditQuestion";
import type { QuestionCardType } from "../../types/global.types";

const EditQuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<QuestionCardType | null>(null);

  const [fetchQuestions, isQuestionLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${id}`);

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    setQuestion(data);
  });

  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isQuestionLoading && <Loader />}
      {question && <EditQuestion initialState={question} />}
    </>
  );
};

export default EditQuestionPage;
