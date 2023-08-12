import {
  Node,
  Nodes,
  View,
  BendPoint,
  Model as ModelStructure,
  ViewNode,
  Relationships,
  Relationship,
  ViewRelationship,
  Landscape,
  Bounds,
  Statistics,
  TotalByType,
} from '@lib/interfaces/model';
import { Optional } from '@lib/common/utils/typeUtils';

type ElementSetting = Optional<ViewNode, 'name'>;
type DocumentationElementSetting = Optional<Omit<ViewNode, 'modelNodeId'>, 'name'>;
type FolderView = Omit<Landscape, 'children' | 'isDirectory'>;

export class Model {
  public modelsourceid: string;
  public totalByType: TotalByType;
  public statistics: Statistics;
  public model: ModelStructure;

  constructor(public label: string = 'Archimate Model', public description: string = '') {
    this.model = {
      nodes: {},
      relationships: {},
      views: [],
      landscape: [],
    };
    this.totalByType = {
      nodeTypes: {},
      relationshipTypes: {},
    };
    this.statistics = {
      totalNodes: 0,
      totalRelationships: 0,
      totalViews: 0,
    };
  }

  /**
   * Returns all nodes from model
   * @return Node list
   * @example
   * import { Model } from '@lib/models/Model';

   * const model = new Model('model 1', '');
   * const nodes = model.getNodes();
   */
  getNodes(): Array<Node> {
    const nodes: Array<Node> = [];

    for (const nodeType in this.model.nodes) {
      if (this.model.nodes.hasOwnProperty(nodeType)) {
        const nodeTypeSet = this.model.nodes[nodeType];

        for (let i = 0; i < nodeTypeSet.length; i++) {
          const node = nodeTypeSet[i];

          nodes.push({ ...node, type: nodeType });
        }
      }
    }

    return nodes;
  }

  /**
   * Returns all relationships from model
   * @return Relationships list
   * @example
   * import { Model } from '@lib/models/Model';

   * const model = new Model('model 1', '');
   * const relationships = model.getRelationships();
   */
  getRelationships(): Array<Relationship> {
    const relationships: Array<Relationship> = [];

    for (const relType in this.model.relationships) {
      if (this.model.relationships.hasOwnProperty(relType)) {
        const relTypeSet = this.model.relationships[relType];

        for (let i = 0; i < relTypeSet.length; i++) {
          const relationship = relTypeSet[i];

          relationships.push({ ...relationship, type: relType });
        }
      }
    }

    return relationships;
  }

  /**
   * Returns views from model
   * @return Views list
   * @example
   * import { Model } from '@lib/models/Model';

   * const model = new Model('model 1', '');
   * const views = model.getViews();
   */
  getViews(): Array<View> {
    return this.model.views;
  }

  /**
   * Returns landscapes structure from model
   * @return Landscape list
   * @example
   * import { Model } from '@lib/models/Model';

   * const model = new Model('model 1', '');
   * const landscapes = model.getLandscapeStructure();
   */
  getLandscapeStructure(): Array<Landscape> {
    return this.model.landscape;
  }

  /**
   * Creates a view bounds
   * @param minVert Minimum bound of the vertical plane
   * @param maxVert Max bound of the vertical plane
   * @param minHor Minimum bound of the horizontal plane
   * @param maxHor Max bound of the horizontal plane
   * @return Bounds
   * @example
   * import { Model } from '@lib/models/Model';
   *
   * const bounds = Model.createViewBounds(1000, 2000, 2000, 3000);
   */
  static createViewBounds(
    minVert: number,
    maxVert: number,
    minHor: number,
    maxHor: number,
  ): Bounds {
    return {
      vertical: {
        min: minVert,
        max: maxVert,
      },
      horizontal: {
        min: minHor,
        max: maxHor,
      },
    };
  }

  /**
   * Creates a view Element
   * @param elementSetting Element Settings
   * @param elementSetting.modelNodeId Model node identification
   * @param elementSetting.viewNodeId View node identification
   * @param elementSetting.name Element name
   * @param elementSetting.type Element type
   * @param elementSetting.y Position in y of the element
   * @param elementSetting.x Position in X of the element
   * @param elementSetting.parent Parent of element
   * @param elementSetting.width Element width
   * @param elementSetting.height Element height
   * @return View Element
   * @example
   * import { Model } from '@lib/models/Model';
   *  const elementSetting = {
   *       type: 'group',
   *       modelNodeId: '93d885b0',
   *       height: 100,
   *       width: 80,
   *       y: 30,
   *       x: 10,
   *       viewNodeId: 'ebc607cd',
   *     };
   * const view = Model.createViewElement(elementSetting);
   */
  static createViewElement({
    modelNodeId,
    viewNodeId,
    name,
    type,
    y,
    x,
    parent,
    width,
    height,
  }: ElementSetting): ViewNode {
    let elementName = 'Unknown Name';

    if (name !== undefined && name !== null && name !== '') {
      elementName = name;
    }

    return {
      modelNodeId,
      viewNodeId,
      name: elementName,
      type,
      x,
      y,
      width,
      height,
      parent,
    };
  }

