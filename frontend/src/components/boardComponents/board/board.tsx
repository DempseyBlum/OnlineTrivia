import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./board.module.scss";
import BoardTile from "../boardTile/boardTile";
import { BoardInitialiser } from "../../../../utils/boardInitialiser";
import { simpleBoxBoardTemplate } from "../../../boardTemplates/simpleBox";

export default function Board({
  AskQuestionCallback,
}: {
  AskQuestionCallback: (topicID: string) => void;
}) {
  const topicIds = ["1", "2", "3", "4"];
  const boardMap = BoardInitialiser(topicIds, simpleBoxBoardTemplate);

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
                  tileID={tile.tileID}
                  topicID={tile.topicID}
                  coordinates={{ x: columnIndex, y: rowIndex }}
                  AskQuestionCallback={AskQuestionCallback}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
