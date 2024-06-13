export type VotingCentersType = {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  boxes_count: number;
};

export type BoxType = {
  id: number;
  name: string;
};

export type BoxesType = {
  id: number;
  name: string;
  boxes_count: number;
  boxes: BoxType[];
  manadeeb: string[];
};
