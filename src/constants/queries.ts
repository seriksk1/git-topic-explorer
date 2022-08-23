import { gql } from "@apollo/client";

export const GET_TOPICS_BY_NAME = gql`
  query GetTopics($name: String!) {
    topic(name: $name) {
      id
      name
      stargazerCount
      relatedTopics(first: 10) {
        id
        name
        stargazerCount
      }
    }
  }
`;
