import {
  ArchiModel,
  Folder,
  Relationship,
  BendpointModel,
  Model,
  Property,
  View,
  FolderModel,
  Element,
  ChildElement,
  ChildFolder,
} from '@lib/common/interfaces/archiModel';
import { Interpreter } from '@lib/common/interfaces/Interpreter';
import { AccessRelationshipDirection } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
import { Bendpoint } from '@lib/common/interfaces/Bendpoint';
import { ElementType } from '@lib/common/enums/elementType';

const UNKNOWN = 'Unknown Name';

export type ArchiInterpreterModel = Interpreter<
  ArchiModel,
  Element,
  Element,
  Property,
  View,
  Folder,
  Folder,
  ChildElement,
  Relationship,
  BendpointModel
>;

export class Archi4Interpreter implements ArchiInterpreterModel {
  public model: ArchiModel;
  public readonly modelid: string;
  public readonly modelRoot: Model;
  public modelFolders: Array<FolderModel>;
  public isNestedDiagramStructure: boolean;
  public hasViewElementChildRelationships: boolean;

  constructor(model: ArchiModel) {
    this.model = model;
    this.modelid = model['archimate:model'].$['id'];
    this.modelRoot = model['archimate:model'];
    this.modelFolders = null;
    this.isNestedDiagramStructure = true;
    this.hasViewElementChildRelationships = true;
  }

  getModelId(): string {
    return this.modelid;
  }

  getNodeId(node: Element): string {
    return node.$.id;
  }

  getNodeName(node: Element): string {
    return node.$.name || UNKNOWN;
  }

  getNodeType(node: Element): string {
    return node.$['xsi:type'].replace('archimate:', '');
  }

  getNodeDocumentation(node: Element): string | null {
    return node.documentation && node.documentation[0] ? node.documentation[0] : null;
  }

  getNodeJunctionType(node: Element): string {
    let type = node.$.type;

    if (type === undefined) {
      // AND junction
      return ElementType.AndJunction;
    } else {
      return ElementType.OrJunction;
    }
  }

  getNodeProperties(node: Element): Array<Property> {
    return node.property;
  }

  getPropertyEntry(property: Property): Array<string> {
    if (property && property.$ && property.$.key && property.$.value) {
      return [property.$.key, property.$.value];
    } else {
      return [];
    }
  }

  getRelationshipId(relationship: Element): string {
    return relationship.$.id;
  }

  getRelationshipName(relationship: Element): string {
    if (relationship.$.name !== undefined) {
      return relationship.$.name;
    }

    return '';
  }

  getRelationshipSourceId(relationship: Element): string {
    return relationship.$.source;
  }

  getRelationshipTargetId(relationship: Element): string {
    return relationship.$.target;
  }

  getRelationshipType(relationship: Element): string {
    return relationship.$['xsi:type'].replace('archimate:', '');
  }

  getAccessRelationshipDirection(relationship: Element): AccessRelationshipDirection {
    if (relationship.$.accessType === undefined) {
      return {
        source: false,
        target: true,
      };
    } else {
      switch (relationship.$.accessType) {
        case '1':
          return {
            source: true,
            target: false,
          };
        case '2':
          return {
            source: false,
            target: false,
          };
        case '3':
          return {
            source: true,
            target: true,
          };
      }
    }
  }

  getAssociationRelationshipIsDirected(relationship: Element): boolean {
    let isDirected = relationship.$.directed;

    if (isDirected === undefined) {
      return false;
    } else {
      return isDirected === 'true';
    }
  }

  getFolderName(folder: Folder): string {
    return folder.$.name || UNKNOWN;
  }

  getSubFolders(folder: Folder): Array<ChildFolder> {
    return 'folder' in folder && folder.folder ? folder.folder : [];
  }

  getFolderViews(folder: Folder): Array<View> {
    return 'element' in folder && folder.element ? folder.element : [];
  }

  getViewElements(view: View): Array<ChildElement> {
    return 'child' in view ? view.child : [];
  }

  getViewId(view: View): string {
    return view.$.id;
  }

  getViewName(view: View): string {
    return view.$.name || UNKNOWN;
  }

  getViewElementViewId(viewElement: ChildElement): string {
    return viewElement.$.id;
  }

  getViewElementModelId(viewElement: ChildElement): string {
    return viewElement.$.archimateElement;
  }

  getViewElementPositionX(
    viewElement: ChildElement,
    parentId?: string,
    parentViewElements?: unknown,
  ): number {
    return parseInt(viewElement.bounds[0].$.x, 0);
  }

