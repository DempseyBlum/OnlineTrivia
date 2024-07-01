import style from "./boardTile.module.scss";
import React from "react";

export default function BoardTile({
  boardRef,
}: {
  boardRef: React.RefObject<SVGSVGElement | null>;
}) {
  return <div className={style.boardTile}></div>;
}
