import React, { useCallback, useEffect, useState } from "react";
import { titleCreator } from "../../utils/titleCreator";
import style from "../styles/topicPage.module.scss";
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";
import {
  TopicsReturnType,
  allTopicsQuery,
} from "../../queries/questionQueries";
import { useStrapiQuery } from "../../hooks/useStrapiQuery";
import { OperationVariables } from "@apollo/client";
import MultiChoiceQuestion from "../components/multiChoiceQuestion/multiChoiceQuestion";
import { Link, useParams } from "react-router-dom";

const API_KEY = process.env.NEXT_PUBLIC_CHATGPT_API_KEY;

export default function TopicPage() {
  useEffect(() => {
    document.title = titleCreator("Topic");
  }, []);

  const { topicId } = useParams();

  return (
    <div className={style.topicPageWrapper}>
      <section className={style.questionSection}>
        <MultiChoiceQuestion topicID={topicId ?? ""} userID={"1"} />
      </section>
    </div>
  );
}
