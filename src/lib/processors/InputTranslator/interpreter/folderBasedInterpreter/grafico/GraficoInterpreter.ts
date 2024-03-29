import fs from 'fs';
import path from 'path';
import xml2js from 'xml2js';
import { Interpreter } from '@lib/common/interfaces/Interpreter';
import { AccessRelationshipDirection } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
import {
  BendpointModel,
  ViewNode,
  View,
  ViewRelationship,
  Node,
  Relationship,
  Property,
} from '@lib/common/interfaces/graficoModel';
import { Bendpoint } from '@lib/common/interfaces/Bendpoint';
import { ArchiElementType, ElementType } from '@lib/common/enums/elementType';
import { ArchiRelationshipType } from '@lib/common/enums/relationshipType';
import { GraficoViewType } from '@lib/common/enums/viewType';

const UNKNOWN = 'Unknown Name';

interface ViewRelationshipBendpointSetting {
  bendpoint: BendpointModel;
  bendpointIndex?: number;
  bendpointsLength?: number;
  sourceViewElement?: ViewNode;
  targetViewElement?: ViewNode;
  viewNodes?: Array<ViewNode>;
}

interface PositionSetting {
  viewElement: ViewNode;
  parentId?: string;
  parentViewElements?: Array<ViewNode>;
}

export type GraficoInterpreterModel = Interpreter<
  unknown,
  Node,
  Relationship,
  Property,
  View,
  string,
  View,
  ViewNode,
  ViewRelationship,
  BendpointModel
>;

export class GraficoInterpreter implements GraficoInterpreterModel {
  public modelPath: string;
  public modelid: string;
  public isNestedDiagramStructure: boolean;
  public hasViewElementChildRelationships: boolean;

  constructor(modelPath: string) {
    this.modelPath = path.join(modelPath, 'model');
    this.modelid = '';
    this.isNestedDiagramStructure = true;
    this.hasViewElementChildRelationships = true;
  }

  /**
   * Returns the first property name
   * @param jsonObj Grafico Model
   * @return Property name
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';   * const model = {} // Archi Model
   * const inputInterpreter = new Grafico("modelPath");
   *
   * const node = {
   *   "node":{
   *     name: "Node 1"
   *   }
   * }
   *
   * const name = GraficoInterpreter._getFirstPropertyName(node);
   */
  private static _getFirstPropertyName(jsonObj: View | Relationship | Node): string {
    for (const key in jsonObj) {
      if (Object.prototype.hasOwnProperty.call(jsonObj, key)) {
        return key;
      }
    }

    return 'Unknown Property';
  }

  /**
   * Get the model identification
   * @return model ID
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';   * const model = {} // Archi Model
   * const inputInterpreter = new Grafico("modelPath");
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
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';   * const model = {} // Archi Model
   * const inputInterpreter = new Grafico("modelPath");
   *
   * inputInterpreter.forEachModelNode((node) => {
   *   const id = inputInterpreter.getNodeId(node);
   * });
   */
  getNodeId(node: Node): string {
    const key = GraficoInterpreter._getFirstPropertyName(node);
    return node[key].$.id;
  }

  /**
   * Returns the node name
   * @param node Node
   * @return Node name
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';   * const model = {} // Archi Model
   * const inputInterpreter = new Grafico("modelPath");
   * inputInterpreter.forEachModelNode((node) => {
   *   const name = inputInterpreter.getNodeName(node);
   * });
   */
  getNodeName(node: Node): string {
    const key = GraficoInterpreter._getFirstPropertyName(node);
    return node[key].$.name || UNKNOWN;
  }

  /**
   * Returns the node type
   * @param node Node
   * @return Node type
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';   * const model = {} // Archi Model
   * const inputInterpreter = new Grafico("modelPath");
   *
   *  inputInterpreter.forEachModelNode((node) => {
   *   const type = inputInterpreter.getNodeType(node);
   * });
   *
   */
  getNodeType(node: Node): string {
    return GraficoInterpreter._getFirstPropertyName(node).replace('archimate:', '');
  }

