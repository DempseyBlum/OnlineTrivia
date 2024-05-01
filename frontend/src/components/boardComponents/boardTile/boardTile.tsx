import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./boardTile.module.scss";
import { Link } from "react-router-dom";

export default function BoardTile({
  tileId,
  topicId,
  coordinates,
}: {
  tileId: number;
  topicId: number;
  coordinates: { x: number; y: number };
}) {
  return (
    <div className={style.boardTileWrapper}>
      <Link to={"/board/question/" + topicId}>
        <button>{topicId}</button>
      </Link>
    </div>
  );
}