  /**
   * Creates a view documentation element
   * @param elementSetting documentation element settings
   * @param elementSetting.viewNodeId View node identification
   * @param elementSetting.name Element name
   * @param elementSetting.type Element type
   * @param elementSetting.y Position in y of the element
   * @param elementSetting.x Position in X of the element
   * @param elementSetting.parent Parent of element
   * @param elementSetting.width Element width
   * @param elementSetting.height Element height
   * @return View Documentation Element
   * @example
   * import { Model } from '@lib/models/Model';
   *  const documentationElementSetting = {
   *       viewNodeId: 'ebc607cd',
   *       type: 'note',
   *       x: 10,
   *       y: 10,
   *       width: 100,
   *       height: 80,
   *     };
   * const view = Model.createViewDocumentationElement(documentationElementSetting);
   */
  static createViewDocumentationElement({
    viewNodeId,
    name,
    type,
    x,
    y,
    width,
    height,
    parent,
  }: DocumentationElementSetting): ViewNode {
    let elementName = ' ';

    if (name !== undefined && name !== null) {
      elementName = name;
    }

    return {
      modelNodeId: null,
      viewNodeId,
      name: elementName,
      type,
      x,
      y,
      width,
      height,
      parent,
    };
  }

  /**
   * Creates a view Relationship
   * @param viewRelationshipSettings  Relationship view settings
   * @param viewRelationshipSettings.modelRelationshipId Model relationship identification
   * @param viewRelationshipSettings.sourceId Relationship source identification
   * @param viewRelationshipSettings.targetId Relationship target identification
   * @param viewRelationshipSettings.viewRelationshipId Relationship view identification
   * @param viewRelationshipSettings.type Relationship type
   * @param viewRelationshipSettings.bendpoints Relationship bendpoints
   * @param viewRelationshipSettings.isBidirectional Indicates whether the relationship is bidirectional or not
   * @return View Relationship
   * @example
   *  import { Model } from '@lib/models/Model';
   *
   *  const viewRelationship = {
   *       modelRelationshipId: 'f55b4505',
   *       sourceId: '81eb2518',
   *       targetId: '4440af36',
   *       viewRelationshipId: '9660a40c',
   *       type: 'association',
   *       bendpoints: [{ x: 1, y: 4 }],
   *       isBidirectional: false,
   *     };
   *
   *  const view = Model.createViewRelationship(viewRelationship);
   */
  static createViewRelationship({
    modelRelationshipId,
    sourceId,
    targetId,
    viewRelationshipId,
    type,
    bendpoints,
    isBidirectional,
  }: ViewRelationship): ViewRelationship {
    return {
      modelRelationshipId,
      sourceId,
      targetId,
      viewRelationshipId,
      type,
      bendpoints,
      isBidirectional,
    };
  }

  /**
   * Creates a Bend Point
   * @param x x-axis bending point
   * @param y y-axis bending point
   * @return Bend Point
   * @example
   *  import { Model } from '@lib/models/Model';
   *
   *  const benPoint = Model.createBendpoint(10, 20);
   */
  static createBendpoint(x?: number, y?: number): BendPoint {
    return {
      x: x || 0,
      y: y || 0,
    };
  }

  /**
   * Creates a Node
   * @param nodeSettings Node settings
   * @param nodeSettings.identifier Node identifier
   * @param nodeSettings.name Node name
   * @param nodeSettings.type Node type
   * @return Node
   * @example
   *  import { Model } from '@lib/models/Model';
   *
   *  const nodeSetting = {
   *       identifier: 'f55b4503',
   *       name: 'Node 1',
   *     };
   *  const node = Model.createNode(nodeSetting);
   */
  static createNode({ identifier, name, type }: Node): Node {
    return {
      identifier,
      name,
      type,
    };
  }

