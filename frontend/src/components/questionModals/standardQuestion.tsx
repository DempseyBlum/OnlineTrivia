import React, { useCallback, useEffect, useState } from "react";
import { titleCreator } from "../../../utils/titleCreator";
import style from "./questionStyles.module.scss";
import { useParams } from "react-router-dom";
import QuestionBody from "../questionBody/questionBody";
import { useStrapiQuery } from "../../../hooks/useStrapiQuery";
import {
  UserQuestionIDsReturnType,
  userAnsweredQuestionIDsByTopic,
} from "../../../queries/userQueries";
import { OperationVariables } from "@apollo/client";
import {
  TopicQuestionsReturnType,
  topicQuestionsQuery,
} from "../../../queries/questionQueries";

export default function StandardQuestion({
  userID,
  topicID,
  AnswerQuestionCallback,
}: {
  userID: string;
  topicID: string;
  AnswerQuestionCallback: (questionID: string, result: boolean) => void;
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
  } = useStrapiQuery(userAnsweredQuestionIDsByTopic, {
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
    if (dataAnswered && dataQuestions?.topic.data) {
      const idsToRemove =
        dataAnswered.usersPermissionsUser.data.attributes.answered_multi_choice_questions.data.map(
          (question) => question.id
        );

      const unansweredQuestions =
        dataQuestions.topic.data.attributes.multi_choice_questions.data.filter(
          (question) => !idsToRemove.includes(question.id)
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
        <QuestionBody
          questionID={questionID}
          userID={userID}
          AnswerQuestionCallback={AnswerQuestionCallback}
        ></QuestionBody>
      )}
    </div>
  );
}
