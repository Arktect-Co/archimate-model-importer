import {
  AoeffModel,
  CandidateView,
  ConnectionModel,
  ElementModel,
  Model,
  ItemModel,
  ViewModel,
  NodeModel,
  Property,
  RelationshipModel,
  BendpointModel,
} from '@lib/common/interfaces/aoeffModel';
import _ from 'lodash';
import { RelationshipAccessType } from '@lib/common/enums/relationshipAccessType';
import { Bendpoint } from '@lib/common/interfaces/Bendpoint';
import { FolderType } from '@lib/common/enums/folderType';
import { AoeffRelationshipType } from '@lib/common/enums/relationshipType';
import { AoeffViewType } from '@lib/common/enums/viewType';
import { ElementType } from '@lib/common/enums/elementType';
import { Interpreter } from '@lib/common/interfaces/Interpreter';

const UNKNOWN = 'Unknown Name';

export interface AccessRelationshipDirection {
  source: boolean;
  target: boolean;
}

interface ViewRelationshipBendpointSetting {
  bendpoint: BendpointModel;
  bendpointIndex?: number;
  bendpointsLength?: number;
  sourceViewElement?: NodeModel | null;
  targetViewElement?: NodeModel | null;
  viewNodes?: Array<NodeModel>;
}

interface PositionSetting {
  viewElement: NodeModel;
  parentId?: string | null;
  parentViewElements?: Array<NodeModel>;
}

export type AoeffInterpreterModel = Interpreter<
  Model,
  ElementModel,
  RelationshipModel,
  Property,
  ViewModel,
  ItemModel,
  CandidateView,
  NodeModel,
  ConnectionModel,
  BendpointModel
>;

/**
 *  AOEFF has a limitation when loading relationships of nested elements with its parents. The model
 *  ignores this type of relationship
 */
export class AoeffInterpreter implements AoeffInterpreterModel {
  public model: Model;
  public readonly modelid: string;
  public isNestedDiagramStructure: boolean;
  public hasViewElementChildRelationships: boolean;

