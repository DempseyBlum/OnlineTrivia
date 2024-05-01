import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./boardTile.module.scss";
import { Link } from "react-router-dom";

export default function BoardTile({
  tileID,
  topicID,
  coordinates,
  AskQuestionCallback,
}: {
  tileID: number;
  topicID: string;
  coordinates: { x: number; y: number };
  AskQuestionCallback: (topicID: string) => void;
}) {
  function SelectQuestion() {
    AskQuestionCallback(topicID);
  }

  return (
    <div className={style.boardTileWrapper}>
      <button onClick={SelectQuestion} className={style.boardTileButton}>
        {topicID}
      </button>
    </div>
  );
}
