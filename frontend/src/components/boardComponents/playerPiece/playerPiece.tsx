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

      // Calc relative postion of Path coordinates relative to size of the SVG
      const viewBoxW = boardSVGRef.current.viewBox.baseVal.width;
      const viewBoxH = boardSVGRef.current.viewBox.baseVal.width;

      const currentH = boardSVGRef.current.clientHeight;
      const currentW = boardSVGRef.current.clientWidth;

      const scaleW = currentW / viewBoxW;
      const scaleH = currentH / viewBoxH;

      // Calc offset of Path coordinates relative to parent container
      // NOTE: Board is always smaller or same size at container
      const containerW = boardContainerRef.current.clientWidth;
      const containerH = boardContainerRef.current.clientHeight;
      const widthOffset = (containerW - currentW) / 2;
      const heightOffset = (containerH - currentH) / 2;

      const pathLength = path.getTotalLength();
      const pathCoords = path.getPointAtLength(
        (pathLength / MaxIncrements) * increment
      );

      pieceRef.current.style.left = `${
        (pathCoords.x - 64) * scaleW -
        pieceRef.current.clientWidth / 2 +
        widthOffset
      }px`; // 64 is from a position translate in the svg file
      pieceRef.current.style.top = `${
        (pathCoords.y + 275) * scaleH -
        pieceRef.current.clientHeight / 2 +
        heightOffset
      }px`; // 275 is from a position translate in the svg file
    }
  }

  return (
    <div className={style.playerPiece} ref={pieceRef}>
      <FontAwesomeIcon icon={faChessPawn} />
    </div>
  );
}
