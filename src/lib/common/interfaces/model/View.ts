export interface ViewNode {
  modelNodeId: string;
  viewNodeId: string;
  name: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  parent?: string | null;
}

export interface BendPoint {
  x: number;
  y: number;
}

export interface ViewRelationship {
  modelRelationshipId: string;
  sourceId: string;
  targetId: string;
  viewRelationshipId: string;
  type: string;
  isBidirectional?: boolean;
  bendpoints: Array<BendPoint>;
}

interface AxisBounds {
  min: number;
  max: number;
}

export interface Bounds {
  vertical: AxisBounds;
  horizontal: AxisBounds;
}

export interface View {
  bounds: Bounds;
  id: string;
  name: string;
  viewNodes: Array<ViewNode>;
  viewRelationships: Array<ViewRelationship>;
}