  getViewElementPositionY(
    viewElement: ChildElement,
    parentId?: string,
    parentViewElements?: unknown,
  ): number {
    return parseInt(viewElement.bounds[0].$.y, 0);
  }

  getViewElementWidth(viewElement: ChildElement): number {
    return parseInt(viewElement.bounds[0].$.width, 0);
  }

  getViewElementHeight(viewElement: ChildElement): number {
    return parseInt(viewElement.bounds[0].$.height, 0);
  }

  getViewElementSourceRelationships(viewElement: ChildElement): Array<Relationship> {
    return viewElement.sourceConnection;
  }

  getViewElementNestedElements(viewElement: ChildElement): Array<ChildElement> {
    return viewElement.child;
  }

  findViewElement(viewElements: Array<ChildElement>, id: string): ChildElement | null {
    if (Array.isArray(viewElements)) {
      for (let i = 0; i < viewElements.length; i++) {
        const element = viewElements[i];

        if (element.$.id.localeCompare(id) === 0) {
          return element;
        }

        const child = this.getViewElementNestedElements(element);

        if (child !== undefined) {
          let result = this.findViewElement(child, id);

          if (result !== null) {
            return result;
          }
        }
      }
    }

    return null;
  }

  findViewElementParent(viewElements: Array<ChildElement>, id: string): ChildElement | null {
    if (Array.isArray(viewElements)) {
      for (let i = 0; i < viewElements.length; i++) {
        const element = viewElements[i];

        const child = this.getViewElementNestedElements(element);

        if (child !== undefined) {
          let response = this.findViewElementParent(child, id);

          if (response !== null) {
            return response;
          } else {
            for (let j = 0; j < child.length; j++) {
              const childElement = child[j];

              if (childElement.$.id.localeCompare(id) === 0) {
                return element;
              }
            }
          }
        }
      }
    }

    return null;
  }

  calculateNestedPosition(viewElements: Array<ChildElement>, id: string): Bendpoint | null {
    if (Array.isArray(viewElements)) {
      for (let i = 0; i < viewElements.length; i++) {
        const element = viewElements[i];

        const child = this.getViewElementNestedElements(element);

        if (child !== undefined) {
          let response = this.calculateNestedPosition(child, id);

          if (response !== null) {
            let x = this.getViewElementPositionX(element) || 0;
            let y = this.getViewElementPositionY(element) || 0;

            response.x += x;
            response.y += y;

            return response;
          } else {
            for (let j = 0; j < child.length; j++) {
              const childElement = child[j];

              if (childElement.$.id.localeCompare(id) === 0) {
                return {
                  x: this.getViewElementPositionX(element, null, null),
                  y: this.getViewElementPositionY(element, null, null),
                };
              }
            }
          }
        }
      }
    }

    return null;
  }

  getViewNoteContent(viewElement: ChildElement): string {
    if (viewElement.content !== undefined) {
      if (typeof viewElement.content === 'string') {
        return viewElement.content;
      } else {
        return viewElement.content[0];
      }
    }

    return 'No Content';
  }

  getViewGroupName(viewElement: ChildElement): string {
    if (viewElement.$.name !== undefined) {
      return viewElement.$.name;
    }

    return UNKNOWN;
  }

  getViewRelationshipBendpoints(viewRelationship: Relationship): Array<BendpointModel> {
    return viewRelationship.bendpoint;
  }

