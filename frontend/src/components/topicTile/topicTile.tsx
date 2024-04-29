import React, { useCallback, useEffect, useState } from "react";
import { useStrapiQuery } from "../../../hooks/useStrapiQuery";
import {
  UserQuestionIDsReturnType,
  userAnsweredQuestionIDsByTopic,
} from "../../../queries/userQueries";
import { OperationVariables } from "@apollo/client";
import { Link } from "react-router-dom";
import style from "./topicTile.module.scss";
import {
  Topic,
  TopicQuestionsReturnType,
  topicQuestionsQuery,
} from "../../../queries/questionQueries";

// Not being used, but decent format for pagination in the future.
interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function HomePage({
  topic,
  userID,
}: {
  topic: Topic;
  userID: string;
}) {
  const {
    loading: loadingUserQuestionIds,
    error: errorUserQuestionIds,
    data: dataUserQuestionIds,
  }: {
    loading: boolean;
    error?: any;
    data: UserQuestionIDsReturnType | undefined;
  } = useStrapiQuery(userAnsweredQuestionIDsByTopic, {
    variables: {
      userID: userID,
      topicID: topic.id,
    },
  } as OperationVariables);

  const {
    loading: loadingTopicQuestions,
    error: errorTopicQuestions,
    data: dataTopicQuestions,
  }: {
    loading: boolean;
    error?: any;
    data: TopicQuestionsReturnType | undefined;
  } = useStrapiQuery(topicQuestionsQuery, {
    variables: {
      topicID: topic.id,
    },
  } as OperationVariables);

  return (
    <div className={style.topicTile} key={topic.id.toString()}>
      <Link to={"/topic/" + topic.id}>
        <button className={style.topicButton}>
          <h3 className={style.topicName}>{topic.attributes.display_name}</h3>
          <div className={style.topicInfo}>
            {dataUserQuestionIds && dataTopicQuestions ? (
              <p>
                Answered:{" "}
                {
                  dataUserQuestionIds.usersPermissionsUser.data.attributes
                    .answered_multi_choice_questions.data.length
                }{" "}
                /{" "}
                {
                  dataTopicQuestions.topic.data.attributes
                    .multi_choice_questions.data.length
                }
              </p>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </button>
      </Link>
    </div>
  );
}
