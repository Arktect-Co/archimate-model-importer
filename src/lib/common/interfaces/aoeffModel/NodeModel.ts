import { NameModel } from '@lib/common/interfaces/aoeffModel/NameModel';

interface NodeModelSettings {
  identifier: string;
  elementRef: string;
  'xsi:type': string;
  x: string;
  y: string;
  w: string;
  h: string;
}

export interface NodeModel {
  $: NodeModelSettings;
  name: Array<string | NameModel>;
  documentation?: NameModel;
  label: Array<string | NameModel>;
  node?: Array<NodeModel>;
}
