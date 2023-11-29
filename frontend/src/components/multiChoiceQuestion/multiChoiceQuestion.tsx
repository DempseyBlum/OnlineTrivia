import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./multiChoiceQuestion.module.scss";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavMenu } from "../navMenu/navMenu";
import { useEffect, useState } from "react";
import { OperationVariables } from "@apollo/client";
import { useStrapiQuery } from "../../../hooks/useStrapiQuery";
import {
  TopicQuestionsReturnType,
  UserQuestionIDsReturnType,
  topicQuestionsQuery,
  userQuestionIDsByTopic,
} from "../../../queries/questionQueries";
import MultiChoiceQuestionBody from "./multiChoiceQuestionBody";

export default function MultiChoiceQuestion({
  topicID,
  userID,
}: {
  topicID: string;
  userID: string;
}) {
  // Get question IDs that User hasn't had yet. Then pick randomely and bring that one down.

  const {
    loading: loadingAnswered,
    error: errorAnswered,
    data: dataAnswered,
  }: {
    loading: boolean;
    error?: any;
    data: UserQuestionIDsReturnType | undefined;
  } = useStrapiQuery(userQuestionIDsByTopic, {
    variables: {
      userID: userID,
      topicID: topicID,
    },
  } as OperationVariables);

  const {
    loading: loadingQuestions,
    error: errorQuestions,
    data: dataQuestions,
  }: {
    loading: boolean;
    error?: any;
    data: TopicQuestionsReturnType | undefined;
  } = useStrapiQuery(topicQuestionsQuery, {
    variables: {
      topicID: topicID,
    },
  } as OperationVariables);

  const [questionID, setQuestionID] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (dataAnswered && dataQuestions) {
      console.log("dataAnswered", dataAnswered);
      console.log("dataQuestions", dataQuestions);
      const unansweredQuestions =
        dataQuestions.topic.data.attributes.multi_choice_questions.data.filter(
          (question) =>
            !dataAnswered.usersPermissionsUser.data.attributes.answered_multi_choice_questions.data.includes(
              question
            )
        );

      const randomIndex = Math.floor(
        Math.random() * unansweredQuestions.length
      );
      setQuestionID(unansweredQuestions[randomIndex].id);
    }
  }, [dataAnswered, dataQuestions]);

  return (
    <div className={style.questionWrapper}>
      {(loadingAnswered || loadingQuestions) && <p>Loading...</p>}
      {(errorAnswered || errorQuestions) && (
        <>
          <p>Error: {errorAnswered.toString()}</p>
          <p>Error: {errorQuestions.toString()}</p>
        </>
      )}
      {(dataAnswered || dataQuestions) && questionID && (
        <MultiChoiceQuestionBody
          questionID={questionID}
        ></MultiChoiceQuestionBody>
      )}
    </div>
  );
}
