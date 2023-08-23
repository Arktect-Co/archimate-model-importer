import { Model } from '@lib/models/Model';
import {
  Bounds,
  Landscape,
  Node,
  Property as NodeProperty,
  Relationship,
  ViewNode,
  ViewRelationship,
} from '@lib/common/interfaces/model';
import * as AoeffModel from '@lib/common/interfaces/aoeffModel';
import { Interpreter } from '@lib/common/interfaces/Interpreter';
import { RelationshipType } from '@lib/common/enums/relationshipType';
import { ViewType } from '@lib/common/enums/viewType';
import * as ArchiModel from '@lib/common/interfaces/archiModel';
import * as GraficoModel from '@lib/common/interfaces/graficoModel';
import getUniqueId from 'uniqid';

interface Option {
  skipViews: boolean;
}
type Log = (message?: string) => void;

type InterpreterNode = AoeffModel.ElementModel | ArchiModel.Element | GraficoModel.Node;
type InterpreterRelationship =
  | AoeffModel.RelationshipModel
  | ArchiModel.Element
  | GraficoModel.Relationship;
type InterpreterProperty = AoeffModel.Property | ArchiModel.Property | GraficoModel.Property;
type InterpreterView = AoeffModel.ViewModel | ArchiModel.View | GraficoModel.View;
type InterpreterFolder = AoeffModel.ItemModel | ArchiModel.Folder | string;
type InterpreterCandidateView = AoeffModel.CandidateView | ArchiModel.Folder | GraficoModel.View;
type InterpreterViewNode = AoeffModel.NodeModel | ArchiModel.ChildElement | GraficoModel.ViewNode;
type InterpreterViewRelationship =
  | AoeffModel.ConnectionModel
  | ArchiModel.Relationship
  | GraficoModel.ViewRelationship;
type InterpreterBendpoint =
  | AoeffModel.BendpointModel
  | ArchiModel.BendpointModel
  | GraficoModel.BendpointModel;

type InterpreterModel = Interpreter<
  unknown,
  InterpreterNode,
  InterpreterRelationship,
  InterpreterProperty,
  InterpreterView,
  InterpreterFolder,
  InterpreterCandidateView,
  InterpreterViewNode,
  InterpreterViewRelationship,
  InterpreterBendpoint
>;

export class InputTranslator {
  private readonly outputModel: Model;
  private nodesMap: Map<string, Node>;
  private relationshipsMap: Map<string, Relationship>;
  private inputInterpreter: InterpreterModel;
  private options: Option;
  private readonly log: Log;

  constructor(
    inputInterpreter: InterpreterModel,
    outputModel: Model,
    options: Option,
    logger: Log,
  ) {
    this.outputModel = outputModel ? outputModel : new Model();
    this.nodesMap = new Map();
    this.relationshipsMap = new Map();
    this.inputInterpreter = inputInterpreter;
    this.options = options;
    this.log = logger
      ? logger
      : () => {
          // Empty because there needs to be a function to run
        };
  }

  /**
   * Translates xml file in Model instance
   * @example
   * import { InputTranslator } from '@lib/processors/InputTranslator/InputTranslator';
   * import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
   * import { Model } from '@lib/models/Model';
   *
   * const model = {}; // AoeffModel | ArchiModel
   * const interpreter = new AoeffInterpreter(model); //AoeffInterpreter | ArchiInterpreter | GraficoInterpreter
   * const translator = new InputTranslator(interpreter, new Model(), {skipViews: false}, (message)=>{});
   *
   * translator.translate();
   */
  translate(): void {
    if (this.inputInterpreter.validate()) {
      const nodes: Array<Node> = [];
      const relationships: Array<Relationship> = [];

      this.log(`Starting model translation`);

      this.translateNodes(nodes);

      this.outputModel.setManyNodes(nodes);

      this.log(`${nodes.length} nodes translated`);

      this.translateRelationships(relationships);

      this.outputModel.setManyRelationships(relationships);

      this.log(`${relationships.length} relationships translated`);

      if (!this.options.skipViews) {
        const organizationFolders = this.inputInterpreter.getOrganizationFolders();
        const processViewDataEnable = this.inputInterpreter.isNestedDiagramStructure;

        if (!processViewDataEnable) {
          this.translateViews();

          this.log(`Sequential Views translated`);
        }

        organizationFolders.forEach(organizationFolder => {
          this.processFolder(
            organizationFolder,
            this.outputModel.model.landscape,
            processViewDataEnable,
          );

          this.log(`Folders and nested views translated`);
        });
      }
    } else {
      // Error - Isn't an Valid Archimate Model
      throw new Error('Model was not Validated');
    }
  }

