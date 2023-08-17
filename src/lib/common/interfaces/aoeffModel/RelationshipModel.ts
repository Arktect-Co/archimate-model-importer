interface RelationshipModelSettings {
  accessType: string;
  identifier: string;
  source: string;
  target: string;
  'xsi:type': string;
  isDirected?: string | boolean;
}

export interface RelationshipModel {
  $: RelationshipModelSettings;
}
