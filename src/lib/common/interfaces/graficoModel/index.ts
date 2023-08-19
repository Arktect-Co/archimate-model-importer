import {
  ViewRelationship,
  BendpointModel,
} from '@lib/common/interfaces/graficoModel/ViewRelationship';
import { Node as NodeModel, Property } from '@lib/common/interfaces/graficoModel/Node';
import {
  Connection,
  Relationship as RelationshipModel,
} from '@lib/common/interfaces/graficoModel/Relationship';
import { View as ViewModel } from '@lib/common/interfaces/graficoModel/View';
import { ViewNode, BoundsModel } from '@lib/common/interfaces/graficoModel/ViewNode';

interface Data<T> {
  [key: string]: T;
}

type View = Data<ViewModel>;
type Node = Data<NodeModel>;
type Relationship = Data<RelationshipModel>;

export {
  View,
  ViewRelationship,
  BendpointModel,
  BoundsModel,
  Connection,
  Relationship,
  ViewNode,
  Property,
  Node,
};
