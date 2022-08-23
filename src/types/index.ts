export interface ITopic {
  id: string;
  name: string;
  stargazerCount: number;
  relatedTopics?: ITopic[];
}
