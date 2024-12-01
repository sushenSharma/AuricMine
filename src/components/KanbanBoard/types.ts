export type TaskStatus = 'To Watch' | 'Researching' | 'Ready To Buy'| 'Bought'| 'Ready To Sell';

export type Task = {
  id: string;
  status: TaskStatus;
  title: string;
  description: string;
};

export type Column = {
  id: TaskStatus;
  title: string;
};