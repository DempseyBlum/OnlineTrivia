import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./playerPiece.module.scss";
import { Link } from "react-router-dom";
import { faChessPawn } from "@fortawesome/free-solid-svg-icons";
import React from "react";

// TODO: Need to make position code for piece relative rather than using two arbitrary numbers to adjust position.
// TODO: Need to figure out how to account for the size of the board (the board's viewbox determines it's size and coords).
// TODO: Need to have piece move along the path even around turns (when moving more than 1 increment).

export default function PlayerPiece({
  boardSVGRef,
  boardContainerRef,
}: {
  boardSVGRef: React.RefObject<SVGSVGElement | null>;
  boardContainerRef: React.RefObject<HTMLDivElement>;
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
  }, [boardSVGRef]);

  function MovePiece(increment: number) {
    if (boardSVGRef.current && pieceRef.current && boardContainerRef.current) {
      const path = boardSVGRef.current.childNodes[0] as SVGPathElement;

      const viewBoxW = boardSVGRef.current.viewBox.baseVal.width;
      const viewBoxH = boardSVGRef.current.viewBox.baseVal.width;

      const containerH = boardContainerRef.current.clientHeight;
      const containerW = boardContainerRef.current.clientWidth;

      const scaleW = containerW / viewBoxW;
      const scaleH = containerH / viewBoxH;

      const pathLength = path.getTotalLength();
      const pathCoords = path.getPointAtLength(
        (pathLength / MaxIncrements) * increment
      );

      pieceRef.current.style.left = `${
        (pathCoords.x + 64) * scaleW - pieceRef.current.clientWidth / 2
      }px`; // 64 is from a position translate in the svg file
      pieceRef.current.style.top = `${
        (pathCoords.y + 275) * scaleH - pieceRef.current.clientHeight / 2
      }px`; // 275 is from a position translate in the svg file
    }
  }

  return (
    <div className={style.playerPiece} ref={pieceRef}>
      <FontAwesomeIcon icon={faChessPawn} />
    </div>
  );
}
