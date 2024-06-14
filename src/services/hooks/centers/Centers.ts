export type VotingCentersType = {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  boxes_count: number;
};

export type BoxType = {
  id: string;
  name: string;
};

export type BoxesType = {
  id: string;
  name: string;
  boxes_count: number;
  boxes: BoxType[];
  manadeeb: string[];
};
