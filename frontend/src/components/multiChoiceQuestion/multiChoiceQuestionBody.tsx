import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./multiChoiceQuestion.module.scss";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavMenu } from "../navMenu/navMenu";
import { useEffect, useState } from "react";
import { OperationVariables, useMutation } from "@apollo/client";
import { useStrapiQuery } from "../../../hooks/useStrapiQuery";
import {
  SingleQuestionReturnType,
  questionByIDQuery,
} from "../../../queries/questionQueries";
import { shuffle } from "../../../utils/arrayShuffle";
import QuestionButton from "../answerButton/answerButton";
import AnswerButton from "../answerButton/answerButton";
import { ADD_ANSWERED_QUESTION } from "../../../mutations/userMutations";
import {
  UserQuestionIDsReturnType,
  allUserQuestionIDs,
} from "../../../queries/userQueries";
import { Link } from "react-router-dom";

export default function MultiChoiceQuestionBody({
  questionID,
  userID,
}: {
  questionID: string;
  userID: string;
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

  const {
    loading: loadingUserQuestionIds,
    error: errorUserQuestionIds,
    data: dataUserQuestionIds,
  }: {
    loading: boolean;
    error?: any;
    data: UserQuestionIDsReturnType | undefined;
  } = useStrapiQuery(allUserQuestionIDs, {
    variables: {
      userID: userID,
    },
  } as OperationVariables);

  const [disableButtons, setDisableButtons] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [questionAnswered, setQestionAnswered] = useState(false);

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

      // Shuffle questions. Using state to prevent re-shuffles after answering.
      let shuffledAnswers = answers;
      if (!shuffled) {
        shuffledAnswers = shuffle(answers);
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

  const [
    updateUser,
    { data: mutateData, loading: mutateLoading, error: mutateError },
  ] = useMutation(ADD_ANSWERED_QUESTION);

  async function CheckAnswer(isCorrect: boolean) {
    setDisableButtons(true);
    setQestionAnswered(true);

    // Regardless of if they got the question right, we want to update the user's answered questions.
    if (dataUserQuestionIds) {
      const existingIds =
        dataUserQuestionIds.usersPermissionsUser.data.attributes.answered_multi_choice_questions.data.map(
          (question) => question.id
        );
      updateUser({
        variables: {
          userID: "1",
          newQuestionIDs: [questionID],
        },
      });
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
      <div className={style.questionControls}>
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
      </div>
    </div>
  );
}
