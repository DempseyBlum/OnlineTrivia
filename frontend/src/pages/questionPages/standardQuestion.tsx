import React, { useCallback, useEffect, useState } from "react";
import { titleCreator } from "../../../utils/titleCreator";
import style from "../styles/homePage.module.scss";
import { useParams } from "react-router-dom";
import MultiChoiceQuestion from "../../components/multiChoiceQuestion/multiChoiceQuestion";

export default function StandardQuestion({ userID }: { userID: string }) {
  useEffect(() => {
    document.title = titleCreator("Questionpage");
  }, []);

  const { topicId } = useParams();

  return (
    <div className={style.questionPageWrapper}>
      <MultiChoiceQuestion topicID={topicId ?? ""} userID={userID} />
    </div>
  );
}
