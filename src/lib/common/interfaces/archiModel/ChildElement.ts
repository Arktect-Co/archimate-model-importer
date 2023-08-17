import { IdentificationModel } from '@lib/common/interfaces/archiModel/BaseIdentification';
import { Relationship } from '@lib/common/interfaces/archiModel/Relationship';

interface BoundSetting {
  x: string;
  y: string;
  width: string;
  height: string;
}

export interface Bounds {
  $: BoundSetting;
}

export interface ChildElement {
  $: IdentificationModel;
  bounds: Array<Bounds>;
  sourceConnection: Array<Relationship>;
  content?: Array<string>;
  child?: Array<ChildElement>;
}
