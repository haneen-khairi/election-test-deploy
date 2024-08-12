export type TaskType = {
  id: string;
  name: string;
};

export type GetTaskType = {
  id: string;
  mandob: TaskMandoobType;
  type: TaskType;
  description: string;
  date: string;
  time: string;
  status: string;
};

export type TaskMandoobType = {
  id: string;
  name: string;
  group: string;
};

export type PostPutTaskType = {
  mandob?: string;
  type?: string;
  description?: string;
  date?: string;
  time?: string;
};
