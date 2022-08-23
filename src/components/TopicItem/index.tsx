import React from "react";
import { Link } from "react-router-dom";
import { ITopic } from "../../types";

interface Props {
  topic: ITopic;
}

export const TopicItem: React.FC<Props> = ({ topic }) => {
  return (
    <Link className="topic__list__item" to={`/topic/${topic.name}`}>
      {topic.name}
    </Link>
  );
};