  /**
   * Returns the node documentation
   * @param node Node
   * @return Node documentation
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';   * const model = {} // Archi Model
   * const inputInterpreter = new Grafico("modelPath");
   *
   *  inputInterpreter.forEachModelNode((node) => {
   *   const type = inputInterpreter.getNodeDocumentation(node);
   * });
   */
  getNodeDocumentation(node: Node): string | null {
    const key = GraficoInterpreter._getFirstPropertyName(node);
    return node[key]?.$?.documentation ? node[key].$.documentation : null;
  }

  /**
   * Returns the node Junction type
   * @param node
   * @return Node Junctions type
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';   * const model = {} // Archi Model
   * const inputInterpreter = new Grafico("modelPath");
   *
   *  inputInterpreter.forEachModelNode((node) => {
   *   if(inputInterpreter.isJunctionNode(node))
   *      const type = inputInterpreter.getNodeJunctionType(node);
   * });
   *
   */
  getNodeJunctionType(node: Node): string {
    const key = GraficoInterpreter._getFirstPropertyName(node);
    const type = node[key].$.type;

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
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';   * const model = {} // Archi Model
   * const inputInterpreter = new Grafico("modelPath");
   *
   *  inputInterpreter.forEachModelNode((node) => {
   *   const properties = inputInterpreter.getNodeProperties(node);
   * });
   *
   */
  getNodeProperties(node: Node): Array<Property> {
    const key = GraficoInterpreter._getFirstPropertyName(node);
    return node[key].properties || [];
  }

  /**
   * Returns the property entry
   * @param property property
   * @return Property entry
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';   * const model = {} // Archi Model
   * const inputInterpreter = new Grafico("modelPath");
   *
   *  inputInterpreter.forEachModelNode((node) => {
   *   const properties = inputInterpreter.getNodeProperties(node);
   *   const propertyEntry = inputInterpreter.getPropertyEntry(properties[0]);
   * });
   *
   */
  getPropertyEntry(property: Property): Array<string> {
    if (property?.$?.key && property?.$?.value) {
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
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';   * const model = {} // Archi Model
   * const inputInterpreter = new Grafico("modelPath");
   *
   * inputInterpreter.forEachModelRelationship((relationship) => {
   *  const id = inputInterpreter.getRelationshipId(relationship);
   * });
   */
  getRelationshipId(relationship: Relationship): string {
    const key = GraficoInterpreter._getFirstPropertyName(relationship);
    return relationship[key].$.id;
  }

  /**
   * Returns relationship name
   * @param relationship Relationship
   * @return Relationship Name
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';   * const model = {} // Archi Model
   * const inputInterpreter = new Grafico("modelPath");
   *
   * inputInterpreter.forEachModelRelationship((relationship) => {
   *  const name = inputInterpreter.getRelationshipName(relationship);
   * });
   */
  getRelationshipName(relationship: Relationship): string {
    const key = GraficoInterpreter._getFirstPropertyName(relationship);
    const name = relationship[key].$.name;

    if (name !== undefined) {
      return name;
    }

    return '';
  }

  /**
   * Returns the relationship source identification
   * @param relationship Relationship
   * @return Relationship source ID
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   *
   * inputInterpreter.forEachModelRelationship((relationship) => {
   *  const sourceId = inputInterpreter.getRelationshipSourceId(relationship);
   * });
   *
   */
  getRelationshipSourceId(relationship: Relationship): string {
    const key = GraficoInterpreter._getFirstPropertyName(relationship);
    return relationship[key].source[0].$.href.replace(/.*#(.*)/g, '$1');
  }

  /**
   * Returns the relationship target identification
   * @param relationship Relationship
   * @return Relationship target ID
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   *
   * inputInterpreter.forEachModelRelationship((relationship) => {
   *  const targetId = inputInterpreter.getRelationshipTargetId(relationship);
   * });
   *
   */
  getRelationshipTargetId(relationship: Relationship): string {
    const key = GraficoInterpreter._getFirstPropertyName(relationship);
    return relationship[key].target[0].$.href.replace(/.*#(.*)/g, '$1');
  }

  /**
   * Returns the relationship type
   * @param relationship Relationship
   * @return Relationship type
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   *
   * inputInterpreter.forEachModelRelationship((relationship) => {
   *  const type = inputInterpreter.getRelationshipType(relationship);
   * });
   *
   */
  getRelationshipType(relationship: Relationship): string {
    return GraficoInterpreter._getFirstPropertyName(relationship).replace('archimate:', '');
  }

  /**
   * Returns the access relationship direction
   * @param relationship Relationship
   * @return The access relationship direction
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   *
   * inputInterpreter.forEachModelRelationship((relationship) => {
   *  const { source, target } = inputInterpreter.getAccessRelationshipDirection(relationship);
   * });
   *
   */
  getAccessRelationshipDirection(relationship: Relationship): AccessRelationshipDirection {
    const key = GraficoInterpreter._getFirstPropertyName(relationship);
    const accessType = relationship[key].$.accessType;
    if (accessType === undefined) {
      return {
        source: false,
        target: true,
      };
    } else {
      switch (accessType) {
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
          return {
            source: false,
            target: true,
          };
      }
    }
  }

  /**
   * Checks if the association relationship is directed
   * @param relationship Relationship
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   *
   * inputInterpreter.forEachModelRelationship((relationship) => {
   *  const isDirected = inputInterpreter.getAssociationRelationshipIsDirected(relationship);
   * });
   *
   */
  getAssociationRelationshipIsDirected(relationship: Relationship): boolean {
    const key = GraficoInterpreter._getFirstPropertyName(relationship);
    const isDirected = relationship[key].$.directed;

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
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   *
   * const folderName = inputInterpreter.getFolderName("Folder Path");
   */
  getFolderName(folder: string): string {
    let folderName = null;
    const filePath = path.join(folder, 'folder.xml');

    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath);

      const parser = new xml2js.Parser({ explicitArray: true });

      parser.parseString(data, (err, folderData) => {
        if (err) throw err;

        folderName = folderData[GraficoInterpreter._getFirstPropertyName(folderData)].$.name; // Seems to be wrong (async), but actually is sync behaviour
      });
    }

    return folderName || UNKNOWN;
  }

  /**
   * Returns the sub folders
   * @param folder Folder
   * @return List of sub folder
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   *
   * const folders = inputInterpreter.getSubFolders("Folder Path");
   */
  getSubFolders(folder: string): Array<string> {
    const folders = [];

    if (fs.existsSync(folder) && fs.lstatSync(folder).isDirectory()) {
      fs.readdirSync(folder).forEach(name => {
        if (fs.statSync(path.join(folder, name)).isDirectory()) {
          folders.push(path.join(folder, name));
        }
      });
    }

    return folders;
  }

  /**
   * Returns a folder views
   * @param folder Folder
   * @return Folder views
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   *
   * const views = inputInterpreter.getFolderViews("Folder Path");
   */
  getFolderViews(folder: string): Array<View> {
    const diagrams = [];
    if (fs.existsSync(folder) && fs.lstatSync(folder).isDirectory()) {
      const folders = fs.readdirSync(folder);

      folders.forEach(name => {
        if (
          name.localeCompare('folder.xml') !== 0 &&
          fs.statSync(path.join(folder, name)).isFile()
        ) {
          const data = fs.readFileSync(path.join(folder, name));

          const parser = new xml2js.Parser({ explicitArray: true });

          parser.parseString(data, (err, diagramData) => {
            if (err) throw err;

            diagrams.push(diagramData);
          });
        }
      });
    }

    return diagrams;
  }

  /**
   * Returns a view elements
   * @param view View Model
   * @return View Elements
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   * const elements = inputInterpreter.getViewElements(views[0]);
   */
  getViewElements(view: View): Array<ViewNode> {
    const key = GraficoInterpreter._getFirstPropertyName(view);
    return view[key].children;
  }

  /**
   * Returns the view identification
   * @param view View
   * @return View ID
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const id = inputInterpreter.getViewId(views[0]);
   */
  getViewId(view: View): string {
    const key = GraficoInterpreter._getFirstPropertyName(view);
    return view[key].$.id;
  }

  /**
   * Returns a view name
   * @param view View
   * @return View name
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const name = inputInterpreter.getViewName(views[0]);
   */
  getViewName(view: View): string {
    const key = GraficoInterpreter._getFirstPropertyName(view);
    return view[key].$.name || UNKNOWN;
  }

  /**
   * Returns the element view identification
   * @param viewElement View Element
   * @return Element View ID
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const id = inputInterpreter.getViewElementViewId(views[0].children[0]);
   */
  getViewElementViewId(viewElement: ViewNode): string {
    return viewElement.$.id;
  }

  /**
   * Returns the view element model identification
   * @param viewElement View Element
   * @return View element model ID
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const id = inputInterpreter.getViewElementModelId(views[0].children[0]);
   */
  getViewElementModelId(viewElement: ViewNode): string {
    return viewElement.archimateElement[0].$.href.replace(/.*#(.*)/g, '$1');
  }

  /**
   * Returns the position x of view element
   * @param setting
   * @param setting.viewElement View Element
   * @return Position x
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const positionX = inputInterpreter.getViewElementPositionX({viewElement: views[0].children[0]});
   */
  getViewElementPositionX({ viewElement }: PositionSetting): number {
    return parseInt(viewElement.bounds[0].$.x, 0);
  }

  /**
   * Returns the position y of view element
   * @param setting
   * @param setting.viewElement View Element
   * @return Position Y
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   * const positionY = inputInterpreter.getViewElementPositionY({viewElement: views[0].children[0]});
   */
  getViewElementPositionY({ viewElement }: PositionSetting): number {
    return parseInt(viewElement.bounds[0].$.y, 0);
  }

  /**
   * Returns the view element width
   * @param viewElement View Element
   * @return View Element width
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const width = inputInterpreter.getViewElementWidth(views[0].children[0]);
   */
  getViewElementWidth(viewElement: ViewNode): number {
    return parseInt(viewElement.bounds[0].$.width, 0);
  }

  /**
   * Returns the view element height
   * @param viewElement View Element
   * @return View Element height
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const height = inputInterpreter.getViewElementHeight(views[0].children[0]);
   */
  getViewElementHeight(viewElement: ViewNode): number {
    return parseInt(viewElement.bounds[0].$.height, 0);
  }

  /**
   * Returns the view element source relationship
   * @param viewElement View Element
   * @return Empty Array
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   * const viewElementSource = inputInterpreter.getViewElementSourceRelationships(views[0].children[0]);
   */
  getViewElementSourceRelationships(viewElement: ViewNode): Array<ViewRelationship> {
    return viewElement.sourceConnections;
  }

  /**
   * Returns the view element nested elements
   * @param viewElement View Element
   * @return Nested elements
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const nestedElements = inputInterpreter.getViewElementNestedElements(views[0].children[0]);
   */
  getViewElementNestedElements(viewElement: ViewNode): Array<ViewNode> {
    return viewElement.children || [];
  }

  /**
   * Returns the view Element
   * @param viewElements View Elements
   * @param id View element ID
   * @return View Element
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const element = inputInterpreter.findViewElement(
   *    views,
   *   '4ac2c3f6-739a-4598-9e8f-2600e0964ace',
   * );
   */
  findViewElement(viewElements: Array<ViewNode>, id: string): ViewNode | null {
    if (Array.isArray(viewElements)) {
      for (const element of viewElements) {
        if (element.$.id.localeCompare(id) === 0) {
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
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const element = inputInterpreter.findViewElementParent(views,'id-90587bb4-b903-4d1e-af17-ec1deb1a6a3e');
   */
  findViewElementParent(viewElements: Array<ViewNode>, id: string): ViewNode | null {
    if (Array.isArray(viewElements)) {
      for (const element of viewElements) {
        const child = this.getViewElementNestedElements(element);

        if (child !== undefined) {
          const response = this.findViewElementParent(child, id);

          if (response !== null) {
            return response;
          } else {
            for (const childElement of child) {
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
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const positions = inputInterpreter.calculateNestedPosition(views,'id-90587bb4-b903-4d1e-af17-ec1deb1a6a3e');
   */
  calculateNestedPosition(viewElements: Array<ViewNode>, id: string): Bendpoint | null {
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
              if (childElement.$.id.localeCompare(id) === 0) {
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
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const content = inputInterpreter.getViewNoteContent(views[0].children[0]);
   */
  getViewNoteContent(viewElement: ViewNode): string {
    if (viewElement.$.content !== undefined) {
      if (typeof viewElement.$.content === 'string') {
        return viewElement.$.content;
      } else {
        return viewElement.$.content[0];
      }
    }

    return 'No Content';
  }

  /**
   * Returns the view group name
   * @param viewElement View Element
   * @return View group name
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const name = inputInterpreter.getViewGroupName(views[0].children[0]);
   */
  getViewGroupName(viewElement: ViewNode): string {
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
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const viewRelationship = views[0]['key'].children[0].sourceConnections[0];
   * const bendpoints = inputInterpreter.getViewRelationshipBendpoints(viewRelationship);
   *      */
  getViewRelationshipBendpoints(viewRelationship: ViewRelationship): Array<BendpointModel> {
    return viewRelationship.bendpoints;
  }

  /**
   * Returns the Relationship bendpoint
   * @param setting
   * @param setting.bendpoint Bendpoint Model
   * @param setting.bendpointIndex Bendpoint index
   * @param setting.bendpointsLength Bendpoint quantity
   * @param setting.sourceViewElement Source View Element
   * @param setting.targetViewElement Target View Element
   * @param setting.viewNodes View Nodes
   * @return Bendpoint
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const source = views[0]['key'].children[0];
   * const target = views[0]['key'].children[1];
   * const bendpoint = views[0]['key'].children[0].sourceConnections[0].bendpoints[0];
   * const { x, y } = inputInterpreter.getViewRelationshipBendpoint({
   *    bendpoint,
   *    bendpointIndex: 0,
   *    bendpointsLength: 1,
   *    sourceViewElement: source,
   *    targetViewElement: target,
   *    viewNodes: views[0]['key'].children,
   * });
   */
  getViewRelationshipBendpoint({
    bendpoint,
    bendpointsLength,
    bendpointIndex,
    viewNodes,
    sourceViewElement,
    targetViewElement,
  }: ViewRelationshipBendpointSetting): Bendpoint {
    const sourceBounds = sourceViewElement.bounds[0].$;
    const targetBounds = targetViewElement.bounds[0].$;
    const sourceXPosition = sourceBounds.x ? Number(sourceBounds.x) : 0;
    const sourceYPosition = sourceBounds.y ? Number(sourceBounds.y) : 0;
    const targetXPosition = targetBounds.x ? Number(targetBounds.x) : 0;
    const targetYPosition = targetBounds.y ? Number(targetBounds.y) : 0;
    const sourceParentPositionIncrement = this.calculateNestedPosition(
      viewNodes,
      sourceViewElement.$.id,
    );
    const targetParentPositionIncrement = this.calculateNestedPosition(
      viewNodes,
      targetViewElement.$.id,
    );
    const sx = bendpoint.$.startX ? Number(bendpoint.$.startX) : 0;
    const sy = bendpoint.$.startY ? Number(bendpoint.$.startY) : 0;
    const ex = bendpoint.$.endX ? Number(bendpoint.$.endX) : 0;
    const ey = bendpoint.$.endY ? Number(bendpoint.$.endY) : 0;
    let sourceIncrementX = 0;
    let sourceIncrementY = 0;
    let targetIncrementX = 0;
    let targetIncrementY = 0;

    const sourceWidth = sourceBounds.width ? Number(sourceBounds.width) : 0;
    const sourceHeight = sourceBounds.height ? Number(sourceBounds.height) : 0;
    const targetWidth = targetBounds.width ? Number(targetBounds.width) : 0;
    const targetHeight = targetBounds.height ? Number(targetBounds.height) : 0;

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
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const viewRelationship = views[0]['key'].children[0].sourceConnections[0];
   *
   * const id = inputInterpreter.getViewRelationshipModelId(viewRelationship);
   */
  getViewRelationshipModelId(viewRelationship: ViewRelationship): string | null {
    return viewRelationship.archimateRelationship
      ? viewRelationship.archimateRelationship[0].$.href.replace(/.*#(.*)/g, '$1')
      : null;
  }

  /**
   * Returns the view relationship identification
   * @param viewRelationship View Relationship
   * @return View relationship id
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const viewRelationship = views[0]['key'].children[0].sourceConnections[0];
   *
   * const id = inputInterpreter.getViewRelationshipId(viewRelationship);
   */
  getViewRelationshipId(viewRelationship: ViewRelationship): string {
    return viewRelationship.$.id;
  }

  /**
   * Returns the view relationship source element identification
   * @param viewRelationship View Relationship
   * @return View relationship source element ID
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const viewRelationship = views[0]['key'].children[0].sourceConnections[0];
   *
   * const id = inputInterpreter.getViewRelationshipSourceElementId(viewRelationship);
   */
  getViewRelationshipSourceElementId(viewRelationship: ViewRelationship): string {
    return viewRelationship.$.source;
  }

  /**
   * Returns the view relationship target element identification
   * @param viewRelationship View Relationship
   * @return View relationship target element ID
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const viewRelationship = views[0]['key'].children[0].sourceConnections[0];
   *
   * const id = inputInterpreter.getViewRelationshipTargetElementId(viewRelationship);
   */
  getViewRelationshipTargetElementId(viewRelationship: ViewRelationship): string {
    return viewRelationship.$.target;
  }

  /**
   * Returns an organizations folders
   * @return List of Organization's folder
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   *
   * const folders = inputInterpreter.getOrganizationFolders();
   */
  getOrganizationFolders(): Array<string> {
    return [path.join(this.modelPath, 'diagrams')];
  }

  /**
   * Validates the Grafico model
   */
  validate(): boolean {
    return (
      fs.existsSync(path.join(this.modelPath, 'diagrams')) &&
      fs.existsSync(path.join(this.modelPath, 'relations')) &&
      fs.existsSync(path.join(this.modelPath, 'folder.xml'))
    );
  }

  /**
   * Loops through a list of views relationships
   * @param _view View Model
   * @param _action Action foe each relationship view in the list
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * inputInterpreter.forEachViewRelationship(view[0], (view) =>{});
   */
  forEachViewRelationship(_view: View, _action: (_view: ViewRelationship) => void): void {
    // Empty because the GRAFICO interpreter does not need to use this function
  }

  /**
   * Loops through a list of nodes
   * @param action Action for each node in the list
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   *
   * inputInterpreter.forEachModelNode((node) => {});
   */
  forEachModelNode(action: (node: Node) => void): void {
    const nodeFolders = [
      'strategy',
      'motivation',
      'business',
      'application',
      'technology',
      'implementation_migration',
      'other',
    ];

    nodeFolders.forEach(folder => {
      const nodeDirectory = path.join(this.modelPath, folder);

      if (fs.existsSync(nodeDirectory) && fs.lstatSync(nodeDirectory).isDirectory()) {
        fs.readdirSync(nodeDirectory).forEach(name => {
          const filePath = path.join(nodeDirectory, name);

          if (name.localeCompare('folder.xml') !== 0 && fs.lstatSync(filePath).isFile()) {
            const data = fs.readFileSync(filePath);

            const parser = new xml2js.Parser({ explicitArray: true });

            parser.parseString(data, (err, nodeData) => {
              if (err) throw err;

              action(nodeData);
            });
          }
        });
      }
    });
  }

  /**
   * Loops through a list of relationship
   * @param action Action for each relationship in the list
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   *
   * inputInterpreter.forEachModelRelationship((relationship) => {});
   */
  forEachModelRelationship(action: (relationship: Relationship) => void): void {
    const relationshipDirectory = path.join(this.modelPath, 'relations');

    if (fs.existsSync(relationshipDirectory) && fs.lstatSync(relationshipDirectory).isDirectory()) {
      fs.readdirSync(relationshipDirectory).forEach(name => {
        const filePath = path.join(relationshipDirectory, name);

        if (name.localeCompare('folder.xml') !== 0 && fs.lstatSync(filePath).isFile()) {
          const data = fs.readFileSync(filePath);

          const parser = new xml2js.Parser({ explicitArray: true });

          parser.parseString(data, (err, relationshipData) => {
            if (err) throw err;

            action(relationshipData);
          });
        }
      });
    }
  }

  /**
   * Loops through a list of diagram
   * @param _action Action for each diagram in the list
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   *
   * inputInterpreter.forEachDiagram((view) => {});
   */
  forEachDiagram(_action: (_view: View) => void) {
    return null;
  }

  /**
   * Checks if the relationship type is Access
   * @param relationship Relationship
   * @return boolean
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   *
   * inputInterpreter.forEachModelRelationship((relationship) => {
   *  const isAccessRelationship = inputInterpreter.isAccessRelationship(relationship);
   * });
   *
   */
  isAccessRelationship(relationship: Relationship): boolean {
    return (
      GraficoInterpreter._getFirstPropertyName(relationship).localeCompare(
        ArchiRelationshipType.Access,
      ) === 0
    );
  }

  /**
   * Checks if the relationship type is Association
   * @param relationship Relationship
   * @return boolean
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   *
   * inputInterpreter.forEachModelRelationship((relationship) => {
   *  const isAssociationRelationship = inputInterpreter.isAssociationRelationship(relationship);
   * });
   */
  isAssociationRelationship(relationship: Relationship): boolean {
    return (
      GraficoInterpreter._getFirstPropertyName(relationship).localeCompare(
        ArchiRelationshipType.Association,
      ) === 0
    );
  }

  /**
   * Checks if the view element type is Object
   * @param viewElement View Element
   * @return boolean
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   *
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const isViewObject = inputInterpreter.isViewObject(views[0]['key'].children[1]);
   *
   */
  isViewObject(viewElement: ViewNode): boolean {
    return viewElement.$['xsi:type'].localeCompare(GraficoViewType.DiagramObject) === 0;
  }

  /**
   * Checks if the view element type is Note
   * @param viewElement View Element
   * @return boolean
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   *
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const isViewNote = inputInterpreter.isViewNote(views[0]['key'].children[1]);
   *
   */
  isViewNote(viewElement: ViewNode): boolean {
    return viewElement.$['xsi:type'].localeCompare(GraficoViewType.Note) === 0;
  }

  /**
   * Checks if the view element type is Group
   * @param viewElement View Element
   * @return boolean
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const isViewGroup = inputInterpreter.isViewGroup(views[0]['key'].children[1]);
   *
   */
  isViewGroup(viewElement: ViewNode): boolean {
    return viewElement.$['xsi:type'].localeCompare(GraficoViewType.Group) === 0;
  }

  /**
   * Checks if the node element type is JunctionNode
   * @param node Element model
   * @return boolean
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   *
   * inputInterpreter.forEachModelNode((node) => {
   *   const isJunctionNode = inputInterpreter.isJunctionNode(element);
   * });
   *
   */
  isJunctionNode(node: Node): boolean {
    return (
      GraficoInterpreter._getFirstPropertyName(node).localeCompare(ArchiElementType.Junction) === 0
    );
  }

  /**
   * Returns the "viewElementChildRelationships" value
   */
  hasViewElementWithChildRelationships(): boolean {
    return this.hasViewElementChildRelationships;
  }
}
