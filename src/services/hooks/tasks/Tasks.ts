export type TaskType = {
  id: number;
  name: string;
};

export type GetTaskType = {
  id: number;
  mandob: TaskMandoobType;
  type: TaskType;
  description: string;
  date: string;
  time: string;
  status: string;
};

export type TaskMandoobType = {
  id: number;
  name: string;
  group: number;
};

export type PostPutTaskType = {
  mandob?: number;
  type?: number;
  description?: string;
  date?: string;
  time?: string;
};
