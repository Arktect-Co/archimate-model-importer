import { Model } from '@lib/models/Model';
import { expect, use } from 'chai';
import deepEqualInAnyOrder from 'deep-equal-in-any-order';
import { RelationshipType } from '@lib/common/enums/relationshipType';

use(deepEqualInAnyOrder);

describe('Model', () => {
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
  });
});
