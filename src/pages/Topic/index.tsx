import React from "react";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { Topic } from "../../components/Topic";
import { GET_TOPICS_BY_NAME } from "../../constants";
import { ITopic } from "../../types";

interface ResponseData {
  topic: ITopic;
}

export const TopicPage: React.FC = () => {
  const { name } = useParams();
  const { loading, data, error } = useQuery<ResponseData>(GET_TOPICS_BY_NAME, {
    variables: {
      name: name,
    },
  });

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">ERROR: {error.message}</div>;
  }

  return (
    <div className="pg-topic">
      <Link className="pg-topic__back" to="/">
        Back to search
      </Link>
      {data ? (
        <Topic topic={data?.topic} />
      ) : (
        <div className="no-data">No data</div>
      )}
    </div>
  );
};
