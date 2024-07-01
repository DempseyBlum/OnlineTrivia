import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./board.module.scss";
import BoardTile from "../../playerPiece/playerPiece";
import { BoardInitialiser } from "../../../../utils/boardInitialiser";
import { simpleBoxBoardTemplate } from "../../../boardTemplates/simpleBox";
import React, { useEffect } from "react";
import HexMap from "../../../boardTemplates/hexPath.svg";
import PlayerPiece from "../../playerPiece/playerPiece";

export default function BoardWithSVG({
  AskQuestionCallback,
}: {
  AskQuestionCallback: (topicID: string) => void;
}) {
  const topicIds = ["1", "2", "3", "4"];
  const boardMap = BoardInitialiser(topicIds, simpleBoxBoardTemplate);

  const svgRef = React.createRef<SVGSVGElement | null>();

  return (
    <div className={style.boardWrapper}>
      <HexMap ref={svgRef} />
      <PlayerPiece boardRef={svgRef} />
    </div>
  );
}
