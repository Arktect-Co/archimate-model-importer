import { NameModel } from '@lib/common/interfaces/aoeffModel/NameModel';
import { NodeModel } from '@lib/common/interfaces/aoeffModel/NodeModel';

export interface BendpointModel {
  $: { x: string; y: string };
}

interface ConnectionSettings {
  identifier: string;
  relationshipRef: string;
  'xsi:type': string;
  source: string;
  target: string;
}

export interface ConnectionModel {
  $: ConnectionSettings;
  bendpoint?: Array<BendpointModel>;
}

interface ViewModelSettings {
  identifier: string;
  identifierRef?: string;
  'xsi:type': string;
}

export interface ViewModel {
  $: ViewModelSettings;
  name: Array<NameModel | string>;
  node: Array<NodeModel>;
  connection: Array<ConnectionModel>;
}
