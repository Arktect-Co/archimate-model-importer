export interface Relationship {
  identifier?: string;
  sourceId: string;
  targetId: string;
  isBidirectional?: boolean;
  type?: string;
}
