export interface GetVoters {
  results: VotersResult[];
}

export interface VotersStats {
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
  latitude?: number;
  longitude?: number;
  note?: string;
  mandoub_main?: { id?: string; name?: string };
  mandoub_haraka?: { id?: string; name?: string };
  place_of_residence?: string;
  place_of_election?: string;
  box?: string;
}

export interface PutVoter {
  voters?: string;
  mobile_number?: string;
  status?: number;
  latitude?: number;
  longitude?: number;
  note?: string;
  mandoub_main?: string;
  mandoub_haraka?: string;
}

export interface AssignSupporter {
  percentage?: string;
  nationality_id?: string;
  voters?: string;
  mobile_number?: string;
  latitude?: number;
  longitude?: number;
  note?: string;
  mandoub_main?: string;
  mandoub_haraka?: string;
}
