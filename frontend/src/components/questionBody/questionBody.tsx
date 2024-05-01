import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./questionBody.module.scss";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavMenu } from "../navMenu/navMenu";
import { useEffect, useState } from "react";
import { OperationVariables, useMutation } from "@apollo/client";
import { useStrapiQuery } from "../../../hooks/useStrapiQuery";
import {
  SingleQuestionReturnType,
  questionByIDQuery,
} from "../../../queries/questionQueries";
import { QuestionShuffle } from "../../../utils/QuestionShuffle";
import QuestionButton from "../answerButton/answerButton";
import AnswerButton from "../answerButton/answerButton";
import { ADD_ANSWERED_QUESTION } from "../../../mutations/userMutations";
import {
  UserQuestionIDsReturnType,
  allUserQuestionIDs,
} from "../../../queries/userQueries";
import { Link } from "react-router-dom";

export default function QuestionBody({
  questionID,
  userID,
  AnswerQuestionCallback,
}: {
  questionID: string;
  userID: string;
  AnswerQuestionCallback: (questionID: string, result: boolean) => void;
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

  const [shuffled, setShuffled] = useState(false);
  const [questionAnswered, setQestionAnswered] = useState(false);

  function GetChoices() {
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

      // Shuffle questions. Using state to prevent re-shuffles after answering.
      let shuffledAnswers = answers;
      if (!shuffled) {
        shuffledAnswers = QuestionShuffle(answers);
        setShuffled(true);
      }

      return (
        <>
          {shuffledAnswers.map((answer) => {
            return (
              <AnswerButton
                questionAnswered={questionAnswered}
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

  async function CheckAnswer(isCorrect: boolean) {
    AnswerQuestionCallback(questionID, isCorrect);
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
          <div className={style.answersWrapper}>{GetChoices()}</div>
        </div>
      )}
      {/* <div className={style.questionControls}>
        <Link to={"/"}>
          <button className={style.backButton}>BACK</button>
        </Link>

        <div className={style.nextButtonWrapper} hidden={!questionAnswered}>
          <button
            className={style.nextButton}
            onClick={() => {
              window.location.reload();
            }}
          >
            NEXT QUESTION
          </button>
        </div>
      </div> */}
    </div>
  );
}
