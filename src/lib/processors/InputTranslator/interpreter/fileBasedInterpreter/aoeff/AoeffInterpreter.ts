import {
  AoeffModel,
  Bendpoint,
  CandidateView,
  ConnectionModel,
  ElementModel,
  Model,
  ItemModel,
  ViewModel,
  NodeModel,
  Property,
  RelationshipModel,
} from '@lib/common/interfaces/aoeffModel';
import _ from 'lodash';

const UNKNOWN = 'Unknown Name';

/**
 *  AOEFF has a limitation when loading relationships of nested elements with its parents. The model
 *  ignores this type of relationship
 */
export class AoeffInterpreter {
  private model: Model;
  private readonly modelid: string;
  private modelRoot: any;
  private modelFolders: any;
  private isNestedDiagramStructure: boolean;
  private hasViewElementChildRelationships: boolean;

  constructor(model: AoeffModel) {
    this.model = model.model;
    this.modelid = model['model'].$['identifier'];
    this.modelRoot = null;
    this.modelFolders = null;
    this.isNestedDiagramStructure = false;
    this.hasViewElementChildRelationships = false;
  }

  /**
   * Get the model identification
   * @return model ID
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const id = inputInterpreter.getModelId();
   */
  getModelId(): string {
    return this.modelid;
  }

  /**
   * Returns the node identification
   * @param node Node
   * @return Node ID
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const node = model.model.elements[0].element[0];
   * const inputInterpreter = new AoeffInterpreter(model);
   * const id = inputInterpreter.getNodeId(node);
   */
  getNodeId(node: ElementModel): string {
    return node.$.identifier.replace('id-', '');
  }

  /**
   * Returns the node name
   * @param node Node
   * @return Node name
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const node = model.model.elements[0].element[0];
   * const name = inputInterpreter.getNodeName(node);
   */
  getNodeName(node?: ElementModel): string {
    return node ? node.name[0]['_'] || node.name[0] : UNKNOWN;
  }

  /**
   * Returns the node type
   * @param node Node
   * @return Node type
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const node = model.model.elements[0].element[0];
   * const type = inputInterpreter.getNodeType(node);
   */
  getNodeType(node: ElementModel): string {
    return node.$['xsi:type'];
  }

  getNodeDocumentation(node: ElementModel): string | null {
    return node.documentation && node.documentation[0] && node.documentation[0]._
      ? node.documentation[0]._
      : null;
  }

  getNodeJunctionType(node: ElementModel): string {
    return node.$['xsi:type'];
  }

  getNodeProperties(node: ElementModel): Array<Property> | null {
    return node.properties ? node.properties[0].property : null;
  }

  getPropertyEntry(property: Property): Array<string> {
    if (
      property &&
      property.$ &&
      property.$.propertyDefinitionRef &&
      property.value &&
      property.value[0] &&
      property.value[0]._
    ) {
      return [property.$.propertyDefinitionRef, property.value[0]._];
    } else {
      return [];
    }
  }

  getRelationshipId(relationship: RelationshipModel): string {
    return relationship.$.identifier.replace('id-', '');
  }

  getRelationshipName(relationship) {
    if (relationship !== undefined && relationship.name !== undefined) {
      return relationship.name[0]._;
    }

    return '';
  }

  getRelationshipSourceId(relationship: RelationshipModel): string {
    return relationship.$.source.replace('id-', '');
  }

  getRelationshipTargetId(relationship: RelationshipModel): string {
    return relationship.$.target.replace('id-', '');
  }

  getRelationshipType(relationship: RelationshipModel): string {
    return `${relationship.$['xsi:type']}relationship`;
  }

  getAccessRelationshipDirection(relationship: RelationshipModel) {
    if (relationship.$.accessType === undefined) {
      return {
        source: false,
        target: true,
      };
    } else {
      switch (relationship.$.accessType) {
        case 'Write':
          return {
            source: false,
            target: true,
          };
        case 'Read':
          return {
            source: true,
            target: false,
          };
        case 'Access':
          return {
            source: false,
            target: false,
          };
        case 'ReadWrite':
          return {
            source: true,
            target: true,
          };
      }
    }
  }

  getAssociationRelationshipIsDirected(relationship: RelationshipModel): boolean {
    let isDirected = relationship.$.isDirected;

    if (isDirected === undefined) {
      return false;
    } else {
      return typeof isDirected === 'boolean' ? isDirected : isDirected === 'true';
    }
  }

