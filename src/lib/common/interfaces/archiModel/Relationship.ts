import { IdentificationModel } from '@lib/common/interfaces/archiModel/BaseIdentification';

interface BendpointSetting {
  startX: string;
  startY: string;
  endX: string;
  endY: string;
}

export interface BendpointModel {
  $: BendpointSetting;
}

export interface Relationship {
  $: IdentificationModel;
  bendpoint?: Array<BendpointModel>;
}
