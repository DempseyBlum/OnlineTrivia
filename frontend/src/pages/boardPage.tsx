import React, { useCallback, useEffect, useState } from "react";
import { titleCreator } from "../../utils/titleCreator";
import style from "../styles/homePage.module.scss";
import Board from "../components/boardComponents/board/board";
import Modal from "react-modal";
import StandardQuestion from "../components/questionModals/standardQuestion";
import { ADD_ANSWERED_QUESTION } from "../../mutations/userMutations";
import { useMutation } from "@apollo/client";

export default function BoardPage({ userID }: { userID: string }) {
  useEffect(() => {
    document.title = titleCreator("Boardpage");
  }, []);

  const [topicID, setTopicID] = useState<string>("1");
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  function AskQuestion(topicID: string) {
    setTopicID(topicID);
    openModal();
  }

  const [
    updateUser,
    { data: mutateData, loading: mutateLoading, error: mutateError },
  ] = useMutation(ADD_ANSWERED_QUESTION);

  function AnswerQuestion(questionID: string, result: boolean) {
    updateUser({
      variables: {
        userID: "1",
        newQuestionIDs: [questionID],
      },
    });
    closeModal();
    // TODO: Grant player additional turn if they got question right. Otherwise, end turn.
  }

  return (
    <div className={style.boardPageWrapper}>
      <Board AskQuestionCallback={AskQuestion} />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Question Modal"
      >
        <StandardQuestion
          topicID={topicID}
          userID={userID}
          AnswerQuestionCallback={AnswerQuestion}
        />
      </Modal>
    </div>
  );
}
