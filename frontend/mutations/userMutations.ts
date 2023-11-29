import { gql } from "@apollo/client";

// Add question id to answered question list of user
// TODO: Currently overrides existing array.
export const ADD_USER_QUESTION = gql`
  mutation AddUserQuestion($userID: ID!, $questionIDs: [ID]) {
    updateUsersPermissionsUser(
      id: $userID
      data: { answered_multi_choice_questions: $questionIDs }
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
