import React from "react";
import { ITopic } from "../../types";
import { TopicItem } from "../TopicItem";

interface Props {
  topics: ITopic[];
}

export const TopicList: React.FC<Props> = ({ topics }) => {
  return (
    <div className="topic__list">
      {topics.map((topic) => (
        <TopicItem key={topic.id} topic={topic} />
      ))}
    </div>
  );
};
