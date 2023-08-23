import path from 'path';
import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
import { AoeffModel, ItemModel, ViewModel } from '@lib/common/interfaces/aoeffModel';
import { expect } from 'chai';
import { before } from 'mocha';
import { RelationshipAccessType } from '@lib/common/enums/relationshipAccessType';
import { AoeffViewType } from '@lib/common/enums/viewType';
import { ElementType } from '@lib/common/enums/elementType';
import { getXmlModel } from '../../../../../utils/getXmlModel';

const UNKNOWN = 'Unknown Name';

describe('AoeffInterpreter', () => {
  let inputInterpreter: AoeffInterpreter;
  let model: AoeffModel;

  before(async () => {
    const rootPath = __dirname.split('\\').slice(0, -5).join('\\');
    const filePath = path.join(rootPath, '/models/aoeff_3_1.xml');
    model = await getXmlModel<AoeffModel>(filePath);
    inputInterpreter = new AoeffInterpreter(model);
  });

  describe('getModelId', () => {
    it('should return a model Id', () => {
      const id = inputInterpreter.getModelId();

      expect(id).to.equal('id-799298e6-cefa-47aa-986f-1ab9d5c10d21');
    });
  });

  describe('getNodeId', () => {
    it('should return a node id', () => {
      const node = model.model.elements[0].element[0];
      const id = inputInterpreter.getNodeId(node);

      expect(id).to.equal('40eb5bd6-4d7c-4c27-98a8-602f935ed405');
    });
  });

  describe('getNodeName', () => {
    it('should return a node name if the name is an array of object', () => {
      const node = model.model.elements[0].element[0];
      const name = inputInterpreter.getNodeName(node);

      expect(name).to.equal('Resource');
    });

    it('should return a node name if the name is an array of string', () => {
      const node = {
        $: { identifier: 'id-40eb5bd6-4d7c-4c27-98a8-602f935ed405', 'xsi:type': '' },
        name: ['Resource'],
      };
      const name = inputInterpreter.getNodeName(node);

      expect(name).to.equal('Resource');
    });

    it('should return a default node name if the node is not defined', () => {
      const name = inputInterpreter.getNodeName(undefined);

      expect(name).to.equal(UNKNOWN);
    });
  });

  describe('getNodeType', () => {
    it('should return a node type', () => {
      const node = model.model.elements[0].element[0];
      const type = inputInterpreter.getNodeType(node);

      expect(type).to.equal('Resource');
    });
  });

  describe('getNodeDocumentation', () => {
    it('should return a node documentation', () => {
      const nodes = model.model.elements[0].element;
      const nodeIndex = nodes.findIndex(node => node.documentation);
      const documentation = inputInterpreter.getNodeDocumentation(nodes[nodeIndex]);

      expect(documentation).to.equal('This is a documentation test');
    });

    it('should return null if node documentation is not defined', () => {
      const node = model.model.elements[0].element[0];
      const documentation = inputInterpreter.getNodeDocumentation(node);

      expect(documentation).to.equal(null);
    });
  });

  describe('getNodeJunctionType', () => {
    it('should return the node junction type', () => {
      const nodes = model.model.elements[0].element;
      const nodeIndex = nodes.findIndex(node => inputInterpreter.isJunctionNode(node));

      const junctionType = inputInterpreter.getNodeJunctionType(nodes[nodeIndex]);

      expect(junctionType).to.equal('AndJunction');
    });
  });

  describe('getNodeProperties', () => {
    it('should return a node properties', () => {
      const nodes = model.model.elements[0].element;
      const nodeIndex = nodes.findIndex(node => node.properties);

      const properties = inputInterpreter.getNodeProperties(nodes[nodeIndex]);

      expect(properties.length).to.equal(3);
      expect(properties).to.deep.equal(nodes[nodeIndex].properties[0].property);
    });

    it('should return null if properties is not defined', () => {
      const node = model.model.elements[0].element[0];

      const properties = inputInterpreter.getNodeProperties(node);

      expect(properties).to.equal(null);
    });
  });

  describe('getPropertyEntry', () => {
    it('should return a property entry', () => {
      const nodes = model.model.elements[0].element;
      const nodeIndex = nodes.findIndex(node => node.properties);
      const property = nodes[nodeIndex].properties[0].property[0];

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
      const relationship = model.model.relationships[0].relationship[0];
      const id = inputInterpreter.getRelationshipId(relationship);

      expect(id).to.equal('bc8c928b-dafb-4e61-91b3-7c3e5b93a900');
    });
  });

  describe('getRelationshipSourceId', () => {
    it('should return a relationship source ID', () => {
      const relationship = model.model.relationships[0].relationship[0];
      const id = inputInterpreter.getRelationshipSourceId(relationship);

      expect(id).to.equal('d0c22546-6ae6-4ba9-a141-222cc6eea16d');
    });
  });

  describe('getRelationshipTargetId', () => {
    it('should return a relationship target ID', () => {
      const relationship = model.model.relationships[0].relationship[0];
      const id = inputInterpreter.getRelationshipTargetId(relationship);

      expect(id).to.equal('cc07d17e-8450-4adf-84d1-ea7d92ec01ab');
    });
  });

  describe('getRelationshipType', () => {
    it('should return a relationship type', () => {
      const relationship = model.model.relationships[0].relationship[0];
      const type = inputInterpreter.getRelationshipType(relationship);

      expect(type).to.equal('Aggregationrelationship');
    });
  });

  describe('getAccessRelationshipDirection', () => {
    it('should return a default access relationship direction if "accesstype" is not defined', () => {
      const relationship = model.model.relationships[0].relationship[0];

      const { source, target } = inputInterpreter.getAccessRelationshipDirection(relationship);

      expect(source).to.equal(false);
      expect(target).to.equal(true);
    });

    it('should return a relationship "Write" access direction', () => {
      const relationships = model.model.relationships[0].relationship;
      const relationship = relationships.find(e => e.$.accessType == RelationshipAccessType.Write);

      const { source, target } = inputInterpreter.getAccessRelationshipDirection(relationship);

      expect(source).to.equal(false);
      expect(target).to.equal(true);
    });

    it('should return a relationship "Read" access direction', () => {
      const relationships = model.model.relationships[0].relationship;
      const relationship = relationships.find(e => e.$.accessType == RelationshipAccessType.Read);

      const { source, target } = inputInterpreter.getAccessRelationshipDirection(relationship);

      expect(source).to.equal(true);
      expect(target).to.equal(false);
    });

    it('should return a relationship "Access" access direction', () => {
      const relationships = model.model.relationships[0].relationship;
      const relationship = relationships.find(e => e.$.accessType == RelationshipAccessType.Access);

      const { source, target } = inputInterpreter.getAccessRelationshipDirection(relationship);

      expect(source).to.equal(false);
      expect(target).to.equal(false);
    });

    it('should return a relationship "ReadWrite" access direction', () => {
      const relationships = model.model.relationships[0].relationship;
      const relationship = relationships.find(
        e => e.$.accessType == RelationshipAccessType.ReadWrite,
      );

      const { source, target } = inputInterpreter.getAccessRelationshipDirection(relationship);

      expect(source).to.equal(true);
      expect(target).to.equal(true);
    });
  });

  describe('getAssociationsRelationshipIsDirected', () => {
    it('should return true if association relationship is directed', () => {
      const relationships = model.model.relationships[0].relationship;
      const relationship = relationships.find(e => e.$.isDirected);

      const isDirected = inputInterpreter.getAssociationRelationshipIsDirected(relationship);

      expect(isDirected).to.equal(true);
    });

    it('should return false if association relationship is not directed', () => {
      const relationship = model.model.relationships[0].relationship[0];
      relationship.$.isDirected = 'false';

      const isDirected = inputInterpreter.getAssociationRelationshipIsDirected(relationship);

      expect(isDirected).to.equal(false);
    });

    it('should return false if "isDirected" property of relationship is undefined', () => {
      const relationship = model.model.relationships[0].relationship[0];
      const isDirected = inputInterpreter.getAssociationRelationshipIsDirected(relationship);

      expect(isDirected).to.equal(false);
    });
  });

  describe('getFolderName', () => {
    it('should return a default folder name if the label property is an empty array', () => {
      const folder = model.model.organizations[0].item[0];
      const folderName = inputInterpreter.getFolderName({ ...folder, label: [] });

      expect(folderName).to.equal(UNKNOWN);
    });

    it('should return a folder name if the label property is an array of object', () => {
      const folder = model.model.organizations[0].item[0];
      const folderName = inputInterpreter.getFolderName(folder);

      expect(folderName).to.equal('Strategy');
    });

    it('should return a folder name if the label property is an array of string', () => {
      const folder = model.model.organizations[0].item[0];
      const folderName = inputInterpreter.getFolderName({ ...folder, label: ['Strategy'] });

      expect(folderName).to.equal('Strategy');
    });
  });

  describe('getSubFolders', () => {
    it('should return a sub folders', () => {
      const folder = model.model.organizations[0].item[0];
      const subFolders = inputInterpreter.getSubFolders(folder);

      expect(subFolders.length).to.equal(0);
      expect(subFolders).to.deep.equal([]);
    });
  });

  describe('getFolderViews', () => {
    it('should return a folder Views', () => {
      const folder = model.model.organizations[0].item[0];
      const folderViews = inputInterpreter.getFolderViews(folder);

      expect(folderViews.length).to.equal(4);
      expect(folderViews).to.deep.equal([
        { $: { identifierRef: 'id-40eb5bd6-4d7c-4c27-98a8-602f935ed405' } },
        { $: { identifierRef: 'id-6be02ba1-0489-4ea4-b62b-a22d302cbefe' } },
        { $: { identifierRef: 'id-5382f2ab-3c02-44b3-a26f-ceaff8b4df02' } },
        { $: { identifierRef: 'id-7d9dd269-b44a-4067-b10c-2c0563f3efea' } },
      ]);
    });
  });

  describe('getViewElements', () => {
    it('should return a view elements', () => {
      const view = model.model.views[0].diagrams[0].view[0];
      const elements = inputInterpreter.getViewElements(view);

      expect(elements.length).to.equal(58);
      expect(elements[0].$['xsi:type']).to.equal('Element');
    });
  });

  describe('getViewId', () => {
    it('should return a view ID if identifier is defined', () => {
      const view = model.model.views[0].diagrams[0].view[0];
      const id = inputInterpreter.getViewId(view);

      expect(id).to.equal('57147c58-d2fc-463e-977b-b0812b23500a');
    });

    it('should return a view ID if identifier is not defined', () => {
      const view = model.model.views[0].diagrams[0].view[0];
      const id = inputInterpreter.getViewId(view);

      expect(id).to.equal('57147c58-d2fc-463e-977b-b0812b23500a');
    });
  });

  describe('getViewName', () => {
    it('should return a view name if name property is defined', () => {
      const view = model.model.views[0].diagrams[0].view[1];

      const name = inputInterpreter.getViewName(view);

      expect(name).to.equal('Relationships');
    });

    it('should return a view name if name property is an array of string', () => {
      const view = model.model.views[0].diagrams[0].view[1];

      const name = inputInterpreter.getViewName({ ...view, name: ['Relationships'] });

      expect(name).to.equal('Relationships');
    });

    it("should return a view name if the view is an Organizations' folder", () => {
      const organizationView = model.model.organizations[0].item[8].item[0] as ItemModel;
      const item = organizationView.item[0];

      const name = inputInterpreter.getViewName(item as unknown as ViewModel);

      expect(name).to.equal('Elements');
    });

    it('should return a default view name if name property is not defined and not find view based in organization folder', () => {
      const organizationView = model.model.organizations[0].item[0].item[0];

      const name = inputInterpreter.getViewName(organizationView as unknown as ViewModel);

      expect(name).to.equal(UNKNOWN);
    });
  });

  describe('getViewElementViewId', () => {
    it('should return a element view ID', () => {
      const node = model.model.views[0].diagrams[0].view[0].node[0];

      const id = inputInterpreter.getViewElementViewId(node);
      expect(id).to.equal('96f41f9a-44fd-420b-8e81-e669a490fd2d');
    });
  });

  describe('getViewElementModelId', () => {
    it('should return a view element model ID', () => {
      const node = model.model.views[0].diagrams[0].view[0].node[0];

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
      const node = model.model.views[0].diagrams[0].view[0].node[0];
      const positionX = inputInterpreter.getViewElementPositionX(node, null, undefined);

      expect(positionX).to.equal(38);
    });

    it('should return a position X view element when parent element is defined', () => {
      const node = model.model.views[0].diagrams[0].view[1].node[12];
      const nestedElements = inputInterpreter.getViewElementNestedElements(node);

      const positionX = inputInterpreter.getViewElementPositionX(
        node,
        '90587bb4-b903-4d1e-af17-ec1deb1a6a3e',
        nestedElements,
      );

      expect(positionX).to.equal(-324);
    });
  });

  describe('getViewElementPositionY', () => {
    it('should return a position Y of view element', () => {
      const node = model.model.views[0].diagrams[0].view[0].node[0];
      const positionY = inputInterpreter.getViewElementPositionY(node, null, undefined);

      expect(positionY).to.equal(25);
    });

    it('should return a position Y view element when parent element is defined', () => {
      const node = model.model.views[0].diagrams[0].view[1].node[12];
      const nestedElements = inputInterpreter.getViewElementNestedElements(node);

      const positionY = inputInterpreter.getViewElementPositionY(
        node,
        '90587bb4-b903-4d1e-af17-ec1deb1a6a3e',
        nestedElements,
      );

      expect(positionY).to.equal(-80);
    });
  });

  describe('getViewElementWidth', () => {
    it('should return a view element width', () => {
      const node = model.model.views[0].diagrams[0].view[0].node[0];

      const width = inputInterpreter.getViewElementWidth(node);

      expect(width).to.equal(120);
    });
  });

  describe('getViewElementHeight', () => {
    it('should return a view element height', () => {
      const node = model.model.views[0].diagrams[0].view[0].node[0];

      const width = inputInterpreter.getViewElementHeight(node);

      expect(width).to.equal(55);
    });
  });

  describe('getViewElementSourceRelationships', () => {
    it('should return an empty array', () => {
      const node = model.model.views[0].diagrams[0].view[0].node[0];

      const viewElementSource = inputInterpreter.getViewElementSourceRelationships(node);

      expect(viewElementSource.length).to.equal(0);
      expect(viewElementSource).to.deep.equal([]);
    });
  });

  describe('getViewElementNestedElements', () => {
    it('should return a nested elements', () => {
      const node = model.model.views[0].diagrams[0].view[1].node[12];

      const nestedElements = inputInterpreter.getViewElementNestedElements(node);

      expect(nestedElements.length).to.equal(2);
      expect(nestedElements[0].$.identifier).to.equal('id-8108d366-2028-4c39-b119-5b249e77647f');
      expect(nestedElements[1].$.identifier).to.equal('id-90587bb4-b903-4d1e-af17-ec1deb1a6a3e');
    });
  });

  describe('findViewElementParent', () => {
    it('should return a view element parent', () => {
      const nodes = model.model.views[0].diagrams[0].view[1].node;
      const id = 'id-90587bb4-b903-4d1e-af17-ec1deb1a6a3e';
      const element = inputInterpreter.findViewElementParent(nodes, id);
      const parent = nodes.find(e => e.$.identifier === 'id-4ac2c3f6-739a-4598-9e8f-2600e0964ace');

      expect(element.$.identifier).to.equal(parent.$.identifier);
    });

    it('should return null if element is not found', () => {
      const nodes = model.model.views[0].diagrams[0].view[1].node;
      const id = 'id';
      const element = inputInterpreter.findViewElementParent(nodes, id);

      expect(element).to.equal(null);
    });
  });

  describe('findViewElement', () => {
    it('should return a view Element', () => {
      const nodes = model.model.views[0].diagrams[0].view[1].node;
      const id = '4ac2c3f6-739a-4598-9e8f-2600e0964ace';
      const element = inputInterpreter.findViewElement(nodes, id);

      expect(element.$.identifier).to.equal(`id-${id}`);
    });

    it('should return a nested view Element', () => {
      const nodes = model.model.views[0].diagrams[0].view[1].node;
      const id = '90587bb4-b903-4d1e-af17-ec1deb1a6a3e';
      const element = inputInterpreter.findViewElement(nodes, id);

      expect(element.$.identifier).to.equal(`id-${id}`);
    });

    it('should return null if not found view element', () => {
      const nodes = model.model.views[0].diagrams[0].view[1].node;
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
    it('should return a view note content', () => {
      const node = model.model.views[0].diagrams[0].view[1].node[16];

      const content = inputInterpreter.getViewNoteContent(node);
      expect(content).to.equal('Teste');
    });

    it('should return a view note content if label is an array of string', () => {
      const node = model.model.views[0].diagrams[0].view[1].node[16];

      const content = inputInterpreter.getViewNoteContent({ ...node, label: ['Teste'] });
      expect(content).to.equal('Teste');
    });

    it('should return a default content if label property is not defined', () => {
      const node = model.model.views[0].diagrams[0].view[0].node[0];

      const content = inputInterpreter.getViewNoteContent(node);
      expect(content).to.equal('No Content');
    });
  });

  describe('getViewGroupName', () => {
    it('should return a view group name', () => {
      const node = model.model.views[0].diagrams[0].view[1].node[16];

      const content = inputInterpreter.getViewGroupName(node);
      expect(content).to.equal('Teste');
    });

    it('should return a view group name if label is an array of string', () => {
      const node = model.model.views[0].diagrams[0].view[1].node[16];

      const content = inputInterpreter.getViewGroupName({ ...node, label: ['Teste'] });
      expect(content).to.equal('Teste');
    });

    it('should return a default name if label property is not defined', () => {
      const node = model.model.views[0].diagrams[0].view[0].node[0];

      const content = inputInterpreter.getViewGroupName(node);
      expect(content).to.equal(UNKNOWN);
    });
  });

  describe('getViewRelationshipBendpoints', () => {
    it('should return a bendpoints', () => {
      const relationship = model.model.views[0].diagrams[0].view[1].connection[6];

      const bendpoints = inputInterpreter.getViewRelationshipBendpoints(relationship);

      expect(bendpoints.length).to.equal(1);
      expect(bendpoints).to.deep.equal([{ $: { x: '528', y: '492' } }]);
    });
  });

  describe('getViewRelationshipBendpoint', () => {
    it('should return a bendpoint', () => {
      const relationship = model.model.views[0].diagrams[0].view[1].connection[6];
      const [bendpoint] = inputInterpreter.getViewRelationshipBendpoints(relationship);

      const { y, x } = inputInterpreter.getViewRelationshipBendpoint(bendpoint);

      expect(x).to.equal(528);
      expect(y).to.equal(492);
    });
  });

  describe('getViewRelationshipModelId', () => {
    it('should return the relationship model ID', () => {
      const relationship = model.model.views[0].diagrams[0].view[1].connection[0];

      const id = inputInterpreter.getViewRelationshipModelId(relationship);

      expect(id).to.equal('c8eacb29-df66-4c8a-98bf-159b8e894b94');
    });

    it('should return null if relationshipRef property is not defined', () => {
      const relationship = model.model.views[0].diagrams[0].view[1].connection[1];
      relationship.$.relationshipRef = undefined;

      const id = inputInterpreter.getViewRelationshipModelId(relationship);

      expect(id).to.equal(null);
    });
  });

  describe('getViewRelationshipId', () => {
    it('should return a view relationship ID', () => {
      const relationship = model.model.views[0].diagrams[0].view[1].connection[0];

      const id = inputInterpreter.getViewRelationshipId(relationship);
      expect(id).to.equal('b370c707-37eb-4f93-b6f4-c54867832ec7');
    });
  });

  describe('getViewRelationshipSourceElementId', () => {
    it('should return a view relationship source element ID', () => {
      const relationship = model.model.views[0].diagrams[0].view[1].connection[0];

      const id = inputInterpreter.getViewRelationshipSourceElementId(relationship);
      expect(id).to.equal('0d48039d-ed53-4e60-8045-1af4f1e5db6f');
    });
  });

  describe('getViewRelationshipTargetElementId', () => {
    it('should return a view relationship target element ID', () => {
      const relationship = model.model.views[0].diagrams[0].view[1].connection[0];

      const id = inputInterpreter.getViewRelationshipTargetElementId(relationship);
      expect(id).to.equal('1620e51a-453c-411e-8c1c-8bf9d7545c93');
    });
  });

  describe('getOrganizationFolders', () => {
    it("should return an organization's folder", () => {
      const folders = inputInterpreter.getOrganizationFolders();

      expect(folders.length).to.equal(1);
      expect(folders[0].label[0]['_']).to.equal('Views');
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
      const relationship = model.model.relationships[0].relationship[5];

      const isAccessRelationship = inputInterpreter.isAccessRelationship(relationship);

      expect(isAccessRelationship).to.equal(true);
    });

    it('should return false if relationship type is not equal Access', () => {
      const relationship = model.model.relationships[0].relationship[0];

      const isAccessRelationship = inputInterpreter.isAccessRelationship(relationship);

      expect(isAccessRelationship).to.equal(false);
    });
  });

  describe('isAssociationRelationship', () => {
    it('should return true if relationship type is equal Association', () => {
      const relationship = model.model.relationships[0].relationship[7];

      const isAccessRelationship = inputInterpreter.isAssociationRelationship(relationship);

      expect(isAccessRelationship).to.equal(true);
    });

    it('should return false if relationship type is not equal Association', () => {
      const relationship = model.model.relationships[0].relationship[5];

      const isAccessRelationship = inputInterpreter.isAssociationRelationship(relationship);

      expect(isAccessRelationship).to.equal(false);
    });
  });

  describe('isViewObject', () => {
    it('should return true if view type is equal Element', () => {
      const node = model.model.views[0].diagrams[0].view[0].node[0];

      const isViewObject = inputInterpreter.isViewObject(node);

      expect(isViewObject).to.equal(true);
    });

    it('should return false if view type is not equal Element', () => {
      const node = model.model.views[0].diagrams[0].view[0].node[0];

      node.$['xsi:type'] = AoeffViewType.Label;

      const isViewObject = inputInterpreter.isViewObject(node);

      expect(isViewObject).to.equal(false);
    });
  });

  describe('isViewNote', () => {
    it('should return false if view type is not equal Label', () => {
      const node = model.model.views[0].diagrams[0].view[0].node[1];

      const isViewNote = inputInterpreter.isViewNote(node);

      expect(isViewNote).to.equal(false);
    });

    it('should return true if view type is equal Label', () => {
      const node = model.model.views[0].diagrams[0].view[0].node[1];
      node.$['xsi:type'] = AoeffViewType.Label;

      const isViewNote = inputInterpreter.isViewNote(node);

      expect(isViewNote).to.equal(true);
    });
  });

  describe('isViewGroup', () => {
    it('should return false if view type is not equal Container', () => {
      const node = model.model.views[0].diagrams[0].view[0];

      const isViewGroup = inputInterpreter.isViewGroup(node);

      expect(isViewGroup).to.equal(false);
    });

    it('should return true if view type is equal Container', () => {
      const node = model.model.views[0].diagrams[0].view[0];
      node.$['xsi:type'] = AoeffViewType.Container;

      const isViewGroup = inputInterpreter.isViewGroup(node);

      expect(isViewGroup).to.equal(true);
    });
  });

  describe('isJunctionNode', () => {
    it('should return false if element is not junction node', () => {
      const element = model.model.elements[0].element[0];

      const isJunctionNode = inputInterpreter.isJunctionNode(element);

      expect(isJunctionNode).to.equal(false);
    });

    it('should return true if view type is equal OrJunction', () => {
      const element = model.model.elements[0].element[0];
      element.$['xsi:type'] = ElementType.OrJunction;
      const isJunctionNode = inputInterpreter.isJunctionNode(element);

      expect(isJunctionNode).to.equal(true);
    });

    it('should return true if view type is equal OrJunction', () => {
      const element = model.model.elements[0].element[0];
      element.$['xsi:type'] = ElementType.AndJunction;
      const isJunctionNode = inputInterpreter.isJunctionNode(element);

      expect(isJunctionNode).to.equal(true);
    });
  });
});