  /**
   * Translates Nodes from xml model
   * @param processedNodesList Nodes list for result storage
   */
  private translateNodes(processedNodesList: Array<Node>): void {
    try {
      this.inputInterpreter.forEachModelNode(currentNode => {
        const nodeId: string = this.inputInterpreter.getNodeId(currentNode);
        let nodeType: string;
        let nodeName: string;
        let rawProperties;
        let nodeProperties: Array<NodeProperty>;
        let documentation: string | null;

        if (this.inputInterpreter.isJunctionNode(currentNode)) {
          nodeType = this.inputInterpreter.getNodeJunctionType(currentNode);
          nodeName = nodeId;
        } else {
          nodeType = this.inputInterpreter.getNodeType(currentNode);
          nodeName = this.inputInterpreter.getNodeName(currentNode);
          documentation = this.inputInterpreter.getNodeDocumentation(currentNode);
          rawProperties = this.inputInterpreter.getNodeProperties(currentNode);
          nodeProperties = [];

          if (rawProperties) {
            for (const rawProperty of rawProperties) {
              const property = this.inputInterpreter.getPropertyEntry(rawProperty);

              if (property.length === 2) {
                nodeProperties.push({ key: property[0], value: property[1] });
              }
            }
          }
        }

        const node = Model.createNonCategorizedNode({
          identifier: nodeId,
          name: nodeName,
          type: nodeType,
          properties: nodeProperties,
          documentation,
        });

        processedNodesList.push(node);
        this.nodesMap.set(nodeId, node);
      });
    } catch (e) {
      const { message } = e as Error;
      throw new Error(`Error while processing nodes: ${message}`);
    }
  }

  /**
   * Translates Relationships from xml model
   * @param relationships Relationships list for result storage
   */
  private translateRelationships(relationships: Array<Relationship>) {
    try {
      this.inputInterpreter.forEachModelRelationship(currentRelationship => {
        let isBidirectional: boolean | undefined;
        let sourceId: string = this.inputInterpreter.getRelationshipSourceId(currentRelationship);
        let targetId: string = this.inputInterpreter.getRelationshipTargetId(currentRelationship);

        if (this.inputInterpreter.isAssociationRelationship(currentRelationship)) {
          const isDirected =
            this.inputInterpreter.getAssociationRelationshipIsDirected(currentRelationship);

          if (!isDirected) {
            // This step is important to guarantee isBidirectional = undefined when isDirected = true
            isBidirectional = true;
          }
        } else if (this.inputInterpreter.isAccessRelationship(currentRelationship)) {
          const direction =
            this.inputInterpreter.getAccessRelationshipDirection(currentRelationship);

          isBidirectional =
            (direction.source && direction.target) || (!direction.source && !direction.target);

          if (!isBidirectional) {
            if (direction.source) {
              // Inverted direction
              const oldSourceId = sourceId;

              // Inverting direction
              sourceId = targetId;
              targetId = oldSourceId;
            }
          }
        }

        const relId = this.inputInterpreter.getRelationshipId(currentRelationship);
        const rel: Relationship = {
          identifier: relId,
          sourceId,
          targetId,
          type: this.inputInterpreter.getRelationshipType(currentRelationship),
          isBidirectional,
        };

        relationships.push(rel);
        this.relationshipsMap.set(relId, rel);
      });
    } catch (e) {
      const { message } = e as Error;
      throw new Error(`Error while translating relationships: ${message}`);
    }
  }

  /**
   * Process the organization of folder (nested way)
   * @param fileParentFolder - The parent folder this level of child folders - File context
   * @param modelParentFolder - The parent folder this level of child folders - Model context
   * @param processViewDataEnable - Boolean that enable or disable the processing of child views (name, bounds, viewNodes and viewRelationships)
   */
  private processFolder(
    fileParentFolder: InterpreterFolder,
    modelParentFolder: Array<Landscape> | Landscape,
    processViewDataEnable: boolean,
  ): void {
    try {
      const currentModelFolder: Landscape = this.outputModel.createFolder(
        getUniqueId(),
        this.inputInterpreter.getFolderName(fileParentFolder),
      );
      const folders = this.inputInterpreter.getSubFolders(fileParentFolder);
      const views = this.inputInterpreter.getFolderViews(fileParentFolder);

      // Processing child folders
      if (Array.isArray(folders)) {
        folders.forEach(folder => {
          this.processFolder(folder, currentModelFolder, processViewDataEnable);
        });
      }

      // Processing views
      if (Array.isArray(views)) {
        views.forEach(view => {
          this.processView(currentModelFolder, view, processViewDataEnable);
        });
      }

      this.outputModel.addFolder(modelParentFolder, currentModelFolder);
    } catch (e) {
      const { message } = e as Error;
      throw new Error(`Error while processing folder: ${message}`);
    }
  }

