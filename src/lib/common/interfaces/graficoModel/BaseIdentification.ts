export interface BaseIdentification {
  'xsi:type': string;
  id: string;
  targetConnections?: string;
  textAlignment?: string;
  content?: string | Array<string>;
  name?: string;
}
