import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./multiChoiceQuestion.module.scss";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavMenu } from "../navMenu/navMenu";
import { useEffect, useState } from "react";
import { OperationVariables } from "@apollo/client";
import { useStrapiQuery } from "../../../hooks/useStrapiQuery";
import {
  SingleQuestionReturnType,
  UserQuestionIDsReturnType,
  questionByIDQuery,
  userQuestionIDsByTopic,
} from "../../../queries/questionQueries";
import { shuffle } from "../../../utils/arrayShuffle";
import QuestionButton from "../answerButton/answerButton";
import AnswerButton from "../answerButton/answerButton";

export default function MultiChoiceQuestionBody({
  questionID,
}: {
  questionID: string;
}) {
  const {
    loading,
    error,
    data,
  }: {
    loading: boolean;
    error?: any;
    data: SingleQuestionReturnType | undefined;
  } = useStrapiQuery(questionByIDQuery, {
    variables: {
      questionID: questionID,
    },
  } as OperationVariables);

  function GetQuestions() {
    // Shuffle questions
    if (data) {
      const answers = [
        {
          isCorrect: true,
          answer: data.question.data.attributes.correctAnswer,
        },
        {
          isCorrect: false,
          answer: data.question.data.attributes.wrongAnswer1,
        },
        {
          isCorrect: false,
          answer: data.question.data.attributes.wrongAnswer2,
        },
        {
          isCorrect: false,
          answer: data.question.data.attributes.wrongAnswer3,
        },
      ];

      const shuffledAnswers = shuffle(answers);

      return (
        <>
          {shuffledAnswers.map((answer) => {
            return (
              <AnswerButton
                answer={answer.answer}
                isCorrect={answer.isCorrect}
                callback={CheckAnswer}
              />
            );
          })}
        </>
      );
    } else {
      return <></>;
    }
  }

  function CheckAnswer(isCorrect: boolean) {
    if (isCorrect) {
      console.log("Correct!");
    } else {
      console.log("Wrong!");
    }
  }

  return (
    <div className={style.questionWrapper}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.toString()}</p>}
      {data && (
        <div className={style.question}>
          <h2 className={style.questionHeader}>QUESTION</h2>
          <div className={style.questionText}>
            <p>{data.question.data.attributes.body}</p>
          </div>
          <div className={style.answersWrapper}>{GetQuestions()}</div>
        </div>
      )}
    </div>
  );
}
