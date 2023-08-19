import { GraficoInterpreter } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
import { Node } from '@lib/common/interfaces/graficoModel';
import path from 'path';
import { expect } from 'chai';
import { ElementType } from '../../../../../../../src/lib/common/enums/elementType';

const UNKNOWN = 'Unknown Name';
const node: Node = {
  'archimate:Location': {
    $: {
      id: '30301dbd-300b-4657-b633-44ddea33d1ec',
      name: 'Location',
      'xmlns:archimate': 'http://www.archimatetool.com/archimate',
    },
  },
  'archimate:Junction': {
    $: {
      'xmlns:archimate': 'http://www.archimatetool.com/archimate',
      name: 'Junction',
      id: '2ab6d200-8f6a-4185-b0a4-4f6828107951',
      type: 'or',
    },
  },
};

describe('GraficoInterpreter', () => {
  let inputInterpreter: GraficoInterpreter;
  const locationNode = node['archimate:Location'];

  before(() => {
    const rootPath = __dirname.split('\\').slice(0, -5).join('\\');
    const filePath = path.join(rootPath, '/models/grafico');

    inputInterpreter = new GraficoInterpreter(filePath);
  });

  describe('getModelId', () => {
    it('should return a model ID', () => {
      const id = inputInterpreter.getModelId();

      expect(id).to.equal('');
    });
  });

  describe('getNodeId', () => {
    it('should return a node ID', () => {
      const id = inputInterpreter.getNodeId(node);

      expect(id).to.equal(locationNode.$.id);
    });
  });

  describe('getNodeName', () => {
    it('should return a node name', () => {
      const name = inputInterpreter.getNodeName(node);

      expect(name).to.equal(locationNode.$.name);
    });

    it('should return a default node name if the name property is not defined', () => {
      const name = inputInterpreter.getNodeName({
        firstNode: {
          $: {
            id: locationNode.$.id,
            name: undefined,
            'xmlns:archimate': locationNode.$['xmlns:archimate'],
          },
        },
      });

      expect(name).to.equal(UNKNOWN);
    });
  });

  describe('getNodeType', () => {
    it('should return a node type', () => {
      const type = inputInterpreter.getNodeType(node);

      expect(type).to.equal('Location');
    });
  });

  describe('getNodeDocumentation', () => {
    it('should return null if the documentation property is not defined', () => {
      const documentation = inputInterpreter.getNodeDocumentation(node);

      expect(documentation).to.equal(null);
    });

    it('shoul return a node documentation', () => {
      const locationDocumentation = 'Location documentation';
      locationNode.$.documentation = locationDocumentation;

      const documentation = inputInterpreter.getNodeDocumentation(node);

      expect(documentation).to.equal(locationDocumentation);
    });
  });

  describe('getNodeJunctionType', () => {
    it('should return a AndJunctionType', () => {
      const type = inputInterpreter.getNodeJunctionType(node);

      expect(type).to.equal(ElementType.AndJunction);
    });

    it('should return a OrJunction type', () => {
      const type = inputInterpreter.getNodeJunctionType({
        'archimate:Junction': {
          ...node['archimate:Junction'],
        },
      });

      expect(type).to.equal(ElementType.OrJunction);
    });
  });

  describe('getNodeProperties', () => {
    it('should return an empty array if the properties is not defined', () => {
      const properties = inputInterpreter.getNodeProperties(node);

      expect(properties.length).to.equal(0);
      expect(properties).to.deep.equal([]);
    });

    it('should return a properties', () => {
      const locationProperties = [{ $: { key: 'Has Owner', value: 'true' } }];
      locationNode.properties = locationProperties;

      const properties = inputInterpreter.getNodeProperties(node);

      expect(properties.length).to.equal(1);
      expect(properties).to.deep.equal(locationProperties);
    });
  });

  describe('getPropertyEntry', () => {
    it('should return a property entry', () => {
      const property = { $: { key: 'Has Owner', value: 'true' } };

      const propertyEntry = inputInterpreter.getPropertyEntry(property);

      expect(propertyEntry.length).to.equal(2);
      expect(propertyEntry).to.deep.equal([property.$.key, property.$.value]);
    });
  });
});
