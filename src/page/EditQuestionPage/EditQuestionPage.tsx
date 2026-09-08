import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import EditQuestion from "./EditQuestion";
import { useGetCard } from "../../api/questions";

const EditQuestionPage = () => {
  const { id } = useParams();

  const { data: question, isPending: isQuestionLoading } = useGetCard(id ?? "");

  return (
    <>
      {isQuestionLoading && <Loader />}
      {question && <EditQuestion initialState={question} />}
    </>
  );
};

export default EditQuestionPage;
