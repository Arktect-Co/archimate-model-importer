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

export class Model {
  public modelsourceid: string;
  public totalByType: TotalByType;
  public statistics: Statistics;
  public model: ModelStructure;

  constructor(public label: string, public description: string) {
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

  getViews(): Array<View> {
    return this.model.views;
  }

  getLandscapeStructure(): Array<Landscape> {
    return this.model.landscape;
  }

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

  static createBendpoint(x?: number, y?: number): BendPoint {
    return {
      x: x || 0,
      y: y || 0,
    };
  }

  static createNode({ identifier, name, type }: Node): Node {
    return {
      identifier,
      name,
      type,
    };
  }

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

  addFolder(parentFolder: Landscape | Array<Landscape>, folder: Landscape) {
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

  addView(viewid, viewname, bounds, viewNodes, viewRelationships): void {
    this.model.views.push({
      id: viewid,
      name: viewname,
      bounds: bounds,
      viewNodes: viewNodes,
      viewRelationships: viewRelationships,
    });

    this.statistics.totalViews++;
  }

  addFolderView(folder, viewid, viewname) {
    if (folder !== null && folder !== undefined) {
      folder.children.push({
        id: viewid,
        text: viewname,
        isDirectory: false,
      });
    }
  }
}
