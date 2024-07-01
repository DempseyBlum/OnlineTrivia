import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./playerPiece.module.scss";
import { Link } from "react-router-dom";
import { faChessPawn } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function BoardTile({
  boardRef,
}: {
  boardRef: React.RefObject<SVGSVGElement | null>;
}) {
  const pieceRef = React.createRef<HTMLDivElement>();

  const MaxIncrements = 6;

  React.useEffect(() => {
    MovePiece(0); // Piece initiates at position 0.

    let increment = 1; // Start count at 1 due to piece beginning at position 0.

    const interval = setInterval(() => {
      MovePiece(increment);
      if (increment < MaxIncrements - 1) {
        increment += 1;
      } else {
        increment = 0;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [boardRef]);

  function MovePiece(increment: number) {
    if (boardRef.current && pieceRef.current) {
      const path = boardRef.current.childNodes[0] as SVGPathElement;

      const pathLength = path.getTotalLength();
      const pathCoords = path.getPointAtLength(
        (pathLength / MaxIncrements) * increment
      );

      pieceRef.current.style.left = `${
        pathCoords.x + pieceRef.current.clientWidth / 2 + 50
      }px`;
      pieceRef.current.style.top = `${
        pathCoords.y + pieceRef.current.clientHeight / 2 + 270
      }px`;
    }
  }

  return (
    <div className={style.playerPiece} ref={pieceRef}>
      <FontAwesomeIcon icon={faChessPawn} />
    </div>
  );
}
