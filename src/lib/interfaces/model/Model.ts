import { View } from '@lib/interfaces/model/View';
import { Landscape } from '@lib/interfaces/model/Landscape';
import { Relationship } from '@lib/interfaces/model/Relationship';
import { Node } from '@lib/interfaces/model/Node';

interface Data<T> {
  [key: string]: T;
}

export type TotalByType = Data<Data<number>>;
export type Nodes = Data<Array<Node>>;
export type Relationships = Data<Array<Relationship>>;

export interface Model {
  nodes: Nodes;
  views: Array<View>;
  relationships: Relationships;
  landscape: Array<Landscape>;
}
