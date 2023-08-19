export interface Connection {
  $: {
    'xsi:type': string;
    href: string;
  };
}

interface RelationshipSetting {
  'xmlns:xsi': string;
  'xmlns:archimate': string;
  id: string;
  name: string;
  accessType?: string;
  directed?: boolean | string;
}

export interface Relationship {
  $: RelationshipSetting;
  source: Array<Connection>;
  target: Array<Connection>;
}
