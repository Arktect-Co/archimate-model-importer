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
import { ElementType } from '@lib/common/enums/elementType';
import { ArchiRelationshipType } from '@lib/common/enums/relationshipType';

const UNKNOWN = 'Unknown Name';

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
    for (let key in jsonObj) {
      if (jsonObj.hasOwnProperty(key)) {
        return key;
      }
    }
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
    return node[key].$.documentation || null;
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
    let type = node[key].$.type;

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
    let isDirected = relationship[key].$.directed;

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
      let data = fs.readFileSync(filePath);

      let parser = new xml2js.Parser({ explicitArray: true });

      parser.parseString(data, function (err, folderData) {
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
    let folders = [];

    if (fs.existsSync(folder) && fs.lstatSync(folder).isDirectory()) {
      fs.readdirSync(folder).map(name => {
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
    let diagrams = [];
    if (fs.existsSync(folder) && fs.lstatSync(folder).isDirectory()) {
      fs.readdirSync(folder).map(name => {
        if (
          name.localeCompare('folder.xml') !== 0 &&
          fs.statSync(path.join(folder, name)).isFile()
        ) {
          let data = fs.readFileSync(path.join(folder, name));

          let parser = new xml2js.Parser({ explicitArray: true });

          parser.parseString(data, function (err, diagramData) {
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
   * @param viewElement View Element
   * @param parentId parent ID
   * @param parentViewElements List of parent view elements
   * @return Position x
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * const positionX = inputInterpreter.getViewElementPositionX(views[0].children[0], null, undefined);
   */
  getViewElementPositionX(
    viewElement: ViewNode,
    parentId?: string,
    parentViewElements?: Array<ViewNode>,
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
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   * const positionY = inputInterpreter.getViewElementPositionY(views[0].children[0], null, undefined);
   */
  getViewElementPositionY(
    viewElement: ViewNode,
    parentId?: string,
    parentViewElements?: Array<ViewNode>,
  ): number {
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
      for (let i = 0; i < viewElements.length; i++) {
        const element = viewElements[i];

        const child = this.getViewElementNestedElements(element);

        if (child !== undefined) {
          let response = this.calculateNestedPosition(child, id);

          if (response !== null) {
            let x = this.getViewElementPositionX(element, null, null) || 0;
            let y = this.getViewElementPositionY(element, null, null) || 0;

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
   * @param bendpoint Bendpoint Model
   * @param bendpointIndex Bendpoint index
   * @param bendpointsLength Bendpoint quantity
   * @param sourceViewElement Source View Element
   * @param targetViewElement Target View Element
   * @param viewNodes View Nodes
   * @return Bendpoint
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const source = views[0]['key'].children[0];
   * const target = views[0]['key'].children[1];
   * const bendpoint = views[0]['key'].children[0].sourceConnections[0].bendpoints[0];
   * const { x, y } = inputInterpreter.getViewRelationshipBendpoint(bendpoint, 0, 1, source, target, views[0]['key'].children);
   */
  getViewRelationshipBendpoint(
    bendpoint: BendpointModel,
    bendpointIndex: number,
    bendpointsLength: number,
    sourceViewElement: ViewNode,
    targetViewElement: ViewNode,
    viewNodes: Array<ViewNode>,
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
   * @param view View Model
   * @param action Action foe each relationship view in the list
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   * const views = inputInterpreter.getFolderViews("Folder Path");
   *
   * inputInterpreter.forEachViewRelationship(view[0], (view) =>{});
   */
  forEachViewRelationship(view: View, action: (view: ViewRelationship) => void): void {}

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
    let nodeFolders = [
      'strategy',
      'motivation',
      'business',
      'application',
      'technology',
      'implementation_migration',
      'other',
    ];

    nodeFolders.forEach(folder => {
      let nodeDirectory = path.join(this.modelPath, folder);

      if (fs.existsSync(nodeDirectory) && fs.lstatSync(nodeDirectory).isDirectory()) {
        fs.readdirSync(nodeDirectory).map(name => {
          const filePath = path.join(nodeDirectory, name);

          if (name.localeCompare('folder.xml') !== 0 && fs.lstatSync(filePath).isFile()) {
            let data = fs.readFileSync(filePath);

            let parser = new xml2js.Parser({ explicitArray: true });

            parser.parseString(data, function (err, nodeData) {
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
    let relationshipDirectory = path.join(this.modelPath, 'relations');

    if (fs.existsSync(relationshipDirectory) && fs.lstatSync(relationshipDirectory).isDirectory()) {
      fs.readdirSync(relationshipDirectory).map(name => {
        const filePath = path.join(relationshipDirectory, name);

        if (name.localeCompare('folder.xml') !== 0 && fs.lstatSync(filePath).isFile()) {
          let data = fs.readFileSync(filePath);

          let parser = new xml2js.Parser({ explicitArray: true });

          parser.parseString(data, function (err, relationshipData) {
            action(relationshipData);
          });
        }
      });
    }
  }

  /**
   * Loops through a list of diagram
   * @param action Action for each diagram in the list
   * @example
   * import { Grafico } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
   * const inputInterpreter = new Grafico("modelPath");
   *
   * inputInterpreter.forEachDiagram((view) => {});
   */
  forEachDiagram(action: (view: View) => void) {
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
   * inputInterpreter.forEachModelNode((node) => {
   *   const isViewObject = inputInterpreter.isViewObject(node);
   * });
   *
   */
  isViewObject(viewElement: ViewNode): boolean {
    return viewElement.$['xsi:type'].localeCompare('archimate:DiagramModelArchimateObject') === 0;
  }

  isViewNote(viewElement: ViewNode): boolean {
    return viewElement.$['xsi:type'].localeCompare('archimate:DiagramModelNote') === 0;
  }

  isViewGroup(viewElement: ViewNode): boolean {
    return viewElement.$['xsi:type'].localeCompare('archimate:DiagramModelGroup') === 0;
  }

  isJunctionNode(node: Node): boolean {
    return GraficoInterpreter._getFirstPropertyName(node).localeCompare('archimate:Junction') === 0;
  }

  hasViewElementWithChildRelationships(): boolean {
    return this.hasViewElementChildRelationships;
  }
}