  /**
   * Translates views from xml model
   * @private
   */
  private translateViews(): void {
    this.inputInterpreter.forEachDiagram(currentDiagram => {
      this.processView(null, currentDiagram, true);
    });
  }

  /**
   * Process a view of a specific folder
   * @param {*} currentModelFolder - The folder of the iteration
   * @param {*} view - View of the current folder
   * @param {*} processViewDataEnable - Indicates if the processor must process a whole view data or just its reference in a folder
   */
  private processView(
    currentModelFolder: Landscape | null,
    view: InterpreterView | InterpreterCandidateView,
    processViewDataEnable: boolean,
  ): void {
    try {
      const nodes: Array<ViewNode> = [];
      const relationships: Array<ViewRelationship> = [];
      const bounds = Model.createViewBounds(1000000, -1000000, 1000000, -1000000);
      const viewId = this.inputInterpreter.getViewId(view);
      const viewName = this.inputInterpreter.getViewName(view);
      let viewElements = null;

      if (processViewDataEnable) {
        viewElements = this.inputInterpreter.getViewElements(<InterpreterView>view);

        this.processViewElements(view, nodes, relationships, viewElements, bounds, null, null);

        if (!this.inputInterpreter.hasViewElementChildRelationships) {
          // Then process relationships
          this.inputInterpreter.forEachViewRelationship(<InterpreterView>view, relationship => {
            const relationshipRef = this.inputInterpreter.getViewRelationshipModelId(relationship);

            this.processViewRelationship(
              relationshipRef,
              viewElements,
              relationships,
              relationship,
            );
          });
        }

        this.outputModel.addView({
          id: viewId,
          name: viewName,
          bounds,
          viewNodes: nodes,
          viewRelationships: relationships,
        });
      }

      this.outputModel.addFolderView(currentModelFolder, {
        id: viewId,
        text: viewName,
      });
    } catch (e) {
      const { message } = e as Error;
      throw new Error(`Error while processing view: ${message}`);
    }
  }

  /**
   * Process the optimal limits (square limits) that fits the Diagram
   * @param {*} bounds - Bounds struct to be updated
   * @param {*} x      - Position in X of the element
   * @param {*} y      - Position in Y of the element
   * @param {*} width  - Width of the element
   * @param {*} height - Height of the element
   */
  private static processBounds(
    bounds: Bounds,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    if (x < bounds.horizontal.min) {
      bounds.horizontal.min = x;
    }

    if (x + width > bounds.horizontal.max) {
      bounds.horizontal.max = x + width;
    }

    if (y < bounds.vertical.min) {
      bounds.vertical.min = y;
    }

    if (y + height > bounds.vertical.max) {
      bounds.vertical.max = y + height;
    }
  }

  /**
   * Process all elements and relationships of a specific view
   * @param {*} view - View being processed
   * @param {*} nodesResult - Nodes list for result storage
   * @param {*} relationshipsResult - Relationship list for result storage
   * @param {*} viewElements - View Elements to be processed (can be only nested view elements)
   * @param {*} bounds - Bounds of the view. Used to adjust the view position on rendering diagram
   * @param {*} parent - Parent element of this iteration (for nested elements)
   * @param {*} parentViewElements - View elements at upper level of Parent element
   */
  private processViewElements(
    view: InterpreterView | InterpreterCandidateView,
    nodesResult: Array<ViewNode>,
    relationshipsResult: Array<ViewRelationship>,
    viewElements: Array<InterpreterViewNode>,
    bounds: Bounds,
    parent: string | null,
    parentViewElements: Array<InterpreterViewNode> | null,
  ): void {
    if (Array.isArray(viewElements)) {
      viewElements.forEach(viewElement => {
        const viewNodeId = this.inputInterpreter.getViewElementViewId(viewElement);
        const positionX =
          this.inputInterpreter.getViewElementPositionX(viewElement, parent, parentViewElements) ||
          0;
        const positionY =
          this.inputInterpreter.getViewElementPositionY(viewElement, parent, parentViewElements) ||
          0;
        const width = this.inputInterpreter.getViewElementWidth(viewElement);
        const height = this.inputInterpreter.getViewElementHeight(viewElement);
        let elementName = '';
        let elementType;

        // Checking and setting bounds for elements
        InputTranslator.processBounds(bounds, positionX, positionY, width, height);

        let viewModelElement;

        if (this.inputInterpreter.isViewObject(viewElement)) {
          const modelElementId = this.inputInterpreter.getViewElementModelId(viewElement);

          // Finding element on nodes model list
          const el = this.nodesMap.get(modelElementId);

          if (el) {
            elementName = el.name;
            elementType = el.type.toLowerCase();
          } else {
            // Else it is a group
            elementType = ViewType.Group;
          }

          // Setting element view
          viewModelElement = Model.createViewElement({
            modelNodeId: modelElementId,
            viewNodeId,
            name: elementName,
            type: elementType,
            x: positionX,
            y: positionY,
            width,
            height,
            parent,
          });

          if (this.inputInterpreter.hasViewElementChildRelationships) {
            const sourceConnections =
              this.inputInterpreter.getViewElementSourceRelationships(viewElement);

            if (Array.isArray(sourceConnections)) {
              for (const viewRelationship of sourceConnections) {
                this.processViewRelationship(
                  modelElementId,
                  this.inputInterpreter.getViewElements(<InterpreterView>view),
                  relationshipsResult,
                  viewRelationship as unknown as InterpreterViewRelationship,
                );
              }
            }
          }
        } else {
          if (this.inputInterpreter.isViewNote(viewElement)) {
            elementName = this.inputInterpreter.getViewNoteContent(viewElement);
            elementType = ViewType.Note;
          } else {
            elementName = this.inputInterpreter.getViewGroupName(viewElement);
            elementType = ViewType.Group;
          }

          // Setting element view
          viewModelElement = Model.createViewDocumentationElement({
            viewNodeId,
            name: elementName,
            type: elementType,
            x: positionX,
            y: positionY,
            width,
            height,
            parent,
          });
        }

        nodesResult.push(viewModelElement);

        const nestedElements = this.inputInterpreter.getViewElementNestedElements(viewElement);

        if (Array.isArray(nestedElements) && nestedElements.length > 0) {
          this.processViewElements(
            view,
            nodesResult,
            relationshipsResult,
            nestedElements,
            bounds,
            viewNodeId,
            viewElements,
          );
        }
      });
    }
  }

