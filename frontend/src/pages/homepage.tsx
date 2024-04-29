import React, { useCallback, useEffect, useState } from "react";
import { titleCreator } from "../../utils/titleCreator";
import style from "../styles/homePage.module.scss";
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";
import {
  TopicsReturnType,
  allTopicsQuery,
} from "../../queries/questionQueries";
import { useStrapiQuery } from "../../hooks/useStrapiQuery";
import { OperationVariables } from "@apollo/client";
import MultiChoiceQuestion from "../components/multiChoiceQuestion/multiChoiceQuestion";
import { Link } from "react-router-dom";
import {
  UserQuestionIDsReturnType,
  userAnsweredQuestionIDsByTopic,
} from "../../queries/userQueries";
import TopicTile from "../components/topicTile/topicTile";

// Not being used, but decent format for pagination in the future.
interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function HomePage({ userID }: { userID: string }) {
  useEffect(() => {
    document.title = titleCreator("Homepage");
  }, []);
  const token = process.env.PUBLIC_STRAPI_API_TOKEN; // Auth not used yet.

  const {
    loading,
    error,
    data,
  }: {
    loading: boolean;
    error?: any;
    data: TopicsReturnType | undefined;
  } = useStrapiQuery(allTopicsQuery, {
    variables: {},
  } as OperationVariables);

  return (
    <div className={style.homePageWrapper}>
      <section className={style.questionSection}>
        <h2 className={style.topicsHeader}>TOPICS</h2>
        <div className={style.topicsSelector}>
          {data &&
            data.topics.data.map((topic, i) => (
              <TopicTile topic={topic} userID={userID} />
            ))}
        </div>
      </section>
    </div>
  );
}
