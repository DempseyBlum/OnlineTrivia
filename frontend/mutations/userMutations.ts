import { gql } from "@apollo/client";

// Add question id to answered question list of user
// If there is an empty array, or more than 1 value in the newQuestionIDs array, it will override the existing array.
export const ADD_ANSWERED_QUESTION = gql`
  mutation AddAnsweredQuestion($userID: ID!, $newQuestionIDs: [ID]) {
    updateUsersPermissionsUser(
      id: $userID
      data: { answered_multi_choice_questions: $newQuestionIDs }
    ) {
      data {
        id
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
