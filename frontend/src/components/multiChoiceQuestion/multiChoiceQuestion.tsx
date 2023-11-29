import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./multiChoiceQuestion.module.scss";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavMenu } from "../navMenu/navMenu";
import { useEffect, useState } from "react";
import { OperationVariables } from "@apollo/client";
import { useStrapiQuery } from "../../../hooks/useStrapiQuery";
import {
  UserQuestionIDsReturnType,
  userQuestionIDsByTopic,
} from "../../../queries/questionQueries";
import MultiChoiceQuestionBody from "./multiChoiceQuestionBody";

export default function MultiChoiceQuestion({
  topicID,
  userID,
}: {
  topicID: string;
  userID: string;
}) {
  // Get question IDs that User hasn't had yet. Then pick randomely and bring that one down.

  const {
    loading,
    error,
    data,
  }: {
    loading: boolean;
    error?: any;
    data: UserQuestionIDsReturnType | undefined;
  } = useStrapiQuery(userQuestionIDsByTopic, {
    variables: {
      userID: userID,
      topicID: topicID,
    },
  } as OperationVariables);

  const [questionID, setQuestionID] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (data) {
      const randomIndex = Math.floor(
        Math.random() *
          data.usersPermissionsUser.data.attributes
            .answered_multi_choice_questions.data.length
      );
      setQuestionID(
        data.usersPermissionsUser.data.attributes
          .answered_multi_choice_questions.data[randomIndex].id
      );
    }
  }, [data]);

  return (
    <div className={style.questionWrapper}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.toString()}</p>}
      {data && questionID && (
        <MultiChoiceQuestionBody
          questionID={questionID}
        ></MultiChoiceQuestionBody>
      )}
    </div>
  );
}
