import { Connection } from '@lib/common/interfaces/graficoModel/Relationship';

export interface BendpointModel {
  $: { startX: string; startY: string; endX: string; endY: string };
}

interface ViewRelationshipSetting {
  'xsi:type': string;
  id: string;
  source: string;
  target: string;
}

export interface ViewRelationship {
  $: ViewRelationshipSetting;
  archimateRelationship: Array<Connection>;
  bendpoints?: Array<BendpointModel>;
}