  getFolderName(folder: ItemModel) {
    if (folder.label[0]['_']) {
      return folder.label[0]['_'];
    } else if (folder.label[0]) {
      return folder.label[0];
    } else {
      return UNKNOWN;
    }
  }

  getSubFolders(folder: ItemModel): Array<ItemModel> {
    let subFolders: Array<ItemModel> = [];

    folder.item.forEach(candidateFolder => {
      if ('label' in candidateFolder && candidateFolder.label !== undefined) {
        // typeof candidateFolder.label[0] === 'string' for compatibility with Sparx
        if (
          typeof candidateFolder.label[0] === 'string' ||
          candidateFolder.label[0]['$'].identifierRef === undefined
        ) {
          subFolders.push(candidateFolder);
        }
      }
    });

    return subFolders;
  }

  getFolderViews(folder: ItemModel): Array<CandidateView> {
    let folderViews: Array<CandidateView> = [];

    folder.item.forEach(candidateView => {
      if (candidateView !== undefined) {
        if ('$' in candidateView && candidateView.$ !== undefined) {
          folderViews.push(candidateView);
        }
      }
    });

    return folderViews;
  }

  getViewElements(view: ViewModel): Array<NodeModel> {
    return view.node;
  }

  getViewId(view: ViewModel): string {
    if (view.$.identifier !== undefined) {
      return view.$.identifier.replace('id-', '');
    } else {
      return view.$.identifierRef.replace('id-', '');
    }
  }

  getViewName(view: ViewModel): string {
    if (view !== undefined && view.name !== undefined) {
      // It's a view of the Views folder
      return view.name[0]['_'] ? view.name[0]['_'] : view.name[0];
    } else {
      // It's a view of the Organizations' folder
      // Finding the view related with the ID indicated in the folder
      let el = _.find(this.model.views[0].diagrams[0].view, v => {
        return v.$.identifier.localeCompare(view.$.identifierRef) === 0;
      });

      if (el && el.name) {
        const name = el.name[0];

        if (typeof name !== 'string' && '_' in name) return name._;

        return <string>name;
      } else {
        return UNKNOWN;
      }
    }
  }

  getViewElementViewId(viewElement: NodeModel): string {
    return viewElement.$.identifier.replace('id-', '');
  }

  getViewElementModelId(viewElement: NodeModel): string {
    return viewElement.$.elementRef.replace('id-', '');
  }

  getViewElementPositionX(
    viewElement: NodeModel,
    parentId?: string,
    parentViewElements?: Array<NodeModel>,
  ): number {
    let x = parseInt(viewElement.$.x, 0);

    if (parentId !== null) {
      let parent = this.findViewElement(parentViewElements, parentId);

      x = x - parseInt(parent.$.x, 0);
    }

    return x;
  }

  getViewElementPositionY(
    viewElement: NodeModel,
    parentId?: string,
    parentViewElements?: Array<NodeModel>,
  ): number {
    let y = parseInt(viewElement.$.y, 0);

    if (parentId !== null) {
      let parent = this.findViewElement(parentViewElements, parentId);

      y = y - parseInt(parent.$.y, 0);
    }

    return y;
  }

  getViewElementWidth(viewElement: NodeModel): number {
    return parseInt(viewElement.$.w, 0);
  }

  getViewElementHeight(viewElement: NodeModel): number {
    return parseInt(viewElement.$.h, 0);
  }

  getViewElementSourceRelationships(viewElement: NodeModel) {
    return [];
  }

  getViewElementNestedElements(viewElement: NodeModel): Array<NodeModel> {
    return viewElement.node;
  }

  findViewElement(viewElements: Array<NodeModel>, id: string): NodeModel | null {
    if (Array.isArray(viewElements)) {
      for (let i = 0; i < viewElements.length; i++) {
        const element = viewElements[i];

        if (element.$.identifier.replace('id-', '').localeCompare(id) === 0) {
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

  findViewElementParent(viewElements: Array<NodeModel>, id: string): NodeModel | null {
    if (Array.isArray(viewElements)) {
      for (let i = 0; i < viewElements.length; i++) {
        const element = viewElements[i];

        const child = this.getViewElementNestedElements(element);

        if (child !== undefined) {
          for (let j = 0; j < child.length; j++) {
            const childElement = child[j];

            if (childElement.$.identifier.localeCompare(id) === 0) {
              return element;
            }
          }
        }
      }
    }

    return null;
  }

  calculateNestedPosition(viewElements: Array<NodeModel>, id: string) {
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

              if (this.getViewElementViewId(childElement).localeCompare(id) === 0) {
                return {
                  x: this.getViewElementPositionX(element),
                  y: this.getViewElementPositionY(element),
                };
              }
            }
          }
        }
      }
    }

