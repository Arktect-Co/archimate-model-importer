import fs from 'fs';
import path from 'path';
import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
import { parseXml } from '@lib/common/utils/parseXml';
import { AoeffModel } from '@lib/common/interfaces/aoeffModel';
import { expect } from 'chai';
import { before } from 'mocha';

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
});
