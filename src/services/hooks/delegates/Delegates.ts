export interface GroupType {
  id: number;
  name: string;
}

export interface GetDelegates {
  id: number;
  name: string;
  mobile_number: string;
  group: GroupType;
  place_of_residence: GroupType[];
}

export interface GetDelegate {
  id: number;
  name: string;
  mobile_number: string;
  group: GroupType;
  place_of_residence: GroupType[];
  voting_center: GroupType[];
  electoral_boxes: GroupType[];
}

export interface PostDelegate {
  mobile_number?: string;
  name?: string;
  group?: number;
  password?: string;
  place_of_residence?: number[];
  electoral_boxes?: number[];
}

export interface PutDelegate extends PostDelegate {}