  /**
   * Process a specific relationship view
   * @param {*} modelSourceNodeId - The id of the model element (source)
   * @param {*} viewNodes - The list of view nodes (elements) - no processed format
   * @param {*} relationshipsResult - Relationship list for result storage
   * @param {*} viewRelationship - Current view relationship
   */
  private processViewRelationship(
    modelSourceNodeId: string,
    viewNodes: Array<InterpreterViewNode>,
    relationshipsResult: Array<ViewRelationship>,
    viewRelationship: InterpreterViewRelationship,
  ): void {
    if (viewRelationship !== undefined) {
      const bendPoints = [];
      let viewModelRelationship;
      let relationshipBendpoints;
      let modelRelationshipId;
      let relationshipType = '';
      let isBidirectional;
      const sourceViewElementId =
        this.inputInterpreter.getViewRelationshipSourceElementId(viewRelationship);
      const targetViewElementId =
        this.inputInterpreter.getViewRelationshipTargetElementId(viewRelationship);
      const sourceElement = this.inputInterpreter.findViewElement(viewNodes, sourceViewElementId);
      const targetElement = this.inputInterpreter.findViewElement(viewNodes, targetViewElementId);

      if (sourceElement !== undefined && targetElement !== undefined) {
        // Verifying orphan relationship
        relationshipBendpoints =
          this.inputInterpreter.getViewRelationshipBendpoints(viewRelationship);
        modelRelationshipId = this.inputInterpreter.getViewRelationshipModelId(viewRelationship);

        if (Array.isArray(relationshipBendpoints)) {
          const len = relationshipBendpoints.length;

          for (let j = 0; j < len; j++) {
            const bendPoint = relationshipBendpoints[j];

            // TODO: Checking bounds limits for bend points

            const resultedBendPoint = this.inputInterpreter.getViewRelationshipBendpoint(
              bendPoint,
              j,
              len,
              sourceElement,
              targetElement,
              viewNodes,
            ) || {
              x: 0,
              y: 0,
            };

            bendPoints.push(Model.createBendpoint(resultedBendPoint.x, resultedBendPoint.y));
          }
        }

        // Finding relationship on relationships model list
        const rel = this.relationshipsMap.get(modelRelationshipId);

        if (rel) {
          // There is an associated model relationship
          relationshipType = rel.type.toLowerCase().replace('relationship', '');

          if (
            relationshipType === RelationshipType.Association ||
            relationshipType === RelationshipType.Access
          ) {
            isBidirectional = rel.isBidirectional;
          }
        } else {
          // There is no model relationship associated, so it's a connection (only exists in the view)
          relationshipType = RelationshipType.Connection;
        }

        viewModelRelationship = Model.createViewRelationship({
          modelRelationshipId,
          sourceId: sourceViewElementId,
          targetId: targetViewElementId,
          viewRelationshipId: this.inputInterpreter.getViewRelationshipId(viewRelationship),
          type: relationshipType,
          bendpoints: bendPoints,
          isBidirectional,
        });

        relationshipsResult.push(viewModelRelationship);
      }
    }
  }
}
