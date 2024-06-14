export interface GetVoters {
  results: VotersResult[];
}

export interface VotersStats {
  voters: number;
  my_guaranteed_votes_percentage: number;
  my_guaranteed_votes: number;
  my_unsecured_votes_percentage: number;
  my_unsecured_votes: number;
  my_indefinite_votes_percentage: number;
  my_indefinite_votes: number;
  mandoub_main: number;
  voting_centers: number;
  mandoub_sandoq: number;
  mandoub_haraka: number;
}

export interface ElectionDayStats {
  timer: string;
  my_votes_count: number;
  delivered: number;
  still_waiting_delivery: number;
  is_voted: number;
  is_not_voted: number;
}

export interface VotesStats {
  status: number;
  count: number;
  percentage: number;
}

export interface DelegatesVotes {
  name: string;
  count: number;
}

export interface ActivityVote {
  label: string;
  count: number;
}

export type VotersResult = {
  id: string;
  first_name: string;
  second_name: string;
  third_name: string;
  last_name: string;
  note: string;
  longitude: string;
  latitude: string;
  election_time: string;
  status: string;
  mobile_number: string;
  mandoub_haraka: string;
  mandoub_main: string;
  place_of_residence: number;
  box: number;
  school: string;
};

export interface GetVoterDetails {
  mobile_number?: string;
  status?: number;
  election_time?: string;
  latitude?: number;
  longitude?: number;
  note?: string;
  mandoub_main?: { id?: number; name?: string };
  mandoub_haraka?: { id?: number; name?: string };
  place_of_residence?: string;
  place_of_election?: string;
  box?: string;
}

export interface PutVoter {
  voters?: string;
  mobile_number?: string;
  status?: number;
  election_time?: string;
  latitude?: number;
  longitude?: number;
  note?: string;
  mandoub_main?: number;
  mandoub_haraka?: number;
}

export interface AssignSupporter {
  percentage?: string;
  nationality_id?: string;
  voters?: string;
  mobile_number?: string;
  election_time?: string;
  latitude?: number;
  longitude?: number;
  note?: string;
  mandoub_main?: number;
  mandoub_haraka?: number;
}
