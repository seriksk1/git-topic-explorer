import React from "react";
import { AiFillStar } from "react-icons/ai";
import { ITopic } from "../../types";
import { TopicList } from "../TopicList";

interface Props {
  topic: ITopic;
}

export const Topic: React.FC<Props> = ({ topic }) => {
  const { name, stargazerCount, relatedTopics = [] } = topic;

  return (
    <div className="topic">
      <div className="topic__info">
        <div className="topic-name">#{name}</div>
        <div className="topic__stars">
          <AiFillStar className="topic__stars-icon" />
          <div className="topic__stars-number">{stargazerCount}</div>
        </div>
      </div>
      {relatedTopics.length ? (
        <TopicList topics={relatedTopics} />
      ) : (
        <div className="no-data">No related topics</div>
      )}
    </div>
  );
};
