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
} from '@lib/common/interfaces/model';
import { Optional } from '@lib/common/utils/typeUtils';

type ElementSetting = Optional<ViewNode, 'name'>;
type DocumentationElementSetting = Optional<Omit<ViewNode, 'modelNodeId'>, 'name'>;
type FolderView = Omit<Landscape, 'children' | 'isDirectory'>;

export class Model {
  public modelsourceid: string;
  public totalByType: TotalByType;
  public statistics: Statistics;
  public model: ModelStructure;

  /**
   * @param [label = 'Archimate Model'] Model name
   * @param [description = ""] Model description
   */
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
      if (Object.prototype.hasOwnProperty.call(this.model.nodes, nodeType)) {
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
      if (Object.prototype.hasOwnProperty.call(this.model.relationships, relType)) {
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
    const relationship: Relationship = {
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

  /**
   * Creates a non categorized node
   * @param nodeSettings Node settings
   * @param nodeSettings.identifier Node identifier
   * @param nodeSettings.name Node name
   * @param nodeSettings.type Node type
   * @param nodeSettings.properties Node properties
   * @param nodeSettings.documentation Node documentation
   * @return Non categorized Node
   * @example
   * import { Model } from '@lib/models/Model';
   * const nonCategorizedNodeSetting = {
   *       identifier: '40eb5bd6-4d7c-4c27-98a8-602f935ed405',
   *       name: 'Resource',
   *     };
   *
   * const node = Model.createNonCategorizedNode(nonCategorizedNodeSetting);
   */
  static createNonCategorizedNode({
    identifier,
    name,
    type,
    properties,
    documentation,
  }: Node): Node {
    const nodeName = name !== null ? name : 'Unknown Name';
    const nodeObj: Node = { identifier, name: nodeName, type };

    if (properties) {
      nodeObj.properties = properties;
    }

    if (documentation) {
      nodeObj.documentation = documentation;
    }

    return nodeObj;
  }

  /**
   * Sets too many nodes in the node model
   * @param nodeList List of nodes
   * @example
   * import { Model } from '@lib/models/Model';
   * const nodes = [
   *     {
   *       identifier: 'f55b4503',
   *       name: 'Node 1',
   *       type: 'Resource',
   *     },
   *     {
   *       identifier: 'f55b4503',
   *       type: 'Capability',
   *       name: 'Node 2',
   *       properties: [{ key: 'key', value: 'value' }],
   *       documentation: 'documentation 1',
   *     },
   *   ];
   *
   *  const model = new Model('model 1', '');
   *  model.setManyNodes(nodes);
   */
  setManyNodes(nodeList: Array<Node>): void {
    const categorizedNodes: Nodes = {};
    let totalNodes = 0;

    nodeList.forEach(node => {
      if (node.type && node.identifier) {
        const type = node.type.toLowerCase();
        const name = node.name || 'Unknown Name';
        const properties = node.properties;
        const documentation = node.documentation;

        if (categorizedNodes[type] === undefined) {
          // it's the first element of type
          categorizedNodes[type] = [];
        }

        const nodeObj: Node = { identifier: node.identifier, name };

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

    for (const nodeType in categorizedNodes) {
      if (Object.prototype.hasOwnProperty.call(categorizedNodes, nodeType)) {
        this.totalByType['nodeTypes'][nodeType] = categorizedNodes[nodeType].length;
      }
    }

    this.statistics.totalNodes = totalNodes;
    this.model.nodes = categorizedNodes;
  }

  /**
   * Sets too many relationships in the relationships model
   * @param relationshipList List of relationships
   * @example
   * import { Model } from '@lib/models/Model';
   * const relationships = [
   *     {
   *       identifier: 'bc8c928b-dafb-4e61-91b3-7c3e5b93a900',
   *       sourceId: 'd0c22546-6ae6-4ba9-a141-222cc6eea16d',
   *       targetId: 'cc07d17e-8450-4adf-84d1-ea7d92ec01ab',
   *       type: RelationshipType.Aggregation,
   *     },
   *     {
   *       identifier: 'bc8c928b-dafb-4e61-91b3-7c3e5b93a955',
   *       sourceId: 'd0c22546-6ae6-4ba9-a141-222cc6eea20r',
   *       targetId: 'cc07d17e-8450-4adf-84d1-ea7d92ec01ff',
   *       type: RelationshipType.Aggregation,
   *       isBidirectional: true,
   *     },
   *   ];
   *
   *  const model = new Model('model 1', '');
   *  model.setManyRelationships(relationships);
   */
  setManyRelationships(relationshipList: Array<Relationship>): void {
    const categorizedRelationships: Relationships = {};
    let totalRelationships = 0;

    relationshipList.forEach(rel => {
      if (rel.type && rel.sourceId && rel.targetId) {
        const type = rel.type.toLowerCase();

        if (categorizedRelationships[type] === undefined) {
          // it's the first element of type
          categorizedRelationships[type] = [];
        }

        const relationship: Relationship = {
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

    for (const relType in categorizedRelationships) {
      if (Object.prototype.hasOwnProperty.call(categorizedRelationships, relType)) {
        const sumarizedType = relType.replace('relationship', '');

        this.totalByType['relationshipTypes'][sumarizedType] =
          categorizedRelationships[relType].length;
      }
    }

    this.statistics.totalRelationships = totalRelationships;
    this.model.relationships = categorizedRelationships;
  }

  /**
   * Creates a folder
   * @param folderid Folder identification
   * @param foldername Folder name
   * @return Folder
   * @example
   * import { Model } from '@lib/models/Model';
   * const model = new Model('model 1', '');
   *
   * const folder = model.createFolder('cc07d17e-8450-4adf-84d1-ea7d92ec01ff', 'Folder 1');
   */
  createFolder(folderid: string, foldername: string): Landscape {
    return {
      id: folderid,
      text: foldername,
      isDirectory: true,
      children: [],
    };
  }

  /**
   * Add Folder in Parent Folder
   * @param parentFolder Parent folder
   * @param folder Folder
   * @example
   * import { Model } from '@lib/models/Model';
   * const model = new Model('model 1', '');
   *
   * const parentFolder = [];
   * const folder = {
   *   id: '1ckve6agsll74r3kj',
   *   text: 'Views',
   *   isDirectory: true,
   *   children: []
   * };
   *
   * model.addFolder(parentFolder, folder);
   */
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

  /**
   * Add view to view model
   * @param viewSettings View Settings
   * @param viewSettings.id View identification
   * @param viewSettings.name View name
   * @param viewSettings.bounds View bounds
   * @param viewSettings.viewNodes View nodes
   * @param viewSettings.viewRelationships View Relationships
   * @example
   * import { Model } from '@lib/models/Model';
   * const model = new Model('model 1', '');
   *
   * const view = {
   *     id: '57147c58-d2fc-463e-977b-b0812b23500a',
   *     name: 'Elements',
   *     bounds: {
   *       vertical: { min: 10, max: 10 },
   *       horizontal: { min: 20, max: 20 },
   *     },
   *     viewNodes: [
   *       {
   *         modelNodeId: '8ab8d668-3852-4bf8-a43e-2fcc89c01c79',
   *         viewNodeId: '96f41f9a-44fd-420b-8e81-e669a490fd2d',
   *         name: 'Location',
   *         type: 'location',
   *         x: 38,
   *         y: 25,
   *         width: 120,
   *         height: 55,
   *         parent: null,
   *       },
   *     ],
   *     viewRelationships: [
   *       {
   *         modelRelationshipId: 'c8eacb29-df66-4c8a-98bf-159b8e894b94',
   *         sourceId: '0d48039d-ed53-4e60-8045-1af4f1e5db6f',
   *         targetId: '1620e51a-453c-411e-8c1c-8bf9d7545c93',
   *         viewRelationshipId: 'b370c707-37eb-4f93-b6f4-c54867832ec7',
   *         type: 'assignment',
   *         bendpoints: [{ x: 2, y: 2 }],
   *       },
   *     ],
   *   };
   *
   * model.addView(view);
   */
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

  /**
   * Add new folder view
   * @param folder Folder
   * @param folderView Folder view
   * @param folderView.id Folder view identification
   * @param folderView.text Folder view text
   * @example
   * import { Model } from '@lib/models/Model';
   * const model = new Model('model 1', '');
   *
   * const folder = {
   *   id: '1ckve6axsll753nmy',
   *   text: 'Views',
   *   isDirectory: true,
   *   children: [],
   * };
   * const newFolderView = {
   *   id: '1ckve6axsll753der',
   *   text: 'Views',
   * };
   *
   * model.addFolderView(folder, newFolderView);
   */
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