  /**
   * Creates a Relationship
   * @param relationshipSettings Relationship settings
   * @param relationshipSettings.type Relationship type
   * @param relationshipSettings.sourceId Relationship source identification
   * @param relationshipSettings.targetId Relationship target identification
   * @param relationshipSettings.isBidirectional Indicates whether the relationship is bidirectional or not
   * @param relationshipSettings.identifier Relationship identifier
   * @return Relationship
   * @example
   *  import { Model } from '@lib/models/Model';
   *
   * const relationshipSetting = {
   *       type: RelationshipType.Association,
   *       sourceId: '81eb2518',
   *       targetId: '4440af36',
   *     };
   *  const relationship = Model.createRelationship(relationshipSetting);;
   */
  static createRelationship({
    type,
    sourceId,
    targetId,
    isBidirectional,
    identifier,
  }: Relationship): Relationship {
    let relationship: Relationship = {
      sourceId,
      targetId,
      type: type ? type.toLowerCase() : '',
    };

    if (identifier) {
      relationship.identifier = identifier;
    }

    if (isBidirectional) {
      relationship.isBidirectional = isBidirectional;
    }

    return relationship;
  }

  /**
   * Set a model identification
   * @param id identification
   * @example
   * import { Model } from '@lib/models/Model';
   *
   * const model = new Model('model 1', '');
   * model.setModelId("57147c58-d2fc-463e-977b-b0812b23500a");
   */
  setModelId(id: string): void {
    this.modelsourceid = id;
  }

  static createNonCategorizedNode({
    identifier,
    name,
    type,
    properties,
    documentation,
  }: Node): Node {
    let nodeName = name !== null ? name : 'Unknown Name';
    let nodeObj: Node = { identifier, name: nodeName, type };

    if (properties) {
      nodeObj.properties = properties;
    }

    if (documentation) {
      nodeObj.documentation = documentation;
    }

    return nodeObj;
  }

  setManyNodes(nodeList: Array<Node>): void {
    let categorizedNodes: Nodes = {};
    let totalNodes = 0;

    nodeList.forEach(node => {
      if (node.type && node.identifier) {
        let type = node.type.toLowerCase();
        let name = node.name || 'Unknown Name';
        let properties = node.properties;
        let documentation = node.documentation;

        if (categorizedNodes[type] === undefined) {
          // it's the first element of type
          categorizedNodes[type] = [];
        }

        let nodeObj: Node = { identifier: node.identifier, name };

        if (properties) {
          nodeObj.properties = properties;
        }

        if (documentation) {
          nodeObj.documentation = documentation;
        }

        categorizedNodes[type].push(nodeObj);

        totalNodes++;
      }
    });

    for (let nodeType in categorizedNodes) {
      if (categorizedNodes.hasOwnProperty(nodeType)) {
        this.totalByType['nodeTypes'][nodeType] = categorizedNodes[nodeType].length;
      }
    }

    this.statistics.totalNodes = totalNodes;
    this.model.nodes = categorizedNodes;
  }

  setManyRelationships(relationshipList: Array<Relationship>): void {
    let categorizedRelationships: Relationships = {};
    let totalRelationships = 0;

    relationshipList.forEach(rel => {
      if (rel.type && rel.sourceId && rel.targetId) {
        let type = rel.type.toLowerCase();

        if (categorizedRelationships[type] === undefined) {
          // it's the first element of type
          categorizedRelationships[type] = [];
        }

        let relationship: Relationship = {
          identifier: rel.identifier,
          sourceId: rel.sourceId,
          targetId: rel.targetId,
        };

        if (rel.isBidirectional) {
          relationship.isBidirectional = rel.isBidirectional;
        }

        categorizedRelationships[type].push(relationship);

        totalRelationships++;
      }
    });

    for (let relType in categorizedRelationships) {
      if (categorizedRelationships.hasOwnProperty(relType)) {
        const sumarizedType = relType.replace('relationship', '');

        this.totalByType['relationshipTypes'][sumarizedType] =
          categorizedRelationships[relType].length;
      }
    }

    this.statistics.totalRelationships = totalRelationships;
    this.model.relationships = categorizedRelationships;
  }

  createFolder(folderid: string, foldername: string): Landscape {
    return {
      id: folderid,
      text: foldername,
      isDirectory: true,
      children: [],
    };
  }

  addFolder(parentFolder: Landscape | Array<Landscape>, folder: Landscape): void {
    if (!('children' in parentFolder) && Array.isArray(parentFolder)) {
      // Is the first level (root) of the landscape
      parentFolder.push(folder); // Model landscape it's a simple array
    } else {
      // It's a folder
      if (parentFolder.isDirectory === true) {
        parentFolder.children.push(folder);
      }
    }
  }

  addView({ id, name, bounds, viewNodes, viewRelationships }: View): void {
    this.model.views.push({
      id,
      name,
      bounds,
      viewNodes,
      viewRelationships,
    });

    this.statistics.totalViews++;
  }

  addFolderView(folder: Landscape, { id, text }: FolderView): void {
    if (folder !== null && folder !== undefined) {
      folder.children.push({
        id,
        text,
        isDirectory: false,
      });
    }
  }
}
