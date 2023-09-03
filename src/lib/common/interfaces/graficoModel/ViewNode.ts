import { ViewRelationship } from '@lib/common/interfaces/graficoModel/ViewRelationship';
import { Connection } from '@lib/common/interfaces/graficoModel/Relationship';
import { BaseIdentification } from '@lib/common/interfaces/graficoModel/BaseIdentification';

export interface BoundsModel {
  $: { x: string; y: string; width: string; height: string };
}

export interface ViewNode {
  $: BaseIdentification;
  sourceConnections?: Array<ViewRelationship>;
  bounds?: Array<BoundsModel>;
  archimateElement?: Array<Connection>;
  children?: Array<ViewNode>;
}
