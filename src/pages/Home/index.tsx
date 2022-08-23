import React from "react";
import { useQuery } from "@apollo/client";
import { Input, Topic } from "../../components";
import { ITopic } from "../../types";
import { GET_TOPICS_BY_NAME } from "../../constants";

interface ResponseData {
  topic: ITopic;
}

export const HomePage: React.FC = () => {
  const [searchTopic, setSearchTopic] = React.useState<string>("");
  const [queryName, setQueryName] = React.useState<string>("");

  const { loading, data, error } = useQuery<ResponseData>(GET_TOPICS_BY_NAME, {
    variables: {
      name: queryName || "react",
    },
  });

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error?.message) {
    return <div className="error">ERROR: {error.message}</div>;
  }

  const onSearchSubmit = () => {
    setQueryName(searchTopic);
  };

  return (
    <div className="pg-home">
      <div className="pg-home__content">
        <div className="search-input">
          <Input
            placeholder="Type to search topic..."
            setValue={setSearchTopic}
          />
          <button onClick={onSearchSubmit}>Search</button>
        </div>
        {data ? (
          <Topic topic={data.topic} />
        ) : (
          <div className="no-data">No data</div>
        )}
      </div>
    </div>
  );
};
