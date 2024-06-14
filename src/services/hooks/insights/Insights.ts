export type VoterPercentage = {
  voter_count: number;
  assured_percentage: string;
  imponderable_percentage: string;
  unassured_percentage: string;
};

export type GeneralStats = {
  voting_center_count: number;
  total_voters: number;
  male_voters: number;
  male_percentage: string;
  female_voters: number;
  female_percentage: string;
  unique_last_names_count: number;
  manadeeb_raeesi_count: number;
  manadeeb_haraka_count: number;
  manadeeb_sandoq_count: number;
  muraqib_count: number;
};

export type MapVoter = {
  boxes_count: number;
  id: string;
  latitude: string;
  longitude: string;
  name: string;
};

export type DeliveringVote = {
  name: string;
  delivered_count: number;
  not_delivered_count: number;
};

export type VotingDelegate = {
  name: string;
  is_voted: number;
  is_not_voted: number;
};

export type TopFamilies = {
  family: string;
  count: number;
  percentage: string;
};

export type Candidate = {
  target_candidate: number;
  total_votes: number;
  candidate_name: string;
  candidate_image: string;
  candidate_id: number;
};

export type TransportationInsight = {
  mandeeb: MandobInsight[];
  voters: VotersInsight;
};

export type MandobInsight = {
  id: string;
  name: string;
  total_voters: number;
  delivered_voters: number;
  not_delivered_voters: number;
  delivered_percentage: string;
};

export type VotersInsight = {
  total_number_of_voters: 16;
  total_number_of_delivered_voters: 1;
};

export type GuaranteedVoters = {
  id: string;
  voter: number;
  status: number;
  delivery_status: number;
  first_name: string;
  second_name: string;
  third_name: string;
  last_name: string;
};
