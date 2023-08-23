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
import { ArchiElementType, ElementType } from '@lib/common/enums/elementType';
import { ArchiRelationshipType } from '@lib/common/enums/relationshipType';
import { ArchiViewType } from '@lib/common/enums/viewType';

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

  /**
   * Get the model identification
   * @return model ID
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
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
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const node = model['archimate:model'].folder[0].element[0];
   * const id = inputInterpreter.getNodeId(node);
   */
  getNodeId(node: Element): string {
    return node.$.id.replace('id-', '');
  }

  /**
   * Returns the node name
   * @param node Node
   * @return Node name
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const node = model['archimate:model'].folder[0].element[0];
   * const name = inputInterpreter.getNodeName(node);
   */
  getNodeName(node: Element): string {
    return node.$.name || UNKNOWN;
  }

  /**
   * Returns the node type
   * @param node Node
   * @return Node type
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const node = model['archimate:model'].folder[0].element[0];
   * const type = inputInterpreter.getNodeType(node);
   * */
  getNodeType(node: Element): string {
    return node.$['xsi:type'].replace('archimate:', '');
  }

  /**
   * Returns the node documentation
   * @param node Node
   * @return Node documentation
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const node = model['archimate:model'].folder[0].element[0];
   * const documentation = inputInterpreter.getNodeDocumentation(node);
   */
  getNodeDocumentation(node: Element): string | null {
    return node.documentation && node.documentation[0] ? node.documentation[0] : null;
  }

  /**
   * Returns the node Junction type
   * @param node
   * @return Node Junctions type
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const node = model['archimate:model'].folder[0].element[0];
   *
   * if(inputInterpreter.isJunctionNode(node))
   * const type = inputInterpreter.getNodeJunctionType(node);
   */
  getNodeJunctionType(node: Element): string {
    const type = node.$.type;

    if (type === undefined) {
      // AND junction
      return ElementType.AndJunction;
    } else {
      return ElementType.OrJunction;
    }
  }

  /**
   * Returns the node properties
   * @param node Node
   * @return Node properties
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const node = model['archimate:model'].folder[0].element[0];
   *
   * const properties = inputInterpreter.getNodeProperties(node);
   */
  getNodeProperties(node: Element): Array<Property> {
    return node.property;
  }

  /**
   * Returns the property entry
   * @param property property
   * @return Property entry
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const property = model['archimate:model'].folder[0].element[0].property[0];
   *
   * const propertyEntry = inputInterpreter.getPropertyEntry(property);
   */
  getPropertyEntry(property: Property): Array<string> {
    if (property && property.$ && property.$.key && property.$.value) {
      return [property.$.key, property.$.value];
    } else {
      return [];
    }
  }

  /**
   * Returns the relationship identification
   * @param relationship Relationship
   * @return Relationship ID
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const relationship = model['archimate:model'].folder[0].element[0];
   *
   * const id = inputInterpreter.getRelationshipId(relationship);
   */
  getRelationshipId(relationship: Element): string {
    return relationship.$.id.replace('id-', '');
  }

  /**
   * Returns relationship name
   * @param relationship Relationship
   * @return Relationship Name
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const relationship = model['archimate:model'].folder[0].element[0];
   *
   * const name = inputInterpreter.getRelationshipName(relationship);
   */
  getRelationshipName(relationship: Element): string {
    if (relationship.$.name !== undefined) {
      return relationship.$.name;
    }

    return '';
  }

  /**
   * Returns the relationship source identification
   * @param relationship Relationship
   * @return Relationship source ID
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const relationship = model['archimate:model'].folder[0].element[0];
   *
   * const sourceId = inputInterpreter.getRelationshipSourceId(relationship);
   */
  getRelationshipSourceId(relationship: Element): string {
    return relationship.$.source.replace('id-', '');
  }

  /**
   * Returns the relationship target identification
   * @param relationship Relationship
   * @return Relationship target ID
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const relationship = model['archimate:model'].folder[0].element[0];
   *
   * const targetId = inputInterpreter.getRelationshipTargetId(relationship);
   */
  getRelationshipTargetId(relationship: Element): string {
    return relationship.$.target.replace('id-', '');
  }

  /**
   * Returns the relationship type
   * @param relationship Relationship
   * @return Relationship type
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const relationship = model['archimate:model'].folder[0].element[0];
   *
   * const type = inputInterpreter.getRelationshipType(relationship);
   */
  getRelationshipType(relationship: Element): string {
    return relationship.$['xsi:type'].replace('archimate:', '');
  }

  /**
   * Returns the access relationship direction
   * @param relationship Relationship
   * @return The access relationship direction
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const relationship = model['archimate:model'].folder[0].element[0];
   *
   * const { source, target } = inputInterpreter.getAccessRelationshipDirection(relationship);
   */
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
        default:
          break;
      }
    }
  }

  /**
   * Checks if the association relationship is directed
   * @param relationship Relationship
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const relationship = model['archimate:model'].folder[0].element[0];
   *
   * const isDirected = inputInterpreter.getAssociationRelationshipIsDirected(relationship);
   */
  getAssociationRelationshipIsDirected(relationship: Element): boolean {
    const isDirected = relationship.$.directed;

    if (isDirected === undefined) {
      return false;
    } else {
      return isDirected === 'true';
    }
  }

  /**
   * Returns the folder name
   * @param folder Folder
   * @return Folder name
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const folder = model['archimate:model'].folder[0];
   *
   * const folderName = inputInterpreter.getFolderName(folder);
   */
  getFolderName(folder: Folder): string {
    return folder.$.name || UNKNOWN;
  }

  /**
   * Returns the sub folders
   * @param folder Folder
   * @return List of sub folder
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const folder = model['archimate:model'].folder[0];
   *
   * const folders = inputInterpreter.getSubFolders(folder);
   */
  getSubFolders(folder: Folder): Array<ChildFolder> {
    return 'folder' in folder && folder.folder ? folder.folder : [];
  }

  /**
   * Returns a folder views
   * @param folder Folder
   * @return Folder views
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const folder = model['archimate:model'].folder[0];
   *
   * const folders = inputInterpreter.getFolderViews(folder);
   */
  getFolderViews(folder: Folder): Array<View> {
    return 'element' in folder && folder.element ? folder.element : [];
  }

  /**
   * Returns a view elements
   * @param view View Model
   * @return View Elements
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const view = model['archimate:model'].folder[8].folder[0].element[3];
   *
   * const elements = inputInterpreter.getViewElements(view);
   */
  getViewElements(view: View): Array<ChildElement> {
    return 'child' in view && view.child ? view.child : [];
  }

  /**
   * Returns the view identification
   * @param view View
   * @return View ID
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const view = model['archimate:model'].folder[8].folder[0].element[3];
   *
   * const id = inputInterpreter.getViewId(view);
   */
  getViewId(view: View): string {
    return view.$.id.replace('id-', '');
  }

  /**
   * Returns a view name
   * @param view View
   * @return View name
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const view = model['archimate:model'].folder[8].folder[0].element[3];
   *
   * const name = inputInterpreter.getViewName(view);
   */
  getViewName(view: View): string {
    return view.$.name || UNKNOWN;
  }

  /**
   * Returns the element view identification
   * @param viewElement View Element
   * @return Element View ID
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const viewElement = model['archimate:model'].folder[8].folder[0].element[0];
   *
   * const id = inputInterpreter.getViewElementViewId(viewElement);
   */
  getViewElementViewId(viewElement: ChildElement): string {
    return viewElement.$.id.replace('id-', '');
  }

  /**
   * Returns the view element model identification
   * @param viewElement View Element
   * @return View element model ID
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const viewElement = model['archimate:model'].folder[8].folder[0].element[0];
   *
   * const id = inputInterpreter.getViewElementModelId(viewElement);
   */
  getViewElementModelId(viewElement: ChildElement): string {
    return viewElement.$.archimateElement.replace('id-', '');
  }

  /**
   * Returns the position x of view element
   * @param viewElement View Element
   * @param parentId parent ID
   * @param parentViewElements List of parent view elements
   * @return Position x
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const viewElement = model['archimate:model'].folder[8].folder[0].element[0];
   *
   * const positionX = inputInterpreter.getViewElementPositionX(viewElement, null, undefined);
   */
  getViewElementPositionX(
    viewElement: ChildElement,
    parentId?: string,
    parentViewElements?: Array<ChildElement>,
  ): number {
    return parseInt(viewElement.bounds[0].$.x, 0);
  }

  /**
   * Returns the position y of view element
   * @param viewElement View Element
   * @param parentId Parent ID
   * @param parentViewElements List of parent view elements
   * @return Position Y
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const viewElement = model['archimate:model'].folder[8].folder[0].element[0];
   *
   * const positionY = inputInterpreter.getViewElementPositionY(viewElement, null, undefined);
   */
  getViewElementPositionY(
    viewElement: ChildElement,
    parentId?: string,
    parentViewElements?: unknown,
  ): number {
    return parseInt(viewElement.bounds[0].$.y, 0);
  }

  /**
   * Returns the view element width
   * @param viewElement View Element
   * @return View Element width
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const viewElement = model['archimate:model'].folder[8].folder[0].element[0];
   *
   * const width = inputInterpreter.getViewElementWidth(viewElement);
   */
  getViewElementWidth(viewElement: ChildElement): number {
    return parseInt(viewElement.bounds[0].$.width, 0);
  }

  /**
   * Returns the view element height
   * @param viewElement View Element
   * @return View Element height
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const viewElement = model['archimate:model'].folder[8].folder[0].element[0];
   *
   * const height = inputInterpreter.getViewElementHeight(viewElement);
   */
  getViewElementHeight(viewElement: ChildElement): number {
    return parseInt(viewElement.bounds[0].$.height, 0);
  }

  /**
   * Returns the view element source relationship
   * @param viewElement View Element
   * @return Empty Array
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const viewElement = model['archimate:model'].folder[8].folder[0].element[0];
   *
   * const viewElementSource = inputInterpreter.getViewElementSourceRelationships(viewElement);
   */
  getViewElementSourceRelationships(viewElement: ChildElement): Array<Relationship> {
    return viewElement.sourceConnection;
  }

  /**
   * Returns the view element nested elements
   * @param viewElement View Element
   * @return Nested elements
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const viewElement = model['archimate:model'].folder[8].folder[0].element[0];
   *
   * const nestedElements = inputInterpreter.getViewElementNestedElements(viewElement);
   */
  getViewElementNestedElements(viewElement: ChildElement): Array<ChildElement> {
    return viewElement.child;
  }

  /**
   * Returns the view Element
   * @param viewElements View Elements
   * @param id View element ID
   * @return View Element
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const viewElements = model['archimate:model'].folder[8].folder[0].element;
   *
   * const element = inputInterpreter.findViewElement(
   *    viewElements,
   *   '4ac2c3f6-739a-4598-9e8f-2600e0964ace',
   * );
   */
  findViewElement(viewElements: Array<ChildElement>, id: string): ChildElement | null {
    if (Array.isArray(viewElements)) {
      for (let i = 0; i < viewElements.length; i++) {
        const element = viewElements[i];

        if (element.$.id.replace('id-', '').localeCompare(id) === 0) {
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
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const viewElements = model['archimate:model'].folder[8].folder[0].element;
   *
   * const element = inputInterpreter.findViewElementParent(viewElements,'id-90587bb4-b903-4d1e-af17-ec1deb1a6a3e');
   */
  findViewElementParent(viewElements: Array<ChildElement>, id: string): ChildElement | null {
    if (Array.isArray(viewElements)) {
      for (let i = 0; i < viewElements.length; i++) {
        const element = viewElements[i];

        const child = this.getViewElementNestedElements(element);

        if (child !== undefined) {
          const response = this.findViewElementParent(child, id);

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

  /**
   * Calculate and returns a nested element position
   * @param viewElements Views elements
   * @param id Element ID
   * @return Bendpoint
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const viewElements = model['archimate:model'].folder[8].folder[0].element;
   *
   * const positions = inputInterpreter.calculateNestedPosition(viewElements,'id-90587bb4-b903-4d1e-af17-ec1deb1a6a3e');
   */
  calculateNestedPosition(viewElements: Array<ChildElement>, id: string): Bendpoint | null {
    if (Array.isArray(viewElements)) {
      for (let i = 0; i < viewElements.length; i++) {
        const element = viewElements[i];

        const child = this.getViewElementNestedElements(element);

        if (child !== undefined) {
          const response = this.calculateNestedPosition(child, id);

          if (response !== null) {
            const x = this.getViewElementPositionX(element) || 0;
            const y = this.getViewElementPositionY(element) || 0;

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

  /**
   * Returns the view note content
   * @param viewElement View Element
   * @return View note content
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const viewElement = model['archimate:model'].folder[8].folder[0].element[0];
   *
   * const content = inputInterpreter.getViewNoteContent(viewElement);
   */
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

  /**
   * Returns the view group name
   * @param viewElement View Element
   * @return View group name
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const viewElement = model['archimate:model'].folder[8].folder[0].element[0];
   *
   * const name = inputInterpreter.getViewGroupName(viewElement);
   */
  getViewGroupName(viewElement: ChildElement): string {
    if (viewElement.$.name !== undefined) {
      return viewElement.$.name;
    }

    return UNKNOWN;
  }

  /**
   * Returns the view relationship bendpoints
   * @param viewRelationship View Relationship
   * @return View Relationship bendpoint
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const relationship = model['archimate:model'].folder[8].folder[0].element[1].child[0].sourceConnection[0];
   *
   * const bendpoints = inputInterpreter.getViewRelationshipBendpoints(relationship);
   *      */
  getViewRelationshipBendpoints(viewRelationship: Relationship): Array<BendpointModel> {
    return viewRelationship.bendpoint;
  }

  /**
   * Returns the Relationship bendpoint
   * @param bendpoint Bendpoint Model
   * @param bendpointIndex Bendpoint index
   * @param bendpointsLength Bendpoint quantity
   * @param sourceViewElement Source View Element
   * @param targetViewElement Target View Element
   * @param viewNodes View Nodes
   * @return Bendpoint
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   *
   * const relationship = model['archimate:model'].folder[8].folder[0].element[1].child[0].sourceConnection[0];
   * const sourceViewElement = model['archimate:model'].folder[8].folder[0].element[1].child[0];
   * const targetViewElement = model['archimate:model'].folder[8].folder[0].element[1].child[1];
   * const views = model['archimate:model'].folder[8].folder[0].element[1].child;
   *
   * const { x, y } = inputInterpreter.getViewRelationshipBendpoint(relationship.bendpoint, 1, 0, sourceViewElement, targetViewElement, views);
   */
  getViewRelationshipBendpoint(
    bendpoint: BendpointModel,
    bendpointIndex: number,
    bendpointsLength: number,
    sourceViewElement: ChildElement | null,
    targetViewElement: ChildElement | null,
    viewNodes: Array<ChildElement>,
  ): Bendpoint {
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

    const sourceWidth = sourceBounds.width ? +sourceBounds.width : 0;
    const sourceHeight = sourceBounds.height ? +sourceBounds.height : 0;
    const targetWidth = targetBounds.width ? +targetBounds.width : 0;
    const targetHeight = targetBounds.height ? +targetBounds.height : 0;

    if (sourceParentPositionIncrement !== null) {
      sourceIncrementX = sourceParentPositionIncrement.x;
      sourceIncrementY = sourceParentPositionIncrement.y;
    }

    if (targetParentPositionIncrement !== null) {
      targetIncrementX = targetParentPositionIncrement.x;
      targetIncrementY = targetParentPositionIncrement.y;
    }

    const sourcePositionX = sourceXPosition + sourceIncrementX;
    const sourcePositionY = sourceYPosition + sourceIncrementY;
    const targetPositionX = targetXPosition + targetIncrementX;
    const targetPositionY = targetYPosition + targetIncrementY;
    const weight = (bendpointIndex + 1) / (bendpointsLength + 1);

    const x =
      (sourcePositionX + sx + sourceWidth / 2) * (1.0 - weight) +
      weight * (targetPositionX + ex + targetWidth / 2);
    const y =
      (sourcePositionY + sy + sourceHeight / 2) * (1.0 - weight) +
      weight * (targetPositionY + ey + targetHeight / 2);

    return { x: Math.trunc(x), y: Math.trunc(y) };
  }

  /**
   * Returns the Relationship model identification
   * @param viewRelationship View Relationship
   * @return Relationship model ID
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   *
   * const relationship = model['archimate:model'].folder[8].folder[0].element[1].child[0].sourceConnection[0];
   *
   * const id = inputInterpreter.getViewRelationshipModelId(relationship);
   */
  getViewRelationshipModelId(viewRelationship: Relationship): string | null {
    return viewRelationship.$.archimateRelationship
      ? viewRelationship.$.archimateRelationship.replace('id-', '')
      : null;
  }

  /**
   * Returns the view relationship identification
   * @param viewRelationship View Relationship
   * @return View relationship id
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   *
   * const relationship = model['archimate:model'].folder[8].folder[0].element[1].child[0].sourceConnection[0];
   *
   * const id = inputInterpreter.getViewRelationshipId(relationship);
   */
  getViewRelationshipId(viewRelationship: Relationship): string {
    return viewRelationship.$.id.replace('id-', '');
  }

  /**
   * Returns the view relationship source element identification
   * @param viewRelationship View Relationship
   * @return View relationship source element ID
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   *
   * const relationship = model['archimate:model'].folder[8].folder[0].element[1].child[0].sourceConnection[0];
   *
   * const id = inputInterpreter.getViewRelationshipSourceElementId(relationship);
   */
  getViewRelationshipSourceElementId(viewRelationship: Relationship): string {
    return viewRelationship.$.source.replace('id-', '');
  }

  /**
   * Returns the view relationship target element identification
   * @param viewRelationship View Relationship
   * @return View relationship target element ID
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   *
   * const relationship = model['archimate:model'].folder[8].folder[0].element[1].child[0].sourceConnection[0];
   *
   * const id = inputInterpreter.getViewRelationshipTargetElementId(relationship);
   */
  getViewRelationshipTargetElementId(viewRelationship: Relationship): string {
    return viewRelationship.$.target.replace('id-', '');
  }

  /**
   * Returns an organizations folders
   * @return List of Organization's folder
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   *
   * const folders = inputInterpreter.getOrganizationFolders();
   */
  getOrganizationFolders(): Array<ChildFolder> {
    // Archi allows folder creation just inside the predefined folders
    let organizationFolder = null;

    this.modelFolders.forEach(folder => {
      if (folder.$.type.localeCompare(ArchiElementType.Diagrams) === 0) {
        organizationFolder = folder;
      }
    });

    return [organizationFolder];
  }

  /**
   * Validates the Aoeff model
   */
  validate(): boolean {
    if (this.modelRoot !== undefined) {
      if (this.modelRoot.folder !== undefined) {
        this.modelFolders = this.modelRoot.folder;

        return true;
      }
    }

    return false;
  }

  /**
   * Loops through a list of views relationships
   * @param view View Model
   * @param action Action foe each relationship view in the list
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const view = model['archimate:model'].folder[8].folder[0].element[3];
   *
   * inputInterpreter.forEachViewRelationship(view, (connection) =>{});
   */
  forEachViewRelationship(view: View, action: (relationship: Relationship) => void): void {
    // Empty because the Archi interpreter does not need to use this function
  }

  /**
   * Loops through a list of nodes
   * @param action Action for each node in the list
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   *
   * inputInterpreter.forEachModelNode((node) => {});
   */
  // TODO: Get elements in Subfolders
  forEachModelNode(action: (node: Element) => void): void {
    this.modelFolders.forEach(folder => {
      if (
        folder.$.type.localeCompare(ArchiElementType.Relations) !== 0 &&
        folder.$.type.localeCompare(ArchiElementType.Diagrams) !== 0
      ) {
        const modelElements = folder.element;

        if (Array.isArray(modelElements)) {
          modelElements.forEach(action);
        }
      }
    });
  }

  /**
   * Loops through a list of relationship
   * @param action Action for each relationship in the list
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   *
   * inputInterpreter.forEachModelRelationship((relationship) => {});
   */
  forEachModelRelationship(action: (relationship: Element) => void): void {
    this.modelFolders.forEach(folder => {
      if (folder.$.type.localeCompare(ArchiElementType.Relations) === 0) {
        let modelElements = folder.element;

        if (Array.isArray(modelElements)) {
          modelElements.forEach(action);
        }
      }
    });
  }

  /**
   * Loops through a list of diagram
   * @param action Action for each diagram in the list
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   *
   * inputInterpreter.forEachDiagram((view) => {});
   */
  forEachDiagram(action: (diagram: Element) => void) {
    return null;
  }

  /**
   * Checks if the relationship type is Access
   * @param relationship Relationship
   * @return boolean
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const relationship = model['archimate:model'].folder[8].folder[0].element[1].child[0].sourceConnection[0];
   *
   * const isAccessRelationship = inputInterpreter.isAccessRelationship(relationship);
   */
  isAccessRelationship(relationship: Element): boolean {
    return relationship.$['xsi:type'].localeCompare(ArchiRelationshipType.Access) === 0;
  }

  /**
   * Checks if the relationship type is Association
   * @param relationship Relationship
   * @return boolean
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const relationship = model['archimate:model'].folder[8].folder[0].element[1].child[0].sourceConnection[0];
   *
   * const isAssociationRelationship = inputInterpreter.isAssociationRelationship(relationship);
   */
  isAssociationRelationship(relationship: Element): boolean {
    return relationship.$['xsi:type'].localeCompare(ArchiRelationshipType.Association) === 0;
  }

  /**
   * Checks if the view element type is Object
   * @param viewElement View Element
   * @return boolean
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const node = model['archimate:model'].folder[8].folder[0].element[1].child[1];
   *
   * const isViewObject = inputInterpreter.isViewObject(node);
   */
  isViewObject(viewElement: ChildElement): boolean {
    return viewElement.$['xsi:type'].localeCompare(ArchiViewType.DiagramObject) === 0;
  }

  /**
   * Checks if the view element type is Note
   * @param viewElement View Element
   * @return boolean
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const node = model['archimate:model'].folder[8].folder[0].element[1].child[1];
   *
   * const isViewNote = inputInterpreter.isViewNote(node);
   */
  isViewNote(viewElement: ChildElement): boolean {
    return viewElement.$['xsi:type'].localeCompare(ArchiViewType.Note) === 0;
  }

  /**
   * Checks if the view element type is Group
   * @param viewElement View Element
   * @return boolean
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const node = model['archimate:model'].folder[8].folder[0].element[1].child[1];
   *
   * const isViewGroup = inputInterpreter.isViewGroup(node);
   */
  isViewGroup(viewElement: ChildElement): boolean {
    return viewElement.$['xsi:type'].localeCompare(ArchiViewType.Group) === 0;
  }

  /**
   * Checks if the node element type is JunctionNode
   * @param node Element model
   * @return boolean
   * @example
   * import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
   * const model = {} // Archi Model
   * const inputInterpreter = new Archi4Interpreter(model);
   * const element = model['archimate:model'].folder[8].folder[0].element[1];
   *
   * const isJunctionNode = inputInterpreter.isJunctionNode(element);
   */
  isJunctionNode(node: Element): boolean {
    return node.$['xsi:type'].localeCompare(ArchiElementType.Junction) === 0;
  }

  /**
   * Returns the "viewElementChildRelationships" value
   */
  hasViewElementWithChildRelationships(): boolean {
    return this.hasViewElementChildRelationships;
  }
}
