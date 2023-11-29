import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./answerButton.module.scss";

export default function AnswerButton({
  answer,
  callback,
  isCorrect,
}: {
  answer: string;
  callback: (isCorrect: boolean) => void;
  isCorrect: boolean;
}) {
  function CheckAnswer() {
    callback(isCorrect);
  }

  return <button onClick={CheckAnswer}>{answer}</button>;
}
