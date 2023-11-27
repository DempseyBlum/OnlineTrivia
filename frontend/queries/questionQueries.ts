import { gql } from "@apollo/client";

interface Question {
  id: string;
  attributes: {
    body: string;
    correct_answer: string;
    wrong_answer_1: string;
    wrong_answer_2: string;
    wrong_answer_3: string;
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
  questions: {
    data: TopicWithQuestions;
  };
}

export interface SingleQuestionReturnType {
  questions: {
    data: Question;
  };
}

export interface TopicsReturnType {
  topics: {
    data: Topic[];
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
    coreKeyword(id: $questionID) {
      data {
        id
        attributes {
          display_name
          description
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