  constructor(model: AoeffModel) {
    this.model = model.model;
    this.modelid = model['model'].$['identifier'];
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
    return node?.documentation?.[0]?._ ? node.documentation[0]._ : null;
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
    if (property?.$?.propertyDefinitionRef && property?.value?.[0]?._) {
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
      default:
        return {
          source: false,
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
    const isDirected = relationship.$.isDirected;

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
    const subFolders: Array<ItemModel> = [];

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
    const folderViews: Array<CandidateView> = [];
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
  getViewId(view: ViewModel | CandidateView): string {
    if ('identifier' in view.$ && view.$.identifier !== undefined)
      return view.$.identifier.replace('id-', '');

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
  getViewName(view: ViewModel | CandidateView): string {
    if ('name' in view && view !== undefined && view.name !== undefined) {
      // It's a view of the Views folder
      return view.name[0]['_'] ? view.name[0]['_'] : view.name[0];
    } else {
      // It's a view of the Organizations' folder
      // Finding the view related with the ID indicated in the folder
      const el = _.find(this.model.views[0].diagrams[0].view, v => {
        return v.$.identifier.localeCompare(view.$.identifierRef) === 0;
      });

      if (el?.name) {
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
   * @param setting
   * @param setting.viewElement View Element
   * @param setting.parentId parent ID
   * @param setting.parentViewElements List of parent view elements
   * @return Position x
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const viewElement = model.model.views[0].diagrams[0].view[0].node[0];
   *
   * const positionX = inputInterpreter.getViewElementPositionX({viewElement, parentId: null, parentViewElements: undefined});
   */
  getViewElementPositionX({ viewElement, parentId, parentViewElements }: PositionSetting): number {
    let x = parseInt(viewElement.$.x, 0);

    if (parentId) {
      const parent = this.findViewElement(parentViewElements, parentId);

      x = x - parseInt(parent.$.x, 0);
    }

    return x;
  }

  /**
   * Returns the position y of view element
   * @param setting
   * @param setting.viewElement View Element
   * @param setting.parentId Parent ID
   * @param setting.parentViewElements List of parent view elements
   * @return Position Y
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const viewElement = model.model.views[0].diagrams[0].view[0].node[0];
   *
   * const positionY = inputInterpreter.getViewElementPositionY({viewElement, parentId: null, parentViewElements: undefined});
   */
  getViewElementPositionY({ viewElement, parentId, parentViewElements }: PositionSetting): number {
    let y = parseInt(viewElement.$.y, 0);

    if (parentId) {
      const parent = this.findViewElement(parentViewElements, parentId);

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
   * @param _viewElement View Element
   * @return Empty Array
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   *
   * const node = model.model.views[0].diagrams[0].view[0].node[0];
   * const viewElementSource = inputInterpreter.getViewElementSourceRelationships(node);
   */
  getViewElementSourceRelationships(_viewElement: NodeModel): Array<ConnectionModel> {
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
      for (const element of viewElements) {
        if (element.$.identifier.replace('id-', '').localeCompare(id) === 0) {
          return element;
        }

        const child = this.getViewElementNestedElements(element);

        if (child !== undefined) {
          const result = this.findViewElement(child, id);

          if (result !== null) {
            return result;
          }
        }
      }
    }

    return null;
  }

  /**
   * Returns the view element parent
   * @param viewElements View elements
   * @param id niew element ID
   * @return View Element
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const nodes = model.model.views[0].diagrams[0].view[1].node;
   *
   * const element = inputInterpreter.findViewElementParent(nodes,'id-90587bb4-b903-4d1e-af17-ec1deb1a6a3e');
   */
  findViewElementParent(viewElements: Array<NodeModel>, id: string): NodeModel | null {
    if (Array.isArray(viewElements)) {
      for (const element of viewElements) {
        const child = this.getViewElementNestedElements(element);

        if (child !== undefined) {
          for (const childElement of child) {
            if (childElement.$.identifier.localeCompare(id) === 0) {
              return element;
            }
          }
        }
      }
    }

    return null;
  }

  /**
   * Calculate and returns a nested element position
   * @param viewElements Views elements
   * @param id Element ID
   * @return Bendpoint
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const nodes = model.model.views[0].diagrams[0].view[1].node;
   *
   * const positions = inputInterpreter.calculateNestedPosition(nodes,'id-90587bb4-b903-4d1e-af17-ec1deb1a6a3e');
   */
  calculateNestedPosition(viewElements: Array<NodeModel>, id: string): Bendpoint | null {
    if (Array.isArray(viewElements)) {
      for (const element of viewElements) {
        const child = this.getViewElementNestedElements(element);

        if (child !== undefined) {
          const response = this.calculateNestedPosition(child, id);

          if (response !== null) {
            const x = this.getViewElementPositionX({ viewElement: element });
            const y = this.getViewElementPositionY({ viewElement: element });

            response.x += x ? x : 0;
            response.y += y ? y : 0;

            return response;
          } else {
            for (const childElement of child) {
              if (this.getViewElementViewId(childElement).localeCompare(id) === 0) {
                return {
                  x: this.getViewElementPositionX({ viewElement: element }),
                  y: this.getViewElementPositionY({ viewElement: element }),
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
    return label?.[0] ? label[0]['_'] || label[0] : 'No Content';
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

    return label?.[0] ? label[0]['_'] || label[0] : UNKNOWN;
  }

  /**
   * Returns the view relationship bendpoints
   * @param viewRelationship View Relationship
   * @return View Relationship bendpoint
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const relationship = model.model.views[0].diagrams[0].view[1].connection[6];
   *
   * const bendpoints = inputInterpreter.getViewRelationshipBendpoints(relationship);
   *      */
  getViewRelationshipBendpoints(viewRelationship: ConnectionModel): Array<BendpointModel> {
    return viewRelationship.bendpoint;
  }

  /**
   * Returns the Relationship bendpoint
   * @param setting
   * @param setting.bendpoint Bendpoint Model
   * @return Bendpoint
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const relationship = model.model.views[0].diagrams[0].view[1].connection[6];
   *
   * const { x, y } = inputInterpreter.getViewRelationshipBendpoint(relationship.bendpoint);
   */
  getViewRelationshipBendpoint({ bendpoint }: ViewRelationshipBendpointSetting): Bendpoint {
    const x = parseInt(bendpoint.$.x, 0);
    const y = parseInt(bendpoint.$.y, 0);

    return { x, y };
  }

  /**
   * Returns the Relationship model identification
   * @param viewRelationship View Relationship
   * @return Relationship model ID
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const relationship = model.model.views[0].diagrams[0].view[1].connection[6];
   *
   * const id = inputInterpreter.getViewRelationshipModelId(relationship);
   */
  getViewRelationshipModelId(viewRelationship: ConnectionModel): string | null {
    return viewRelationship.$.relationshipRef
      ? viewRelationship.$.relationshipRef.replace('id-', '')
      : null;
  }

  /**
   * Returns the view relationship identification
   * @param viewRelationship View Relationship
   * @return View relationship id
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const relationship = model.model.views[0].diagrams[0].view[1].connection[6];
   *
   * const id = inputInterpreter.getViewRelationshipId(relationship);
   */
  getViewRelationshipId(viewRelationship: ConnectionModel): string {
    return viewRelationship.$.identifier.replace('id-', '');
  }

  /**
   * Returns the view relationship source element identification
   * @param viewRelationship View Relationship
   * @return View relationship source element ID
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const relationship = model.model.views[0].diagrams[0].view[1].connection[6];
   *
   * const id = inputInterpreter.getViewRelationshipSourceElementId(relationship);
   */
  getViewRelationshipSourceElementId(viewRelationship: ConnectionModel): string {
    return viewRelationship.$.source.replace('id-', '');
  }

  /**
   * Returns the view relationship target element identification
   * @param viewRelationship View Relationship
   * @return View relationship target element ID
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const relationship = model.model.views[0].diagrams[0].view[1].connection[6];
   *
   * const id = inputInterpreter.getViewRelationshipTargetElementId(relationship);
   */
  getViewRelationshipTargetElementId(viewRelationship: ConnectionModel): string {
    return viewRelationship.$.target.replace('id-', '');
  }

  /**
   * Returns an organizations folders
   * @return List of Organization's folder
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   *
   * const folders = inputInterpreter.getOrganizationFolders();
   */
  getOrganizationFolders(): Array<ItemModel> {
    const organizationFolders: Array<ItemModel> = [];

    if (
      Array.isArray(this.model.organizations) &&
      this.model.organizations[0] &&
      this.model.organizations[0].item
    ) {
      this.model.organizations[0].item.forEach(folder => {
        if (folder.label) {
          const folderName = folder.label[0]['_'] ? folder.label[0]['_'] : folder.label[0];

          if (folderName !== undefined) {
            if (
              typeof folderName === 'string' &&
              folderName.localeCompare(FolderType.Business) !== 0 &&
              folderName.localeCompare(FolderType.Application) !== 0 &&
              folderName.localeCompare(FolderType.TechnologyAndPhysical) !== 0 &&
              folderName.localeCompare(FolderType.Motivation) !== 0 &&
              folderName.localeCompare(FolderType.ImplementationAndMigration) !== 0 &&
              folderName.localeCompare(FolderType.Strategy) !== 0 &&
              folderName.localeCompare(FolderType.Other) !== 0 &&
              folderName.localeCompare(FolderType.Relations) !== 0
            ) {
              organizationFolders.push(folder);
            }
          }
        }
      });
    }

    return organizationFolders;
  }

  /**
   * Validates the Aoeff model
   */
  validate(): boolean {
    return (
      Array.isArray(this.model.elements) &&
      this.model.name !== undefined &&
      Array.isArray(this.model.views)
    );
  }

  /**
   * Loops through a list of views relationships
   * @param view View Model
   * @param action Action foe each relationship view in the list
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const view = model.model.views[0].diagrams[0].view[1];
   *
   * inputInterpreter.forEachViewRelationship(view, (connection) =>{});
   */
  forEachViewRelationship(view: ViewModel, action: (connection: ConnectionModel) => void) {
    if (view.connection !== undefined) {
      view.connection.forEach(action);
    }
  }

  /**
   * Loops through a list of nodes
   * @param action Action for each node in the list
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   *
   * inputInterpreter.forEachModelNode((node) => {});
   */
  forEachModelNode(action: (node: ElementModel) => void): void {
    if (Array.isArray(this.model.elements)) {
      this.model.elements[0].element.forEach(action);
    }
  }

  /**
   * Loops through a list of relationship
   * @param action Action for each relationship in the list
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   *
   * inputInterpreter.forEachModelRelationship((relationship) => {});
   */
  forEachModelRelationship(action: (relationship: RelationshipModel) => void): void {
    if (Array.isArray(this.model.relationships)) {
      this.model.relationships[0].relationship.forEach(action);
    }
  }

  /**
   * Loops through a list of diagram
   * @param action Action for each diagram in the list
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   *
   * inputInterpreter.forEachDiagram((view) => {});
   */
  forEachDiagram(action: (view: ViewModel) => void) {
    this.model.views[0].diagrams[0].view.forEach(action);
  }

  /**
   * Checks if the relationship type is Access
   * @param relationship Relationship
   * @return boolean
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const relationship = model.model.relationships[0].relationship[5];
   *
   * const isAccessRelationship = inputInterpreter.isAccessRelationship(relationship);
   */
  isAccessRelationship(relationship: RelationshipModel): boolean {
    return relationship.$['xsi:type'].localeCompare(AoeffRelationshipType.Access) === 0;
  }

  /**
   * Checks if the relationship type is Association
   * @param relationship Relationship
   * @return boolean
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const relationship = model.model.relationships[0].relationship[5];
   *
   * const isAssociationRelationship = inputInterpreter.isAssociationRelationship(relationship);
   */
  isAssociationRelationship(relationship: RelationshipModel): boolean {
    return relationship.$['xsi:type'].localeCompare(AoeffRelationshipType.Association) === 0;
  }

  /**
   * Checks if the view element type is Object
   * @param viewElement View Element
   * @return boolean
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const node = model.model.views[0].diagrams[0].view[0].node[0];
   *
   * const isViewObject = inputInterpreter.isViewObject(node);
   */
  isViewObject(viewElement: NodeModel): boolean {
    return viewElement.$['xsi:type'].localeCompare(AoeffViewType.Element) === 0;
  }

  /**
   * Checks if the view element type is Note
   * @param viewElement View Element
   * @return boolean
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const node = model.model.views[0].diagrams[0].view[0].node[0];
   *
   * const isViewNote = inputInterpreter.isViewNote(node);
   */
  isViewNote(viewElement: NodeModel): boolean {
    return viewElement.$['xsi:type'].localeCompare(AoeffViewType.Label) === 0;
  }

  /**
   * Checks if the view element type is Group
   * @param viewElement View Element
   * @return boolean
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const node = model.model.views[0].diagrams[0].view[0].node[0];
   *
   * const isViewGroup = inputInterpreter.isViewGroup(node);
   */
  isViewGroup(viewElement: ViewModel): boolean {
    return viewElement.$['xsi:type'].localeCompare(AoeffViewType.Container) === 0;
  }

  /**
   * Checks if the node element type is JunctionNode
   * @param node Element model
   * @return boolean
   * @example
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * const model = {} // Aoeff Model
   * const inputInterpreter = new AoeffInterpreter(model);
   * const element = model.model.elements[0].element[0];
   *
   * const isJunctionNode = inputInterpreter.isJunctionNode(element);
   */
  isJunctionNode(node: ElementModel): boolean {
    return (
      node.$['xsi:type'].localeCompare(ElementType.OrJunction) === 0 ||
      node.$['xsi:type'].localeCompare(ElementType.AndJunction) === 0
    );
  }
}
