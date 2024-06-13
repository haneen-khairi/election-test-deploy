type TGeneric<T> = T | null;
export interface ListResponse<T> {
  data: T[];
  count?: number;
  status: TGeneric<string>;
  error: TGeneric<string>;
}

export interface ListPageinated<T> {
  count: TGeneric<number>;
  next: TGeneric<number>;
  previous: TGeneric<number>;
  data: T[];
  status: TGeneric<string>;
  error: TGeneric<string>;
}

export interface ItemResponse<T> {
  data: T;
  status: boolean;
  error: TGeneric<string>;
}
