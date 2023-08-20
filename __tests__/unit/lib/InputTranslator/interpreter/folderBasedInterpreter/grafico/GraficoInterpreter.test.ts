import { GraficoInterpreter } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
import { Node, Relationship } from '@lib/common/interfaces/graficoModel';
import path from 'path';
import { expect } from 'chai';
import { ElementType } from '@lib/common/enums/elementType';

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
const relationship: Relationship = {
  'archimate:TriggeringRelationship': {
    $: {
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:archimate': 'http://www.archimatetool.com/archimate',
      id: 'fb81c5f0-efa0-43cd-bbce-85f86d78f319',
    },
    source: [
      {
        $: {
          'xsi:type': 'archimate:ApplicationComponent',
          href: 'ApplicationComponent_fdfa517d-8d14-4ce7-96c4-7dbab4002dbf.xml#fdfa517d-8d14-4ce7-96c4-7dbab4002dbf',
        },
      },
    ],
    target: [
      {
        $: {
          'xsi:type': 'archimate:ApplicationFunction',
          href: 'ApplicationFunction_dc730608-6513-4a77-b7bb-deb496d677c3.xml#dc730608-6513-4a77-b7bb-deb496d677c3',
        },
      },
    ],
  },
};

describe('GraficoInterpreter', () => {
  let inputInterpreter: GraficoInterpreter;
  const locationNode = node['archimate:Location'];
  const triggeringRelationship = relationship['archimate:TriggeringRelationship'];

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

    it('should return an empty array if property is not defined', () => {
      const propertyEntry = inputInterpreter.getPropertyEntry(undefined);

      expect(propertyEntry.length).to.equal(0);
      expect(propertyEntry).to.deep.equal([]);
    });
  });

  describe('getRelationshipId', () => {
    it('should return a relationship id', () => {
      const id = inputInterpreter.getRelationshipId(relationship);

      expect(id).to.equal(triggeringRelationship.$.id);
    });
  });

  describe('getRelationshipName', () => {
    it('should return a default relationship name if the name property is not defined', () => {
      const name = inputInterpreter.getRelationshipName(relationship);

      expect(name).to.equal('');
    });

    it('should return a relationship name', () => {
      const relationshipName = 'test';
      triggeringRelationship.$.name = relationshipName;
      const name = inputInterpreter.getRelationshipName(relationship);

      expect(name).to.equal(relationshipName);
    });
  });

  describe('getRelationshipSourceId', () => {
    it('should return a relationship source ID', () => {
      const id = inputInterpreter.getRelationshipSourceId(relationship);

      expect(id).to.equal('fdfa517d-8d14-4ce7-96c4-7dbab4002dbf');
    });
  });

  describe('getRelationshipTargetId', () => {
    it('should return a relationship source ID', () => {
      const id = inputInterpreter.getRelationshipTargetId(relationship);

      expect(id).to.equal('dc730608-6513-4a77-b7bb-deb496d677c3');
    });
  });

  describe('getRelationshipType', () => {
    it('should return a relationship type', () => {
      const type = inputInterpreter.getRelationshipType(relationship);

      expect(type).to.equal('TriggeringRelationship');
    });
  });

  describe('getAccessRelationshipDirection', () => {
    it('should return a default access relationship direction if "accesstype" is not defined', () => {
      const { source, target } = inputInterpreter.getAccessRelationshipDirection(relationship);

      expect(source).to.equal(false);
      expect(target).to.equal(true);
    });

    it('should return a relationship "1" access direction', () => {
      triggeringRelationship.$.accessType = '1';

      const { source, target } = inputInterpreter.getAccessRelationshipDirection(relationship);

      expect(source).to.equal(true);
      expect(target).to.equal(false);
    });

    it('should return a relationship "2" access direction', () => {
      triggeringRelationship.$.accessType = '2';

      const { source, target } = inputInterpreter.getAccessRelationshipDirection(relationship);

      expect(source).to.equal(false);
      expect(target).to.equal(false);
    });

    it('should return a relationship "3" access direction', () => {
      triggeringRelationship.$.accessType = '3';

      const { source, target } = inputInterpreter.getAccessRelationshipDirection(relationship);

      expect(source).to.equal(true);
      expect(target).to.equal(true);
    });
  });

  describe('getAssociationRelationshipIsDirected', () => {
    it('should return true if association relationship is directed', () => {
      triggeringRelationship.$.directed = 'true';

      const isDirected = inputInterpreter.getAssociationRelationshipIsDirected(relationship);
      expect(isDirected).to.equal(true);
    });
  });
});
