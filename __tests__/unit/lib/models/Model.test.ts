import { Model } from '@lib/models/Model';
import { expect, use } from 'chai';
import deepEqualInAnyOrder from 'deep-equal-in-any-order';
import { RelationshipType } from '@lib/common/enums/relationshipType';
import { Relationship } from '@lib/interfaces/model';

use(deepEqualInAnyOrder);

describe('Model', () => {
  let model = new Model('model 1', '');

  beforeEach(() => {
    model = new Model('model 1', '');
  });

  const nodes = [
    {
      identifier: 'f55b4503',
      name: 'Node 1',
      type: 'Resource',
    },
    {
      identifier: 'f55b4503',
      type: 'Capability',
      name: 'Node 2',
      properties: [{ key: 'key', value: 'value' }],
      documentation: 'documentation 1',
    },
  ];

  const relationships: Array<Relationship> = [
    {
      identifier: 'bc8c928b-dafb-4e61-91b3-7c3e5b93a900',
      sourceId: 'd0c22546-6ae6-4ba9-a141-222cc6eea16d',
      targetId: 'cc07d17e-8450-4adf-84d1-ea7d92ec01ab',
      type: RelationshipType.Aggregation,
    },
    {
      identifier: 'bc8c928b-dafb-4e61-91b3-7c3e5b93a955',
      sourceId: 'd0c22546-6ae6-4ba9-a141-222cc6eea20r',
      targetId: 'cc07d17e-8450-4adf-84d1-ea7d92ec01ff',
      type: RelationshipType.Aggregation,
      isBidirectional: true,
    },
  ];

  describe('createViewElement', () => {
    const elementSetting = {
      type: 'group',
      modelNodeId: '93d885b0',
      height: 100,
      width: 80,
      y: 30,
      x: 10,
      viewNodeId: 'ebc607cd',
    };
    it('should return a view element with the default name if the name is not defined', () => {
      const viewElement = Model.createViewElement(elementSetting);

      expect(viewElement).to.deep.equalInAnyOrder({
        name: 'Unknown Name',
        ...elementSetting,
        parent: undefined,
      });
    });

    it('should return a view element with parent', () => {
      const parent = '94d885b0';
      const viewElement = Model.createViewElement({ ...elementSetting, parent });

      expect(viewElement).to.deep.equalInAnyOrder({
        name: 'Unknown Name',
        ...elementSetting,
        parent,
      });
    });

    it('should return a view element', () => {
      const name = 'View Element 1';
      const viewElement = Model.createViewElement({ ...elementSetting, name });

      expect(viewElement).to.deep.equalInAnyOrder({
        name,
        ...elementSetting,
        parent: undefined,
      });
    });
  });

  describe('createViewDocumentationElement', () => {
    const documentationElementSetting = {
      viewNodeId: 'ebc607cd',
      type: 'note',
      x: 10,
      y: 10,
      width: 100,
      height: 80,
    };
    it('should return a view documentation element', () => {
      const name = 'View Documentation Element 1';
      const viewDocumentationElement = Model.createViewDocumentationElement({
        ...documentationElementSetting,
        name,
      });

      expect(viewDocumentationElement).to.deep.equalInAnyOrder({
        ...viewDocumentationElement,
        name,
        modelNodeId: null,
      });
    });

    it('should return a view documentation element with the default name if the name is not defined', () => {
      const viewDocumentationElement = Model.createViewDocumentationElement(
        documentationElementSetting,
      );

      expect(viewDocumentationElement).to.deep.equalInAnyOrder({
        ...viewDocumentationElement,
        name: ' ',
        modelNodeId: null,
      });
    });
  });

  describe('createViewRelationship', () => {
    const viewRelationshipSetting = {
      modelRelationshipId: 'f55b4505',
      sourceId: '81eb2518',
      targetId: '4440af36',
      viewRelationshipId: '9660a40c',
      type: RelationshipType.Association,
      bendpoints: [{ x: 1, y: 4 }],
      isBidirectional: false,
    };
    it('should return a view Relationship', () => {
      const viewRelationship = Model.createViewRelationship(viewRelationshipSetting);

      expect(viewRelationship).to.deep.equalInAnyOrder(viewRelationshipSetting);
    });
  });

  describe('createBendpoint', () => {
    it('should return a bendpoint', () => {
      const x = 10;
      const y = 20;
      const bendpoint = Model.createBendpoint(x, y);

      expect(bendpoint).to.deep.equalInAnyOrder({ x, y });
    });

    it('should return a default value of bendpoint if x and y are not defined', () => {
      const bendpoint = Model.createBendpoint(undefined, undefined);

      expect(bendpoint).to.deep.equalInAnyOrder({ x: 0, y: 0 });
    });
  });

  describe('createNode', () => {
    const nodeSetting = {
      identifier: 'f55b4503',
      name: 'Node 1',
    };

    it('should return a node', () => {
      const node = Model.createNode(nodeSetting);

      expect(node).to.deep.equalInAnyOrder({ ...nodeSetting, type: undefined });
    });
  });

  describe('createRelationship', () => {
    const relationshipSetting = {
      type: RelationshipType.Association,
      sourceId: '81eb2518',
      targetId: '4440af36',
    };

    it('should return a relationship', () => {
      const node = Model.createRelationship(relationshipSetting);

      expect(node).to.deep.equalInAnyOrder(relationshipSetting);
    });

    it('should return a relationship with the empty type if the type is not defined', () => {
      const node = Model.createRelationship({ ...relationshipSetting, type: undefined });

      expect(node).to.deep.equalInAnyOrder({ ...relationshipSetting, type: '' });
    });

    it('should return a relationship with the identifier if the identifier is defined', () => {
      const identifier = '4440af66';
      const node = Model.createRelationship({ ...relationshipSetting, identifier });

      expect(node).to.deep.equalInAnyOrder({ ...relationshipSetting, identifier });
    });

    it('should return a relationship with the value isBidirectional equal true', () => {
      const isBidirectional = true;
      const node = Model.createRelationship({ ...relationshipSetting, isBidirectional });

      expect(node).to.deep.equalInAnyOrder({ ...relationshipSetting, isBidirectional });
    });

    it('should return a relationship without the "isBidirectional" property if "isBidirectional" equals false', () => {
      const isBidirectional = false;
      const node = Model.createRelationship({ ...relationshipSetting, isBidirectional });

      expect(node).to.deep.equalInAnyOrder(relationshipSetting);
    });
  });

  describe('createNonCategorizedNode', () => {
    const nonCategorizedNodeSetting = {
      identifier: '40eb5bd6-4d7c-4c27-98a8-602f935ed405',
      name: 'Resource',
    };

    it('should return a non categorized node', () => {
      const nonCategorizedNode = Model.createNonCategorizedNode(nonCategorizedNodeSetting);

      expect(nonCategorizedNode).to.deep.equalInAnyOrder(nonCategorizedNode);
    });

    it('should return a non categorized node with default name if name is not defined', () => {
      const nonCategorizedNode = Model.createNonCategorizedNode({
        ...nonCategorizedNodeSetting,
        name: null,
      });

      expect(nonCategorizedNode).to.deep.equalInAnyOrder({
        identifier: nonCategorizedNode.identifier,
        name: 'Unknown Name',
        type: undefined,
      });
    });

    it('should return a non categorized node with properties if properties are defined', () => {
      const properties = [{ key: 'key', value: 'value' }];
      const nonCategorizedNode = Model.createNonCategorizedNode({
        ...nonCategorizedNodeSetting,
        properties,
      });

      expect(nonCategorizedNode).to.deep.equalInAnyOrder({
        ...nonCategorizedNodeSetting,
        type: undefined,
        properties,
      });
    });

    it('should return a non categorized node with documentation if documentation is defined', () => {
      const documentation = 'documentation';
      const nonCategorizedNode = Model.createNonCategorizedNode({
        ...nonCategorizedNodeSetting,
        documentation,
      });

      expect(nonCategorizedNode).to.deep.equalInAnyOrder({
        ...nonCategorizedNodeSetting,
        type: undefined,
        documentation,
      });
    });
  });

  describe('addFolder', () => {
    it('should add folder in root', () => {
      const parentFolder = [];
      const folder = {
        id: '1ckve6agsll74r3kj',
        text: 'Views',
        isDirectory: true,
        children: [
          {
            id: '1ckve6agsll74r3jk',
            text: 'Views',
            isDirectory: true,
          },
        ],
      };

      model.addFolder(parentFolder, folder);

      expect(parentFolder.length).to.equal(1);
      expect(parentFolder).to.deep.include(folder);
    });

    it('should add folder in directory', () => {
      const parentFolder = {
        id: '1ckve6axsll753nmy',
        text: 'Views',
        isDirectory: true,
        children: [],
      };
      const folder = {
        id: '1ckve6agsll74r3kj',
        text: 'Views',
        isDirectory: true,
        children: [
          {
            id: '1ckve6agsll74r3jk',
            text: 'Views',
            isDirectory: true,
          },
        ],
      };

      model.addFolder(parentFolder, folder);

      expect(parentFolder.children.length).to.equal(1);
      expect(parentFolder.children).to.deep.include(folder);
    });
  });

  describe('addFolderView', () => {
    it('should add folder view', () => {
      const folder = {
        id: '1ckve6axsll753nmy',
        text: 'Views',
        isDirectory: true,
        children: [],
      };
      const newFolderView = {
        id: '1ckve6axsll753der',
        text: 'Views',
      };
      model.addFolderView(folder, newFolderView);

      expect(folder.children[0]).to.deep.equalInAnyOrder({ ...newFolderView, isDirectory: false });
    });
  });

  describe('addView', () => {
    const view = {
      id: '57147c58-d2fc-463e-977b-b0812b23500a',
      name: 'Elements',
      bounds: {
        vertical: { min: 10, max: 10 },
        horizontal: { min: 20, max: 20 },
      },
      viewNodes: [
        {
          modelNodeId: '8ab8d668-3852-4bf8-a43e-2fcc89c01c79',
          viewNodeId: '96f41f9a-44fd-420b-8e81-e669a490fd2d',
          name: 'Location',
          type: 'location',
          x: 38,
          y: 25,
          width: 120,
          height: 55,
          parent: null,
        },
      ],
      viewRelationships: [
        {
          modelRelationshipId: 'c8eacb29-df66-4c8a-98bf-159b8e894b94',
          sourceId: '0d48039d-ed53-4e60-8045-1af4f1e5db6f',
          targetId: '1620e51a-453c-411e-8c1c-8bf9d7545c93',
          viewRelationshipId: 'b370c707-37eb-4f93-b6f4-c54867832ec7',
          type: 'assignment',
          bendpoints: [{ x: 2, y: 2 }],
        },
      ],
    };

    it('should add a View in model views', () => {
      model.addView(view);

      expect(model.statistics.totalViews).to.equal(1);
      expect(model.model.views[0]).to.deep.equalInAnyOrder(view);
    });
  });

  describe('setManyNodes', () => {
    it('should set many nodes', () => {
      model.setManyNodes(nodes);

      expect(model.totalByType['nodeTypes']).to.deep.equalInAnyOrder({
        resource: 1,
        capability: 1,
      });
      expect(model.statistics.totalNodes).to.equal(2);
      expect(model.model.nodes).to.deep.equalInAnyOrder({
        resource: [
          {
            identifier: 'f55b4503',
            name: 'Node 1',
          },
        ],
        capability: [
          {
            identifier: 'f55b4503',
            name: 'Node 2',
            properties: [{ key: 'key', value: 'value' }],
            documentation: 'documentation 1',
          },
        ],
      });
    });
  });

  describe('setManyRelationships', () => {
    it('should set many relationships', () => {
      model.setManyRelationships(relationships);

      expect(model.statistics.totalRelationships).to.equal(2);
      expect(model.totalByType['relationshipTypes']).to.deep.equalInAnyOrder({
        [RelationshipType.Aggregation]: 2,
      });
      expect(model.model.relationships).to.deep.equalInAnyOrder({
        [RelationshipType.Aggregation]: [
          {
            identifier: 'bc8c928b-dafb-4e61-91b3-7c3e5b93a900',
            sourceId: 'd0c22546-6ae6-4ba9-a141-222cc6eea16d',
            targetId: 'cc07d17e-8450-4adf-84d1-ea7d92ec01ab',
          },
          {
            identifier: 'bc8c928b-dafb-4e61-91b3-7c3e5b93a955',
            sourceId: 'd0c22546-6ae6-4ba9-a141-222cc6eea20r',
            targetId: 'cc07d17e-8450-4adf-84d1-ea7d92ec01ff',
            isBidirectional: true,
          },
        ],
      });
    });
  });
  describe('getNodes', () => {
    it('should get all nodes in model', () => {
      model.setManyNodes(nodes);
      const [firstNode, secondNode] = model.getNodes();

      expect(firstNode).to.deep.equalInAnyOrder({
        identifier: 'f55b4503',
        name: 'Node 1',
        type: 'resource',
      });
      expect(secondNode).to.deep.equalInAnyOrder({
        identifier: 'f55b4503',
        name: 'Node 2',
        properties: [{ key: 'key', value: 'value' }],
        documentation: 'documentation 1',
        type: 'capability',
      });
    });
  });

  describe('getRelationships', () => {
    it('should get all relationships from model', () => {
      model.setManyRelationships(relationships);
      const [firstRelationship, secondRelationship] = model.getRelationships();

      expect(firstRelationship).to.deep.equalInAnyOrder({
        identifier: 'bc8c928b-dafb-4e61-91b3-7c3e5b93a900',
        sourceId: 'd0c22546-6ae6-4ba9-a141-222cc6eea16d',
        targetId: 'cc07d17e-8450-4adf-84d1-ea7d92ec01ab',
        type: RelationshipType.Aggregation,
      });
      expect(secondRelationship).to.deep.equalInAnyOrder({
        identifier: 'bc8c928b-dafb-4e61-91b3-7c3e5b93a955',
        sourceId: 'd0c22546-6ae6-4ba9-a141-222cc6eea20r',
        targetId: 'cc07d17e-8450-4adf-84d1-ea7d92ec01ff',
        isBidirectional: true,
        type: RelationshipType.Aggregation,
      });
    });
  });
});
