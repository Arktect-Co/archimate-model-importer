import path from 'path';
import { Archi4Interpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/archi/Archi4Interpreter';
import { ArchiModel } from '@lib/common/interfaces/archiModel';
import { expect } from 'chai';
import { before } from 'mocha';
import { ElementType } from '@lib/common/enums/elementType';
import { getXmlModel } from '../../../../../utils/getXmlModel';
import { FolderType } from '@lib/common/enums/folderType';

const UNKNOWN = 'Unknown Name';

describe('ArchiInterpreter', () => {
  let inputInterpreter: Archi4Interpreter;
  let model: ArchiModel;

  before(async () => {
    const rootPath = __dirname.split('\\').slice(0, -5).join('\\');
    const filePath = path.join(rootPath, '/models/migration_guide_3_1.archimate');
    model = await getXmlModel<ArchiModel>(filePath);
    inputInterpreter = new Archi4Interpreter(model);
  });

  describe('getModelId', () => {
    it('should return a model Id', () => {
      const id = inputInterpreter.getModelId();

      expect(id).to.equal('799298e6-cefa-47aa-986f-1ab9d5c10d21');
    });
  });

  describe('getNodeId', () => {
    it('should return a node id', () => {
      const node = model['archimate:model'].folder[0].element[0];
      const id = inputInterpreter.getNodeId(node);

      expect(id).to.equal('40eb5bd6-4d7c-4c27-98a8-602f935ed405');
    });
  });

  describe('getNodeName', () => {
    it('should return a node name', () => {
      const node = model['archimate:model'].folder[0].element[0];
      const name = inputInterpreter.getNodeName(node);

      expect(name).to.equal('Resource');
    });

    it('should return a default node name if the node name is not defined', () => {
      const node = { ...model['archimate:model'].folder[0].element[2] };
      node.$.name = undefined;

      const name = inputInterpreter.getNodeName(node);

      expect(name).to.equal(UNKNOWN);
    });
  });

  describe('getNodeType', () => {
    it('should return a node type', () => {
      const node = model['archimate:model'].folder[0].element[0];

      const type = inputInterpreter.getNodeType(node);

      expect(type).to.equal('Resource');
    });
  });

  describe('getNodeDocumentation', () => {
    it('should return a node documentation', () => {
      const nodes = model['archimate:model'].folder[0].element;
      const nodeIndex = nodes.findIndex(node => node.documentation);
      const documentation = inputInterpreter.getNodeDocumentation(nodes[nodeIndex]);

      expect(documentation).to.equal('This is a documentation test');
    });

    it('should return null if node documentation is not defined', () => {
      const node = model['archimate:model'].folder[0].element[0];
      const documentation = inputInterpreter.getNodeDocumentation(node);

      expect(documentation).to.equal(null);
    });
  });

  describe('getNodeJunctionType', () => {
    it('should return the node junction type', () => {
      const nodes = model['archimate:model'].folder[6].element;
      const nodeIndex = nodes.findIndex(node => inputInterpreter.isJunctionNode(node));

      const junctionType = inputInterpreter.getNodeJunctionType(nodes[nodeIndex]);

      expect(junctionType).to.equal(ElementType.AndJunction);
    });
  });

  describe('getNodeProperties', () => {
    it('should return a node properties', () => {
      const nodes = model['archimate:model'].folder[0].element;

      const nodeIndex = nodes.findIndex(node => node.property);

      const properties = inputInterpreter.getNodeProperties(nodes[nodeIndex]);

      expect(properties.length).to.equal(3);
      expect(properties).to.deep.equal(nodes[nodeIndex].property);
    });
  });

  describe('getPropertyEntry', () => {
    it('should return a property entry', () => {
      const nodes = model['archimate:model'].folder[0].element;
      const nodeIndex = nodes.findIndex(node => node.property);
      const property = nodes[nodeIndex].property[0];

      const [propertyDefinition, value] = inputInterpreter.getPropertyEntry(property);

      expect(propertyDefinition).to.equal('Description');
      expect(value).to.equal('Attribute value string');
    });

    it('should return an empty array if property is not defined', () => {
      const propertyEntry = inputInterpreter.getPropertyEntry(undefined);

      expect(propertyEntry).to.deep.equal([]);
      expect(propertyEntry.length).to.equal(0);
    });
  });

  describe('getRelationshipId', () => {
    it('should return a relationship ID', () => {
      const relationship = model['archimate:model'].folder[0].element[0];
      const id = inputInterpreter.getRelationshipId(relationship);
      expect(id).to.equal('40eb5bd6-4d7c-4c27-98a8-602f935ed405');
    });
  });

  describe('getRelationshipSourceId', () => {
    it('should return a relationship source ID', () => {
      const relationship = model['archimate:model'].folder[7].element.find(rel => rel.$.source);
      const id = inputInterpreter.getRelationshipSourceId(relationship);
      expect(id).to.equal('d0c22546-6ae6-4ba9-a141-222cc6eea16d');
    });
  });

  describe('getRelationshipTargetId', () => {
    it('should return a relationship target ID', () => {
      const relationship = model['archimate:model'].folder[7].element.find(rel => rel.$.target);
      const id = inputInterpreter.getRelationshipTargetId(relationship);

      expect(id).to.equal('cc07d17e-8450-4adf-84d1-ea7d92ec01ab');
    });
  });

  describe('getRelationshipType', () => {
    it('should return a relationship type', () => {
      const relationship = model['archimate:model'].folder[7].element[0];
      const type = inputInterpreter.getRelationshipType(relationship);

      expect(type).to.equal('AggregationRelationship');
    });
  });

  describe('getAccessRelationshipDirection', () => {
    it('should return a default access relationship direction if "accesstype" is not defined', () => {
      const relationship = model['archimate:model'].folder[0].element[0];

      const { source, target } = inputInterpreter.getAccessRelationshipDirection(relationship);

      expect(source).to.equal(false);
      expect(target).to.equal(true);
    });

    it('should return a relationship "1" access direction', () => {
      const relationships = model['archimate:model'].folder[7].element;
      const relationship = relationships.find(e => e.$.accessType === '1');

      const { source, target } = inputInterpreter.getAccessRelationshipDirection(relationship);

      expect(source).to.equal(true);
      expect(target).to.equal(false);
    });

    it('should return a relationship "2" access direction', () => {
      const relationships = model['archimate:model'].folder[7].element;
      const relationship = relationships.find(e => e.$.accessType === '2');

      const { source, target } = inputInterpreter.getAccessRelationshipDirection(relationship);

      expect(source).to.equal(false);
      expect(target).to.equal(false);
    });

    it('should return a relationship "3" access direction', () => {
      const relationships = model['archimate:model'].folder[7].element;
      const relationship = relationships.find(e => e.$.accessType === '3');

      const { source, target } = inputInterpreter.getAccessRelationshipDirection(relationship);

      expect(source).to.equal(true);
      expect(target).to.equal(true);
    });
  });

  describe('getAssociationsRelationshipIsDirected', () => {
    it('should return true if association relationship is directed', () => {
      const relationships = model['archimate:model'].folder[7].element;
      const relationship = relationships.find(e => e.$.directed);

      const isDirected = inputInterpreter.getAssociationRelationshipIsDirected(relationship);

      expect(isDirected).to.equal(true);
    });

    it('should return false if association relationship is not directed', () => {
      const relationship = model['archimate:model'].folder[7].element[0];
      relationship.$.directed = 'false';

      const isDirected = inputInterpreter.getAssociationRelationshipIsDirected(relationship);

      expect(isDirected).to.equal(false);
    });

    it('should return false if "directed" property of relationship is undefined', () => {
      const relationship = model['archimate:model'].folder[0].element[0];

      const isDirected = inputInterpreter.getAssociationRelationshipIsDirected(relationship);

      expect(isDirected).to.equal(false);
    });
  });

  describe('getFolderName', () => {
    it('should return a default folder name if the name property is not defined', () => {
      const folder = { ...model['archimate:model'].folder[0] };
      folder.$.name = undefined;
      const folderName = inputInterpreter.getFolderName(folder);

      expect(folderName).to.equal(UNKNOWN);
    });

    it('should return a folder name if name property is defined', () => {
      const folder = model['archimate:model'].folder[1];
      const folderName = inputInterpreter.getFolderName(folder);

      expect(folderName).to.equal(FolderType.Business);
    });
  });

  describe('getSubFolders', () => {
    it('should return a sub folders', () => {
      const folder = model['archimate:model'].folder.find(folder => folder.folder);
      const subFolders = inputInterpreter.getSubFolders(folder);

      expect(subFolders.length).to.equal(1);
      expect(subFolders[0].$.name).to.equal('New Folder');
    });
  });

  describe('getFolderViews', () => {
    it('should return a folder Views', () => {
      const folder = model['archimate:model'].folder[0];
      const folderViews = inputInterpreter.getFolderViews(folder);

      expect(folderViews.length).to.equal(4);
    });
  });

  describe('getViewElements', () => {
    it('should return a view elements', () => {
      const view = model['archimate:model'].folder[8].folder[0].element[3];

      const elements = inputInterpreter.getViewElements(view);

      expect(elements.length).to.equal(4);
    });

    it('should return a empty array if child property is not defined', () => {
      const view = model['archimate:model'].folder[1].element[0];
      const elements = inputInterpreter.getViewElements(view);

      expect(elements.length).to.equal(0);
      expect(elements).to.deep.equal([]);
    });
  });

  describe('getViewId', () => {
    it('should return a view ID if id is defined', () => {
      const view = model['archimate:model'].folder[8].folder[0].element[0];
      const id = inputInterpreter.getViewId(view);

      expect(id).to.equal('57147c58-d2fc-463e-977b-b0812b23500a');
    });
  });

  describe('getViewName', () => {
    it('should return a view name if name property is defined', () => {
      const view = model['archimate:model'].folder[8].folder[0].element[0];

      const name = inputInterpreter.getViewName(view);

      expect(name).to.equal('Elements');
    });

    it('should return a default view name if name property is not defined', () => {
      const view = model['archimate:model'].folder[8].folder[0].element[0];
      view.$.name = undefined;
      const name = inputInterpreter.getViewName(view);

      expect(name).to.equal(UNKNOWN);
    });
  });

  describe('getViewElementViewId', () => {
    it('should return a element view ID', () => {
      const node = model['archimate:model'].folder[8].folder[0].element[0];

      const id = inputInterpreter.getViewElementViewId(node);
      expect(id).to.equal('57147c58-d2fc-463e-977b-b0812b23500a');
    });
  });

  describe('getViewElementModelId', () => {
    it('should return a view element model ID', () => {
      const node = model['archimate:model'].folder[8].folder[0].element[0].child[0];

      const id = inputInterpreter.getViewElementModelId(node);
      expect(id).to.equal('8ab8d668-3852-4bf8-a43e-2fcc89c01c79');
    });
  });

  describe('calculateNestedPosition', () => {
    it('should return null if view elements is an empty array', () => {
      const response = inputInterpreter.calculateNestedPosition([], '');

      expect(response).to.equal(null);
    });
  });

  describe('getViewElementPositionX', () => {
    it('should return a position X of view element', () => {
      const node = model['archimate:model'].folder[8].folder[0].element[0].child[0];

      const positionX = inputInterpreter.getViewElementPositionX({ viewElement: node });

      expect(positionX).to.equal(38);
    });
  });

  describe('getViewElementPositionY', () => {
    it('should return a position Y of view element', () => {
      const node = model['archimate:model'].folder[8].folder[0].element[0].child[0];
      const positionY = inputInterpreter.getViewElementPositionY({ viewElement: node });

      expect(positionY).to.equal(25);
    });
  });

  describe('getViewElementWidth', () => {
    it('should return a view element width', () => {
      const node = model['archimate:model'].folder[8].folder[0].element[1].child[12];

      const width = inputInterpreter.getViewElementWidth(node);

      expect(width).to.equal(617);
    });
  });

  describe('getViewElementHeight', () => {
    it('should return a view element height', () => {
      const node = model['archimate:model'].folder[8].folder[0].element[1].child[12];
      const width = inputInterpreter.getViewElementHeight(node);

      expect(width).to.equal(217);
    });
  });

  describe('getViewElementSourceRelationships', () => {
    it('should return element source relationship', () => {
      const node = model['archimate:model'].folder[8].folder[0].element[1].child[0];
      const viewElementSource = inputInterpreter.getViewElementSourceRelationships(node);

      expect(viewElementSource.length).to.equal(2);
      expect(viewElementSource).to.deep.equal([
        {
          $: {
            'xsi:type': 'archimate:Connection',
            id: 'b370c707-37eb-4f93-b6f4-c54867832ec7',
            source: '0d48039d-ed53-4e60-8045-1af4f1e5db6f',
            target: '1620e51a-453c-411e-8c1c-8bf9d7545c93',
            archimateRelationship: 'c8eacb29-df66-4c8a-98bf-159b8e894b94',
          },
        },
        {
          $: {
            'xsi:type': 'archimate:Connection',
            id: 'fff3616c-8e98-400b-9bb9-be885a99a86d',
            source: '0d48039d-ed53-4e60-8045-1af4f1e5db6f',
            target: 'c75cd717-81d4-44df-af36-ac7b711359e0',
            archimateRelationship: '4d23b33a-7250-44a0-b47d-0b1f010257d1',
          },
        },
      ]);
    });
  });

  describe('getViewElementNestedElements', () => {
    it('should return a nested elements', () => {
      const node = model['archimate:model'].folder[8].folder[0].element[1];

      const nestedElements = inputInterpreter.getViewElementNestedElements(node);

      expect(nestedElements.length).to.equal(21);
    });
  });

  describe('findViewElementParent', () => {
    it('should return a view element parent', () => {
      const nodes = model['archimate:model'].folder[8].folder[0].element;

      const id = '96f41f9a-44fd-420b-8e81-e669a490fd2d';
      const element = inputInterpreter.findViewElementParent(nodes, id);
      expect(element.$.id).to.equal('57147c58-d2fc-463e-977b-b0812b23500a');
    });

    it('should return null if element is not found', () => {
      const nodes = model['archimate:model'].folder[8].folder[0].element;
      const id = 'id';
      const element = inputInterpreter.findViewElementParent(nodes, id);

      expect(element).to.equal(null);
    });
  });

  describe('findViewElement', () => {
    it('should return a view Element', () => {
      const nodes = model['archimate:model'].folder[8].folder[0].element;
      const id = '57147c58-d2fc-463e-977b-b0812b23500a';
      const element = inputInterpreter.findViewElement(nodes, id);

      expect(element.$.id).to.equal(id);
    });

    it('should return a nested view Element', () => {
      const nodes = model['archimate:model'].folder[8].folder[0].element;
      const id = '96f41f9a-44fd-420b-8e81-e669a490fd2d';

      const element = inputInterpreter.findViewElement(nodes, id);

      expect(element.$.id).to.equal(id);
    });

    it('should return null if not found view element', () => {
      const nodes = model['archimate:model'].folder[8].folder[0].element;
      const id = '90587bb';
      const element = inputInterpreter.findViewElement(nodes, id);

      expect(element).to.equal(null);
    });

    it('should return null if view elements are empty', () => {
      const id = '90587bb4-b903-4d1e-af17-ec1deb1a6a3e';
      const element = inputInterpreter.findViewElement([], id);

      expect(element).to.equal(null);
    });
  });

  describe('getViewNoteContent', () => {
    it('should return a view note content if content property is a string', () => {
      const node = model['archimate:model'].folder[8].folder[0].element[0];
      node.content = 'Teste';

      const content = inputInterpreter.getViewNoteContent(node);
      expect(content).to.equal('Teste');
    });

    it('should return a view note content if the content property is an array of string', () => {
      const node = model['archimate:model'].folder[8].folder[0].element[0];
      node.content = ['Teste'];

      const content = inputInterpreter.getViewNoteContent(node);
      expect(content).to.equal('Teste');
    });

    it('should return a default content if label property is not defined', () => {
      const node = model['archimate:model'].folder[8].folder[0].element[0];
      node.content = undefined;

      const content = inputInterpreter.getViewNoteContent(node);
      expect(content).to.equal('No Content');
    });
  });

  describe('getViewGroupName', () => {
    it('should return a view group name', () => {
      const node = model['archimate:model'].folder[8].folder[0].element[1];

      const content = inputInterpreter.getViewGroupName(node);
      expect(content).to.equal('Relationships');
    });

    it('should return a default name if name property is not defined', () => {
      const node = model['archimate:model'].folder[8].folder[0].element[0];
      node.$.name = undefined;
      const name = inputInterpreter.getViewGroupName(node);
      expect(name).to.equal(UNKNOWN);
    });
  });

  describe('getViewRelationshipBendpoints', () => {
    const bendpoint = [{ $: { startX: '34', startY: '30', endX: '76', endY: '669' } }];
    it('should return a bendpoints', () => {
      const relationship =
        model['archimate:model'].folder[8].folder[0].element[1].child[0].sourceConnection[0];
      relationship.bendpoint = bendpoint;

      const bendpoints = inputInterpreter.getViewRelationshipBendpoints(relationship);

      expect(bendpoints.length).to.equal(1);
      expect(bendpoints).to.deep.equal(bendpoint);
    });
  });

  describe('getViewRelationshipBendpoint', () => {
    const bendpoint = [{ $: { startX: '34', startY: '30', endX: '76', endY: '669' } }];

    it('should return a bendpoint', () => {
      const sourceViewElement = model['archimate:model'].folder[8].folder[0].element[1].child[0];
      const targetViewElement = model['archimate:model'].folder[8].folder[0].element[1].child[1];
      const views = model['archimate:model'].folder[8].folder[0].element[1].child;

      const relationship =
        model['archimate:model'].folder[8].folder[0].element[1].child[0].sourceConnection[0];
      relationship.bendpoint = bendpoint;
      const [relationshipBendpoint] = inputInterpreter.getViewRelationshipBendpoints(relationship);

      const { y, x } = inputInterpreter.getViewRelationshipBendpoint({
        bendpoint: relationshipBendpoint,
        bendpointIndex: 1,
        bendpointsLength: 1,
        sourceViewElement,
        targetViewElement,
        viewNodes: views,
      });

      expect(x).to.equal(172);
      expect(y).to.equal(797);
    });
  });

  describe('getViewRelationshipModelId', () => {
    it('should return the relationship model ID', () => {
      const relationship =
        model['archimate:model'].folder[8].folder[0].element[1].child[0].sourceConnection[0];
      const id = inputInterpreter.getViewRelationshipModelId(relationship);

      expect(id).to.equal('c8eacb29-df66-4c8a-98bf-159b8e894b94');
    });

    it('should return null if archimateRelationship property is not defined', () => {
      const relationship = model['archimate:model'].folder[0].element[0];

      const id = inputInterpreter.getViewRelationshipModelId(relationship);

      expect(id).to.equal(null);
    });
  });

  describe('getViewRelationshipId', () => {
    it('should return a view relationship ID', () => {
      const relationship =
        model['archimate:model'].folder[8].folder[0].element[1].child[0].sourceConnection[0];

      const id = inputInterpreter.getViewRelationshipId(relationship);
      expect(id).to.equal('b370c707-37eb-4f93-b6f4-c54867832ec7');
    });
  });

  describe('getViewRelationshipSourceElementId', () => {
    it('should return a view relationship source element ID', () => {
      const relationship =
        model['archimate:model'].folder[8].folder[0].element[1].child[0].sourceConnection[0];

      const id = inputInterpreter.getViewRelationshipSourceElementId(relationship);
      expect(id).to.equal('0d48039d-ed53-4e60-8045-1af4f1e5db6f');
    });
  });

  describe('getViewRelationshipTargetElementId', () => {
    it('should return a view relationship target element ID', () => {
      const relationship =
        model['archimate:model'].folder[8].folder[0].element[1].child[0].sourceConnection[0];

      const id = inputInterpreter.getViewRelationshipTargetElementId(relationship);
      expect(id).to.equal('1620e51a-453c-411e-8c1c-8bf9d7545c93');
    });
  });

  describe('getOrganizationFolders', () => {
    it("should return an organization's folder", () => {
      inputInterpreter.validate();
      const folders = inputInterpreter.getOrganizationFolders();

      expect(folders.length).to.equal(1);
      expect(folders[0].$.name).to.equal('Views');
    });
  });

  describe('validate', () => {
    it('should return true if Aoeff model is valid', () => {
      const isValid = inputInterpreter.validate();

      expect(isValid).to.equal(true);
    });
  });

  describe('isAccessRelationship', () => {
    it('should return true if relationship type is equal Access', () => {
      const relationship = model['archimate:model'].folder[7].element[5];

      const isAccessRelationship = inputInterpreter.isAccessRelationship(relationship);

      expect(isAccessRelationship).to.equal(true);
    });

    it('should return false if relationship type is not equal Access', () => {
      const relationship = model['archimate:model'].folder[0].element[0];

      const isAccessRelationship = inputInterpreter.isAccessRelationship(relationship);

      expect(isAccessRelationship).to.equal(false);
    });
  });

  describe('isAssociationRelationship', () => {
    it('should return true if relationship type is equal Association', () => {
      const relationship = model['archimate:model'].folder[7].element[7];

      const isAccessRelationship = inputInterpreter.isAssociationRelationship(relationship);

      expect(isAccessRelationship).to.equal(true);
    });

    it('should return false if relationship type is not equal Association', () => {
      const relationship = model['archimate:model'].folder[0].element[0];

      const isAccessRelationship = inputInterpreter.isAssociationRelationship(relationship);

      expect(isAccessRelationship).to.equal(false);
    });
  });

  describe('isViewObject', () => {
    it('should return true if view type is equal Element', () => {
      const node = model['archimate:model'].folder[8].folder[0].element[0];
      node.$['xsi:type'] = 'archimate:DiagramObject';

      const isViewObject = inputInterpreter.isViewObject(node);

      expect(isViewObject).to.equal(true);
    });

    it('should return false if view type is not equal Element', () => {
      const node = model['archimate:model'].folder[8].folder[0].element[1];

      const isViewObject = inputInterpreter.isViewObject(node);

      expect(isViewObject).to.equal(false);
    });
  });

  describe('isViewNote', () => {
    it('should return false if view type is not equal Label', () => {
      const node = model['archimate:model'].folder[8].folder[0].element[1];
      const isViewNote = inputInterpreter.isViewNote(node);

      expect(isViewNote).to.equal(false);
    });

    it('should return true if view type is equal Label', () => {
      const node = model['archimate:model'].folder[8].folder[0].element[1];
      node.$['xsi:type'] = 'archimate:Note';

      const isViewNote = inputInterpreter.isViewNote(node);

      expect(isViewNote).to.equal(true);
    });
  });

  describe('isViewGroup', () => {
    it('should return false if view type is not equal Container', () => {
      const node = model['archimate:model'].folder[8].folder[0].element[1];

      const isViewGroup = inputInterpreter.isViewGroup(node);

      expect(isViewGroup).to.equal(false);
    });

    it('should return true if view type is equal Container', () => {
      const node = model['archimate:model'].folder[8].folder[0].element[1];
      node.$['xsi:type'] = 'archimate:Group';

      const isViewGroup = inputInterpreter.isViewGroup(node);

      expect(isViewGroup).to.equal(true);
    });
  });

  describe('isJunctionNode', () => {
    it('should return false if element is not junction node', () => {
      const element = model['archimate:model'].folder[0].element[0];

      const isJunctionNode = inputInterpreter.isJunctionNode(element);

      expect(isJunctionNode).to.equal(false);
    });

    it('should return true if view type is equal OrJunction', () => {
      const element = model['archimate:model'].folder[0].element[0];
      element.$['xsi:type'] = 'archimate:Junction';
      const isJunctionNode = inputInterpreter.isJunctionNode(element);

      expect(isJunctionNode).to.equal(true);
    });
  });
});
