import { gql } from "@apollo/client";

export interface UserQuestionIDsReturnType {
  usersPermissionsUser: {
    data: {
      attributes: {
        answered_multi_choice_questions: {
          data: {
            id: string;
          }[];
        };
      };
    };
  };
}

export const allUserQuestionIDs = gql`
  query GetAllUserQuestionIDs($userID: ID!) {
    usersPermissionsUser(id: $userID) {
      data {
        attributes {
          answered_multi_choice_questions {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

export const userQuestionIDsByTopic = gql`
  query GetUserQuestionIDsByTopic($userID: ID!, $topicID: ID!) {
    usersPermissionsUser(id: $userID) {
      data {
        attributes {
          answered_multi_choice_questions(
            filters: { topic: { id: { eq: $topicID } } }
          ) {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
