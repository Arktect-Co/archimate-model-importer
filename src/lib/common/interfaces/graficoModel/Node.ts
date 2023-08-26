interface NodeIdentification {
  'xmlns:archimate': string;
  name?: string;
  id: string;
  type?: string;
  documentation?: string;
}

interface PropertySetting {
  key: string;
  value: string;
}

export interface Property {
  $: PropertySetting;
}

export interface Node {
  $: NodeIdentification;
  properties?: Array<Property>;
}
