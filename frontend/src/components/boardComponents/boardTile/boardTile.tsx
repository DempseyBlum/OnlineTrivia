import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./boardTile.module.scss";

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
      <a href="/board" className={style.boardTile}>
        <button>{topicId}</button>
      </a>
    </div>
  );
}