    return null;
  }

  getViewNoteContent(viewElement: NodeModel): string {
    return viewElement.label[0] ? viewElement.label[0]['_'] || viewElement.label[0] : 'No Content';
  }

  getViewGroupName(viewElement: NodeModel): string {
    return viewElement.label[0] ? viewElement.label[0]['_'] || viewElement.label[0] : UNKNOWN;
  }

  getViewRelationshipBendpoints(viewRelationship: ConnectionModel): Array<Bendpoint> {
    return viewRelationship.bendpoint;
  }

  getViewRelationshipBendpoint(
    bendpoint: Bendpoint,
    bendpointIndex,
    bendpointsLength,
    sourceViewElement,
    targetViewElement,
    viewNodes,
  ) {
    let x = parseInt(bendpoint.$.x, 0);
    let y = parseInt(bendpoint.$.y, 0);

    return { x, y };
  }

  getViewRelationshipModelId(viewRelationship: ConnectionModel): string | null {
    return viewRelationship.$.relationshipRef
      ? viewRelationship.$.relationshipRef.replace('id-', '')
      : null;
  }

  getViewRelationshipId(viewRelationship: ConnectionModel): string {
    return viewRelationship.$.identifier.replace('id-', '');
  }

  getViewRelationshipSourceElementId(viewRelationship: ConnectionModel): string {
    return viewRelationship.$.source.replace('id-', '');
  }

  getViewRelationshipTargetElementId(viewRelationship: ConnectionModel): string {
    return viewRelationship.$.target.replace('id-', '');
  }

  getOrganizationFolders(): Array<ItemModel> {
    let organizationFolders: Array<ItemModel> = [];

    if (
      Array.isArray(this.model.organizations) &&
      this.model.organizations[0] &&
      this.model.organizations[0].item
    ) {
      this.model.organizations[0].item.forEach(folder => {
        if (folder.label) {
          let folderName = folder.label[0]['_'] ? folder.label[0]['_'] : folder.label[0];

          if (folderName !== undefined) {
            if (
              typeof folderName === 'string' &&
              folderName.localeCompare('Business') !== 0 &&
              folderName.localeCompare('Application') !== 0 &&
              folderName.localeCompare('Technology & Physical') !== 0 &&
              folderName.localeCompare('Motivation') !== 0 &&
              folderName.localeCompare('Implementation & Migration') !== 0 &&
              folderName.localeCompare('Strategy') !== 0 &&
              folderName.localeCompare('Other') !== 0 &&
              folderName.localeCompare('Relations') !== 0
            ) {
              organizationFolders.push(folder);
            }
          }
        }
      });
    }

    return organizationFolders;
  }

  validate(): boolean {
    return (
      Array.isArray(this.model.elements) &&
      this.model.name !== undefined &&
      Array.isArray(this.model.views)
    );
  }

  forEachViewRelationship(view: ViewModel, action: (connection: ConnectionModel) => void) {
    if (view.connection !== undefined) {
      view.connection.forEach(action);
    }
  }

  forEachModelNode(action: (node: ElementModel) => void): void {
    if (Array.isArray(this.model.elements)) {
      this.model.elements[0].element.forEach(action);
    }
  }

  forEachModelRelationship(action: (relationship: RelationshipModel) => void): void {
    if (Array.isArray(this.model.relationships)) {
      this.model.relationships[0].relationship.forEach(action);
    }
  }

  forEachDiagram(action: (view: ViewModel) => void) {
    this.model.views[0].diagrams[0].view.forEach(action);
  }

  isAccessRelationship(relationship: RelationshipModel): boolean {
    return relationship.$['xsi:type'].localeCompare('Access') === 0;
  }

  isAssociationRelationship(relationship: RelationshipModel): boolean {
    return relationship.$['xsi:type'].localeCompare('Association') === 0;
  }

  isViewObject(viewElement: NodeModel): boolean {
    return viewElement.$['xsi:type'].localeCompare('Element') === 0;
  }

  isViewNote(viewElement: NodeModel): boolean {
    return viewElement.$['xsi:type'].localeCompare('Label') === 0;
  }

  isViewGroup(viewElement: ViewModel): boolean {
    return viewElement.$['xsi:type'].localeCompare('Container') === 0;
  }

  isJunctionNode(node: ElementModel): boolean {
    return (
      node.$['xsi:type'].localeCompare('OrJunction') === 0 ||
      node.$['xsi:type'].localeCompare('AndJunction') === 0
    );
  }
}
