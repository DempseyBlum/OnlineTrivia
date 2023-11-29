import { gql } from "@apollo/client";

interface Question {
  id: string;
  attributes: {
    body: string;
    correctAnswer: string;
    wrongAnswer1: string;
    wrongAnswer2: string;
    wrongAnswer3: string;
    topic: {
      id: string;
      attributes: {
        display_name: string;
      };
    };
    difficulty: string;
    explanation: string;
  };
}

interface Topic {
  id: string;
  attributes: {
    display_name: string;
  };
}

interface TopicWithQuestions {
  id: string;
  attributes: {
    display_name: string;
    multi_choice_questions: {
      data: Question[];
    };
  };
}

export interface TopicQuestionsReturnType {
  topic: {
    data: TopicWithQuestions;
  };
}

export interface SingleQuestionReturnType {
  question: {
    data: Question;
  };
}

export interface TopicsReturnType {
  topics: {
    data: Topic[];
  };
}

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

export const topicQuestionsQuery = gql`
  query GetTopicQuestions($topicID: ID!) {
    topic(id: $topicID) {
      data {
        id
        attributes {
          display_name
          multi_choice_questions {
            data {
              id
              attributes {
                body
                correctAnswer
                wrongAnswer1
                wrongAnswer2
                wrongAnswer3
                topic {
                  data {
                    id
                    attributes {
                      display_name
                    }
                  }
                }
                difficulty
                explanation
              }
            }
          }
        }
      }
    }
  }
`;

export const questionByIDQuery = gql`
  query GetQuestionByID($questionID: ID!) {
    question(id: $questionID) {
      data {
        id
        attributes {
          body
          correctAnswer
          wrongAnswer1
          wrongAnswer2
          wrongAnswer3
          topic {
            data {
              id
              attributes {
                display_name
              }
            }
          }
          difficulty
          explanation
        }
      }
    }
  }
`;

export const allTopicsQuery = gql`
  query GetAllTopics {
    topics {
      data {
        id
        attributes {
          display_name
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