  getViewRelationshipBendpoint(
    bendpoint: BendpointModel,
    bendpointIndex: number,
    bendpointsLength: number,
    sourceViewElement: ChildElement | null,
    targetViewElement: ChildElement | null,
    viewNodes: Array<ChildElement>,
  ) {
    const sourceBounds = sourceViewElement.bounds[0].$;
    const targetBounds = targetViewElement.bounds[0].$;
    const sourceXPosition = sourceBounds.x ? +sourceBounds.x : 0;
    const sourceYPosition = sourceBounds.y ? +sourceBounds.y : 0;
    const targetXPosition = targetBounds.x ? +targetBounds.x : 0;
    const targetYPosition = targetBounds.y ? +targetBounds.y : 0;
    const sourceParentPositionIncrement = this.calculateNestedPosition(
      viewNodes,
      sourceViewElement.$.id,
    );
    const targetParentPositionIncrement = this.calculateNestedPosition(
      viewNodes,
      targetViewElement.$.id,
    );
    const sx = bendpoint.$.startX ? +bendpoint.$.startX : 0;
    const sy = bendpoint.$.startY ? +bendpoint.$.startY : 0;
    const ex = bendpoint.$.endX ? +bendpoint.$.endX : 0;
    const ey = bendpoint.$.endY ? +bendpoint.$.endY : 0;
    let sourceIncrementX = 0;
    let sourceIncrementY = 0;
    let targetIncrementX = 0;
    let targetIncrementY = 0;

    let sourceWidth = sourceBounds.width ? +sourceBounds.width : 0;
    let sourceHeight = sourceBounds.height ? +sourceBounds.height : 0;
    let targetWidth = targetBounds.width ? +targetBounds.width : 0;
    let targetHeight = targetBounds.height ? +targetBounds.height : 0;

    if (sourceParentPositionIncrement !== null) {
      sourceIncrementX = sourceParentPositionIncrement.x;
      sourceIncrementY = sourceParentPositionIncrement.y;
    }

    if (targetParentPositionIncrement !== null) {
      targetIncrementX = targetParentPositionIncrement.x;
      targetIncrementY = targetParentPositionIncrement.y;
    }

    let sourcePositionX = sourceXPosition + sourceIncrementX;
    let sourcePositionY = sourceYPosition + sourceIncrementY;
    let targetPositionX = targetXPosition + targetIncrementX;
    let targetPositionY = targetYPosition + targetIncrementY;
    let weight = (bendpointIndex + 1) / (bendpointsLength + 1);

    let x =
      (sourcePositionX + sx + sourceWidth / 2) * (1.0 - weight) +
      weight * (targetPositionX + ex + targetWidth / 2);
    let y =
      (sourcePositionY + sy + sourceHeight / 2) * (1.0 - weight) +
      weight * (targetPositionY + ey + targetHeight / 2);
    //@ts-ignore
    return { x: parseInt(x, 0), y: parseInt(y, 0) };
  }

  getViewRelationshipModelId(viewRelationship: Relationship): string | null {
    return viewRelationship.$.archimateRelationship
      ? viewRelationship.$.archimateRelationship
      : null;
  }

  getViewRelationshipId(viewRelationship: Relationship): string {
    return viewRelationship.$.id;
  }

  getViewRelationshipSourceElementId(viewRelationship: Relationship): string {
    return viewRelationship.$.source;
  }

  getViewRelationshipTargetElementId(viewRelationship: Relationship): string {
    return viewRelationship.$.target;
  }

  getOrganizationFolders(): Array<ChildFolder> {
    // Archi allows folder creation just inside the predefined folders
    let organizationFolder = null;

    this.modelFolders.forEach(folder => {
      if (folder.$.type.localeCompare('diagrams') === 0) {
        organizationFolder = folder;
      }
    });

    return [organizationFolder];
  }

  validate(): boolean {
    if (this.modelRoot !== undefined) {
      if (this.modelRoot.folder !== undefined) {
        this.modelFolders = this.modelRoot.folder;

        return true;
      }
    }

    return false;
  }

  forEachViewRelationship(view, action) {}

  // TODO: Get elements in Subfolders
  forEachModelNode(action: (node: Element) => void): void {
    this.modelFolders.forEach(folder => {
      if (
        folder.$.type.localeCompare('relations') !== 0 &&
        folder.$.type.localeCompare('diagrams') !== 0
      ) {
        let modelElements = folder.element;

        if (Array.isArray(modelElements)) {
          modelElements.forEach(action);
        }
      }
    });
  }

  forEachModelRelationship(action: (relationship: Element) => void): void {
    this.modelFolders.forEach(folder => {
      if (folder.$.type.localeCompare('relations') === 0) {
        let modelElements = folder.element;

        if (Array.isArray(modelElements)) {
          modelElements.forEach(action);
        }
      }
    });
  }

  forEachDiagram(action: (diagram: Element) => void) {
    return null;
  }

  isAccessRelationship(relationship: Element): boolean {
    return relationship.$['xsi:type'].localeCompare('archimate:AccessRelationship') === 0;
  }

  isAssociationRelationship(relationship: Element): boolean {
    return relationship.$['xsi:type'].localeCompare('archimate:AssociationRelationship') === 0;
  }

  isViewObject(viewElement: ChildElement): boolean {
    return viewElement.$['xsi:type'].localeCompare('archimate:DiagramObject') === 0;
  }

  isViewNote(viewElement: ChildElement): boolean {
    return viewElement.$['xsi:type'].localeCompare('archimate:Note') === 0;
  }

  isViewGroup(viewElement: ChildElement): boolean {
    return viewElement.$['xsi:type'].localeCompare('archimate:Group') === 0;
  }

  isJunctionNode(node: Element): boolean {
    return node.$['xsi:type'].localeCompare('archimate:Junction') === 0;
  }

  hasViewElementWithChildRelationships(): boolean {
    return this.hasViewElementChildRelationships;
  }
}
