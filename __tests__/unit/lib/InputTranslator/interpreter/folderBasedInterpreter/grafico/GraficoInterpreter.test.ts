import { GraficoInterpreter } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
import { Node, Relationship, View } from '@lib/common/interfaces/graficoModel';
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
const view: View = {
  'archimate:ArchimateDiagramModel': {
    $: {
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:archimate': 'http://www.archimatetool.com/archimate',
      name: 'Relationships',
      id: '9a578be1-0cde-4e09-91e6-f0742708a0da',
    },
    children: [
      {
        $: {
          'xsi:type': 'archimate:DiagramModelArchimateObject',
          id: 'a7134b7a-e727-4e5f-a5d7-a7ecb998fc12',
        },
        sourceConnections: [
          {
            $: {
              'xsi:type': 'archimate:DiagramModelArchimateConnection',
              id: '20e64c21-ebae-4c8d-a989-c24f0318e626',
              source: 'a7134b7a-e727-4e5f-a5d7-a7ecb998fc12',
              target: 'c0d824bc-233b-472b-907b-0e324a82ffae',
            },
            archimateRelationship: [
              {
                $: {
                  'xsi:type': 'archimate:FlowRelationship',
                  href: 'FlowRelationship_e65bf3dd-9978-4a8f-8a14-847e9b5f074b.xml#e65bf3dd-9978-4a8f-8a14-847e9b5f074b',
                },
              },
            ],
          },
        ],
        bounds: [{ $: { x: '504', y: '756', width: '120', height: '55' } }],
        archimateElement: [
          {
            $: {
              'xsi:type': 'archimate:Node',
              href: 'Node_f935291b-77c1-4a3a-851e-1d74fbeb658c.xml#f935291b-77c1-4a3a-851e-1d74fbeb658c',
            },
          },
        ],
      },
    ],
  },
};

describe('GraficoInterpreter', () => {
  let inputInterpreter: GraficoInterpreter;
  let rootPath: string;
  const locationNode = node['archimate:Location'];
  const triggeringRelationship = relationship['archimate:TriggeringRelationship'];
  const diagramModel = view['archimate:ArchimateDiagramModel'];

  before(() => {
    rootPath = __dirname.split('\\').slice(0, -5).join('\\');
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

    it('should return false if association relationship is not directed', () => {
      triggeringRelationship.$.directed = 'false';

      const isDirected = inputInterpreter.getAssociationRelationshipIsDirected(relationship);
      expect(isDirected).to.equal(false);
    });

    it('should return false if "directed" property of relationship is undefined', () => {
      triggeringRelationship.$.directed = undefined;

      const isDirected = inputInterpreter.getAssociationRelationshipIsDirected(relationship);
      expect(isDirected).to.equal(false);
    });
  });

  describe('getFolderName', () => {
    it('should return a folder name', () => {
      const name = inputInterpreter.getFolderName(
        path.join(rootPath, '/models/grafico/model/diagrams'),
      );

      expect(name).to.equal('Views');
    });

    it("should return a default folder name if the folder doesn't exist", () => {
      const name = inputInterpreter.getFolderName(
        path.join(rootPath, '/models/grafico/model/test'),
      );

      expect(name).to.equal(UNKNOWN);
    });
  });

  describe('getSubFolders', () => {
    it('should return a sub folders', () => {
      const folders = inputInterpreter.getSubFolders(
        path.join(rootPath, '/models/grafico/model/diagrams'),
      );

      expect(folders.length).to.equal(1);
      expect(folders[0]).to.equal(
        path.join(rootPath, '/models/grafico/model/diagrams/52f6f298-6fca-4971-a604-ce1e7938115f'),
      );
    });

    it('should return an empty array if the folder does not exist', () => {
      const folders = inputInterpreter.getSubFolders(
        path.join(rootPath, '/models/grafico/model/test'),
      );

      expect(folders.length).to.equal(0);
      expect(folders).to.deep.equal([]);
    });
  });

  describe('getFolderViews', () => {
    it('should return a folder views', () => {
      const views = inputInterpreter.getFolderViews(
        path.join(rootPath, '/models/grafico/model/diagrams/52f6f298-6fca-4971-a604-ce1e7938115f'),
      );

      expect(views.length).to.equal(4);
    });

    it('should return an empty array if the folder does not exist', () => {
      const views = inputInterpreter.getFolderViews(
        path.join(rootPath, '/models/grafico/model/test'),
      );

      expect(views.length).to.equal(0);
      expect(views).to.deep.equal([]);
    });
  });

  describe('getViewElements', () => {
    it('should return a view elements', () => {
      const views = inputInterpreter.getViewElements(view);

      expect(views.length).to.equal(1);
      expect(views).to.deep.equal(diagramModel.children);
    });
  });

  describe('getViewId', () => {
    it('should return a view id', () => {
      const id = inputInterpreter.getViewId(view);

      expect(id).to.equal(diagramModel.$.id);
    });
  });
});
