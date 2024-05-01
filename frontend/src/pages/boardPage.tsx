import React, { useCallback, useEffect, useState } from "react";
import { titleCreator } from "../../utils/titleCreator";
import style from "../styles/homePage.module.scss";
import Board from "../components/boardComponents/board/board";

export default function BoardPage({ userID }: { userID: string }) {
  useEffect(() => {
    document.title = titleCreator("Boardpage");
  }, []);

  return (
    <div className={style.boardPageWrapper}>
      <Board />
    </div>
  );
}
