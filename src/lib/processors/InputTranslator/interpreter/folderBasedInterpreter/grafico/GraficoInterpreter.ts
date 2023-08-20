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

  getViewElements(view: View): Array<ViewNode> {
    return view[GraficoInterpreter._getFirstPropertyName(view)].children;
  }

  getViewId(view: View): string {
    return view[GraficoInterpreter._getFirstPropertyName(view)].$.id;
  }

  getViewName(view: View): string {
    return view[GraficoInterpreter._getFirstPropertyName(view)].$.name || UNKNOWN;
  }

  getViewElementViewId(viewElement: ViewNode): string {
    return viewElement.$.id;
  }

  getViewElementModelId(viewElement: ViewNode): string {
    return viewElement.archimateElement[0].$.href.replace(/.*#(.*)/g, '$1');
  }

  getViewElementPositionX(
    viewElement: ViewNode,
    parentId?: string,
    parentViewElements?: Array<ViewNode>,
  ): number {
    return parseInt(viewElement.bounds[0].$.x, 0);
  }

  getViewElementPositionY(
    viewElement: ViewNode,
    parentId?: string,
    parentViewElements?: Array<ViewNode>,
  ): number {
    return parseInt(viewElement.bounds[0].$.y, 0);
  }

  getViewElementWidth(viewElement: ViewNode): number {
    return parseInt(viewElement.bounds[0].$.width, 0);
  }

  getViewElementHeight(viewElement: ViewNode): number {
    return parseInt(viewElement.bounds[0].$.height, 0);
  }

  getViewElementSourceRelationships(viewElement: ViewNode): Array<ViewRelationship> {
    return viewElement.sourceConnections;
  }

  getViewElementNestedElements(viewElement: ViewNode): Array<ViewNode> {
    return viewElement.children || [];
  }

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

  getViewGroupName(viewElement: ViewNode): string {
    if (viewElement.$.name !== undefined) {
      return viewElement.$.name;
    }

    return UNKNOWN;
  }

  getViewRelationshipBendpoints(viewRelationship: ViewRelationship): Array<BendpointModel> {
    return viewRelationship.bendpoints;
  }

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

  getViewRelationshipModelId(viewRelationship: ViewRelationship): string | null {
    return viewRelationship.archimateRelationship
      ? viewRelationship.archimateRelationship[0].$.href.replace(/.*#(.*)/g, '$1')
      : null;
  }

  getViewRelationshipId(viewRelationship: ViewRelationship): string {
    return viewRelationship.$.id;
  }

  getViewRelationshipSourceElementId(viewRelationship: ViewRelationship): string {
    return viewRelationship.$.source;
  }

  getViewRelationshipTargetElementId(viewRelationship: ViewRelationship): string {
    return viewRelationship.$.target;
  }

  getOrganizationFolders(): Array<string> {
    return [path.join(this.modelPath, 'diagrams')];
  }

  validate(): boolean {
    return (
      fs.existsSync(path.join(this.modelPath, 'diagrams')) &&
      fs.existsSync(path.join(this.modelPath, 'relations')) &&
      fs.existsSync(path.join(this.modelPath, 'folder.xml'))
    );
  }

  forEachViewRelationship(view: View, action: (view: ViewRelationship) => void): void {}

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

  forEachDiagram(action: (view: View) => void) {
    return null;
  }

  isAccessRelationship(relationship: Relationship): boolean {
    return (
      GraficoInterpreter._getFirstPropertyName(relationship).localeCompare(
        'archimate:AccessRelationship',
      ) === 0
    );
  }

  isAssociationRelationship(relationship: Relationship): boolean {
    return (
      GraficoInterpreter._getFirstPropertyName(relationship).localeCompare(
        'archimate:AssociationRelationship',
      ) === 0
    );
  }

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
