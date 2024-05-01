import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./board.module.scss";
import BoardTile from "../boardTile/boardTile";
import { BoardInitialiser } from "../../../../utils/boardInitialiser";
import { simpleBoxBoardTemplate } from "../../../boardTemplates/simpleBox";

export default function Board({}: {}) {
  const topicIds = [1, 2, 3, 4];
  const boardMap = BoardInitialiser(topicIds, simpleBoxBoardTemplate);

  console.log(boardMap);

  return (
    <div className={style.boardWrapper}>
      {boardMap.map((row, rowIndex) => {
        return (
          <div className={style.boardRow}>
            {row.map((tile, columnIndex) => {
              if (tile === null) {
                return <div className={style.boardTile}></div>;
              }
              return (
                <BoardTile
                  tileId={tile.tileId}
                  topicId={tile.topicId}
                  coordinates={{ x: columnIndex, y: rowIndex }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
