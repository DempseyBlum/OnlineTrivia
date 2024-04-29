import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./answerButton.module.scss";
import { useEffect, useState } from "react";

export default function AnswerButton({
  answer,
  callback,
  isCorrect,
  questionAnswered,
}: {
  answer: string;
  callback: (isCorrect: boolean) => void;
  isCorrect: boolean;
  questionAnswered: boolean;
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [className, setClassName] = useState(style.answerButton);

  function CheckAnswer() {
    setIsClicked(true);
    callback(isCorrect);
  }

  useEffect(() => {
    if (isClicked) {
      if (isCorrect) {
        setClassName(style.correctButton);
      } else {
        setClassName(style.incorrectButton);
      }
      return;
    }

    if (questionAnswered) {
      if (isCorrect) {
        setClassName(style.correctButtonDisabled);
      }
      return;
    }

    setClassName(style.answerButton);
  }, [isClicked, questionAnswered]);

  return (
    <div className={style.buttonWrapper}>
      <button
        className={className}
        disabled={questionAnswered}
        onClick={CheckAnswer}
      >
        {answer}
      </button>
    </div>
  );
}
