export interface GroupType {
  id: string;
  name: string;
}

export interface GetDelegates {
  id: string;
  name: string;
  mobile_number: string;
  group: GroupType;
  place_of_residence: GroupType[];
}

export interface GetDelegate {
  id: string;
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
  group?: string;
  password?: string;
  place_of_residence?: string[];
  electoral_boxes?: string[];
}

export interface PutDelegate extends PostDelegate {}
