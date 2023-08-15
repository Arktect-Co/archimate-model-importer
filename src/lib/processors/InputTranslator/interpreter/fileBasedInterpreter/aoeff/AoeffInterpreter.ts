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
import { RelationshipAccessType } from '@lib/common/enums/relationshipAccessType';

const UNKNOWN = 'Unknown Name';

interface AccessRelationshipDirection {
  source: boolean;
  target: boolean;
}

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

  /**
   * Returns the node documentation
   * @param node Node
   * @return Node documentation
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const node = model.model.elements[0].element[0];
   * const documentation = inputInterpreter.getNodeDocumentation(node);
   */
  getNodeDocumentation(node: ElementModel): string | null {
    return node.documentation && node.documentation[0] && node.documentation[0]._
      ? node.documentation[0]._
      : null;
  }

  /**
   * Returns the node Junction type
   * @param node
   * @return Node Junctions type
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const node = model.model.elements[0].element[0];
   *
   * if(inputInterpreter.isJunctionNode(node))
   * const type = inputInterpreter.getNodeJunctionType(node);
   */
  getNodeJunctionType(node: ElementModel): string {
    return node.$['xsi:type'];
  }

  /**
   * Returns the node properties
   * @param node Node
   * @return Node properties
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const node = model.model.elements[0].element[0];
   *
   * const properties = inputInterpreter.getNodeProperties(node);
   */
  getNodeProperties(node: ElementModel): Array<Property> | null {
    return node.properties ? node.properties[0].property : null;
  }

  /**
   * Returns the property entry
   * @param property property
   * @return Property entry
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const property = model.model.elements[0].element[0].properties[0].property[0];
   *
   * const propertyEntry = inputInterpreter.getPropertyEntry(property);
   */
  getPropertyEntry(property?: Property): Array<string> {
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

  /**
   * Returns the relationship identification
   * @param relationship Relationship
   * @return Relationship ID
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const relationship = model.model.relationships[0].relationship[0];
   *
   * const propertyEntry = inputInterpreter.getRelationshipId(relationship);
   */
  getRelationshipId(relationship: RelationshipModel): string {
    return relationship.$.identifier.replace('id-', '');
  }

  /**
   * Returns the relationship source identification
   * @param relationship Relationship
   * @return Relationship source ID
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const relationship = model.model.relationships[0].relationship[0];
   *
   * const sourceId = inputInterpreter.getRelationshipSourceId(relationship);
   */
  getRelationshipSourceId(relationship: RelationshipModel): string {
    return relationship.$.source.replace('id-', '');
  }

  /**
   * Returns the relationship target identification
   * @param relationship Relationship
   * @return Relationship target ID
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const relationship = model.model.relationships[0].relationship[0];
   *
   * const targetId = inputInterpreter.getRelationshipTargetId(relationship);
   */
  getRelationshipTargetId(relationship: RelationshipModel): string {
    return relationship.$.target.replace('id-', '');
  }

  /**
   * Returns the relationship type
   * @param relationship Relationship
   * @return Relationship type
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const relationship = model.model.relationships[0].relationship[0];
   *
   * const type = inputInterpreter.getRelationshipType(relationship);
   */
  getRelationshipType(relationship: RelationshipModel): string {
    return `${relationship.$['xsi:type']}relationship`;
  }

  /**
   * Returns the access relationship direction
   * @param relationship Relationship
   * @return The access relationship direction
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const relationship = model.model.relationships[0].relationship[0];
   *
   * const { source, target } = inputInterpreter.getAccessRelationshipDirection(relationship);
   */
  getAccessRelationshipDirection(relationship: RelationshipModel): AccessRelationshipDirection {
    const accessType = relationship.$.accessType;

    if (accessType === undefined)
      return {
        source: false,
        target: true,
      };

    switch (accessType) {
      case RelationshipAccessType.Write:
        return {
          source: false,
          target: true,
        };
      case RelationshipAccessType.Read:
        return {
          source: true,
          target: false,
        };
      case RelationshipAccessType.Access:
        return {
          source: false,
          target: false,
        };
      case RelationshipAccessType.ReadWrite:
        return {
          source: true,
          target: true,
        };
    }
  }

  /**
   * Checks if the association relationship is directed
   * @param relationship Relationship
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const relationship = model.model.relationships[0].relationship[0];
   *
   * const isDirected = inputInterpreter.getAssociationRelationshipIsDirected(relationship);
   */
  getAssociationRelationshipIsDirected(relationship: RelationshipModel): boolean {
    let isDirected = relationship.$.isDirected;

    if (isDirected === undefined) return false;

    return typeof isDirected === 'boolean' ? isDirected : isDirected === 'true';
  }

  /**
   * Returns the folder name
   * @param folder Folder
   * @return Folder name
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const folder = model.model.organizations[0].item[0];
   *
   * const folderName = inputInterpreter.getFolderName(folder);
   */
  getFolderName(folder: ItemModel): string {
    const label = folder.label[0];

    if (label) {
      if (typeof label !== 'string' && label._) {
        return label._;
      }

      return <string>label;
    }

    return UNKNOWN;
  }

  /**
   * Returns the sub folders
   * @param folder Folder
   * @return List of sub folder
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const folder = model.model.organizations[0].item[0];
   *
   * const folders = inputInterpreter.getSubFolders(folder);
   */
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

  /**
   * Returns a folder views
   * @param folder Folder
   * @return Folder views
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const folder = model.model.organizations[0].item[0];
   *
   * const folders = inputInterpreter.getFolderViews(folder);
   */
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

  /**
   * Returns a view elements
   * @param view View Model
   * @return View Elements
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const view = model.model.views[0].diagrams[0].view[0];
   *
   * const elements = inputInterpreter.getViewElements(view);
   */
  getViewElements(view: ViewModel): Array<NodeModel> {
    return view.node;
  }

  /**
   * Returns the view identification
   * @param view View
   * @return View ID
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const view = model.model.views[0].diagrams[0].view[0];
   *
   * const id = inputInterpreter.getViewId(view);
   */
  getViewId(view: ViewModel): string {
    if (view.$.identifier !== undefined) return view.$.identifier.replace('id-', '');

    return view.$.identifierRef.replace('id-', '');
  }

  /**
   * Returns a view name
   * @param view View
   * @return View name
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const view = model.model.views[0].diagrams[0].view[0];
   *
   * const name = inputInterpreter.getViewName(view);
   */
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

  /**
   * Returns the element view identification
   * @param viewElement View Element
   * @return Element View ID
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const viewElement = model.model.views[0].diagrams[0].view[0].node[0];
   *
   * const id = inputInterpreter.getViewElementViewId(viewElement);
   */
  getViewElementViewId(viewElement: NodeModel): string {
    return viewElement.$.identifier.replace('id-', '');
  }

  /**
   * Returns the view element model identification
   * @param viewElement View Element
   * @return View element model ID
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const viewElement = model.model.views[0].diagrams[0].view[0].node[0];
   *
   * const id = inputInterpreter.getViewElementModelId(viewElement);
   */
  getViewElementModelId(viewElement: NodeModel): string {
    return viewElement.$.elementRef.replace('id-', '');
  }

  /**
   * Returns the position x of view element
   * @param viewElement View Element
   * @param parentId parent ID
   * @param parentViewElements List of parent view elements
   * @return Position x
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const viewElement = model.model.views[0].diagrams[0].view[0].node[0];
   *
   * const positionX = inputInterpreter.getViewElementPositionX(viewElement, null, undefined);
   */
  getViewElementPositionX(
    viewElement: NodeModel,
    parentId?: string | null,
    parentViewElements?: Array<NodeModel>,
  ): number {
    let x = parseInt(viewElement.$.x, 0);

    if (parentId) {
      let parent = this.findViewElement(parentViewElements, parentId);

      x = x - parseInt(parent.$.x, 0);
    }

    return x;
  }

  /**
   * Returns the position y of view element
   * @param viewElement View Element
   * @param parentId Parent ID
   * @param parentViewElements List of parent view elements
   * @return Position Y
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const viewElement = model.model.views[0].diagrams[0].view[0].node[0];
   *
   * const positionY = inputInterpreter.getViewElementPositionY(viewElement, null, undefined);
   */
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

  /**
   * Returns the view element width
   * @param viewElement View Element
   * @return View Element width
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const viewElement = model.model.views[0].diagrams[0].view[0].node[0];
   *
   * const width = inputInterpreter.getViewElementWidth(viewElement);
   */
  getViewElementWidth(viewElement: NodeModel): number {
    return parseInt(viewElement.$.w, 0);
  }

  /**
   * Returns the view element height
   * @param viewElement View Element
   * @return View Element height
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const viewElement = model.model.views[0].diagrams[0].view[0].node[0];
   *
   * const height = inputInterpreter.getViewElementHeight(viewElement);
   */
  getViewElementHeight(viewElement: NodeModel): number {
    return parseInt(viewElement.$.h, 0);
  }

  /**
   * Returns the view element source relationship
   * @param viewElement View Element
   * @return Empty Array
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   *
   * const node = model.model.views[0].diagrams[0].view[0].node[0];
   * const viewElementSource = inputInterpreter.getViewElementSourceRelationships(node);
   */
  getViewElementSourceRelationships(viewElement: NodeModel): Array<NodeModel> {
    return [];
  }

  /**
   * Returns the view element nested elements
   * @param viewElement View Element
   * @return Nested elements
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const node = model.model.views[0].diagrams[0].view[1].node[12];
   *
   * const nestedElements = inputInterpreter.getViewElementNestedElements(node);
   */
  getViewElementNestedElements(viewElement: NodeModel): Array<NodeModel> {
    return viewElement.node;
  }

  /**
   * Returns the view Element
   * @param viewElements View Elements
   * @param id View element ID
   * @return View Element
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const nodes = model.model.views[0].diagrams[0].view[1].node;
   *
   * const element = inputInterpreter.findViewElement(
   *    nodes,
   *   '4ac2c3f6-739a-4598-9e8f-2600e0964ace',
   * );
   */
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

  /**
   * Returns the view note content
   * @param viewElement View Element
   * @return View note content
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const node = model.model.views[0].diagrams[0].view[1].node[0];
   *
   * const content = inputInterpreter.getViewNoteContent(node);
   */
  getViewNoteContent(viewElement: NodeModel): string {
    const { label } = viewElement;
    return label && label[0] ? label[0]['_'] || label[0] : 'No Content';
  }

  /**
   * Returns the view group name
   * @param viewElement View Element
   * @return View group name
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const node = model.model.views[0].diagrams[0].view[1].node[0];
   *
   * const name = inputInterpreter.getViewGroupName(node);
   */
  getViewGroupName(viewElement: NodeModel): string {
    const { label } = viewElement;

    return label && label[0] ? label[0]['_'] || label[0] : UNKNOWN;
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
