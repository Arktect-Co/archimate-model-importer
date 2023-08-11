export interface Property {
  key: string;
  value: string;
}

export interface Node {
  identifier: string;
  name: string;
  properties?: Array<Property>;
  documentation?: string | null;
  type?: string;
}
