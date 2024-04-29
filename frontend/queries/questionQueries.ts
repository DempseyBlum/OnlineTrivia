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

export interface Topic {
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
