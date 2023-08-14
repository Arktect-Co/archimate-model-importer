interface RelationshipModelSettings {
  accessType: string;
  identifier: string;
  source: string;
  target: string;
  'xsi:type': string;
  isDirected: string;
}

export interface RelationshipModel {
  $: RelationshipModelSettings;
}
