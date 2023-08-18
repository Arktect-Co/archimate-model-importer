import { Bendpoint } from '@lib/common/interfaces/Bendpoint';
import { AccessRelationshipDirection } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';

export interface Interpreter<
  TModel,
  TNode,
  TRelationship,
  TProperty,
  TView,
  TFolder,
  TCandidateView,
  TViewNode,
  TViewRelationship,
  TBendpoint,
> {
  model?: TModel;
  readonly modelid: string;
  modelRoot?: unknown;
  modelFolders?: Array<unknown>;
  isNestedDiagramStructure: boolean;
  hasViewElementChildRelationships: boolean;
  validate(): boolean;
  getModelId(): string;
  getOrganizationFolders(): Array<TFolder>;
  getViewElementModelId(viewElement: TViewNode): string;
  forEachModelNode(action: (node: TNode) => void): void;
  getNodeId(node: TNode): string;
  isJunctionNode(node: TNode): boolean;
  getNodeJunctionType(node: TNode): string;
  getNodeType(node: TNode): string;
  getNodeName(node: TNode): string;
  getNodeDocumentation(node: TNode): string | null;
  getNodeProperties(node: TNode): Array<TProperty> | null;
  getPropertyEntry(property?: TProperty): Array<string>;
  forEachModelRelationship(action: (relationship: TRelationship) => void): void;
  getRelationshipSourceId(relationship: TRelationship): string;
  getRelationshipTargetId(relationship: TRelationship): string;
  isAssociationRelationship(relationship: TRelationship): boolean;
  getAssociationRelationshipIsDirected(relationship: TRelationship): boolean;
  isAccessRelationship(relationship: TRelationship): boolean;
  getAccessRelationshipDirection(relationship: TRelationship): AccessRelationshipDirection;
  getRelationshipId(relationship: TRelationship): string;
  getRelationshipType(relationship: TRelationship): string;
  getFolderName(folder: TFolder): string;
  getSubFolders(folder: TFolder): Array<TFolder>;
  getFolderViews(folder: TFolder): Array<TCandidateView>;
  forEachDiagram(action: (diagram: TView) => void): void;
  getViewId(view: TView | TCandidateView): string;
  getViewName(view: TView | TCandidateView): string;
  getViewElements(view: TView): Array<TViewNode>;
  forEachViewRelationship(view: TView, action: (relationship: TViewRelationship) => void): void;
  getViewRelationshipModelId(viewRelationship: TViewRelationship): string | null;
  getViewElementViewId(viewElement: TViewNode): string;
  getViewElementPositionX(
    viewElement: TViewNode,
    parentId?: string | null,
    parentViewElements?: Array<TViewNode>,
  ): number;
  getViewElementPositionY(
    viewElement: TViewNode,
    parentId?: string | null,
    parentViewElements?: Array<TViewNode>,
  ): number;
  getViewElementWidth(viewElement: TViewNode): number;
  getViewElementHeight(viewElement: TViewNode): number;
  isViewObject(viewElement: TViewNode): boolean;
  getViewElementSourceRelationships(viewElement: TViewNode): Array<TViewRelationship>;
  getViewElements(viewElement: TView): Array<TViewNode>;
  isViewNote(viewElement: TViewNode): boolean;
  getViewNoteContent(viewElement: TViewNode): string;
  getViewGroupName(viewElement: TViewNode): string;
  getViewElementNestedElements(viewElement: TViewNode): Array<TViewNode>;
  getViewRelationshipSourceElementId(viewRelationship: TViewRelationship): string;
  getViewRelationshipTargetElementId(viewRelationship: TViewRelationship): string;
  findViewElement(viewElements: Array<TViewNode>, id: string): TViewNode | null;
  getViewRelationshipBendpoints(viewRelationship: TViewRelationship): Array<TBendpoint>;
  getViewRelationshipModelId(viewRelationship: TViewRelationship): string | null;
  getViewRelationshipBendpoint(
    bendpoint: TBendpoint,
    bendpointIndex?: number,
    bendpointsLength?: number,
    sourceViewElement?: TViewNode | null,
    targetViewElement?: TViewNode | null,
    viewNodes?: Array<TViewNode>,
  ): Bendpoint;
  getViewRelationshipId(viewRelationship: TViewRelationship): string;
}
