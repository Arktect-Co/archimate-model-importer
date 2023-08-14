import { NameModel } from '@lib/common/interfaces/aoeffModel/NameModel';

interface CandidateViewIdentifier {
  identifierRef: string;
}

export interface CandidateView {
  $: CandidateViewIdentifier;
}

export interface ItemModel {
  label: Array<NameModel | string>;
  item: Array<ItemModel | CandidateView>;
}
