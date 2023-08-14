import fs from 'fs';
import path from 'path';
import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
import { parseXml } from '@lib/common/utils/parseXml';
import { AoeffModel } from '@lib/common/interfaces/aoeffModel';
import { expect } from 'chai';
import { before } from 'mocha';
import { RelationshipAccessType } from '../../../../../../../src/lib/common/enums/relationshipAccessType';

const UNKNOWN = 'Unknown Name';

const getAoeffModel = async (filePath: string): Promise<AoeffModel> => {
  const fileString = fs.readFileSync(filePath);

  return <AoeffModel>await parseXml(fileString);
};

describe('AoeffInterpreter', async () => {
  let inputInterpreter: AoeffInterpreter;
  let model: AoeffModel;

  before(async () => {
    const rootPath = __dirname.split('\\').slice(0, -5).join('\\');
    const filePath = path.join(rootPath, '/models/aoeff_3_1.xml');
    model = await getAoeffModel(filePath);
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
  });
});
