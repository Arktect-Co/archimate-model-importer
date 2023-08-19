import { GraficoInterpreter } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
import { Node } from '@lib/common/interfaces/graficoModel';
import path from 'path';
import { expect } from 'chai';

const UNKNOWN = 'Unknown Name';

describe('GraficoInterpreter', () => {
  let inputInterpreter: GraficoInterpreter;
  const node: Node = {
    firstNode: {
      $: {
        id: '30301dbd-300b-4657-b633-44ddea33d1ec',
        name: 'FirstNode',
        'xmlns:archimate': 'http://www.archimatetool.com/archimate',
      },
    },
  };
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

      expect(id).to.equal(node['firstNode'].$.id);
    });
  });

  describe('getNodeName', () => {
    it('should return a node name', () => {
      const name = inputInterpreter.getNodeName(node);

      expect(name).to.equal(node['firstNode'].$.name);
    });

    it('should return a default node name if the name property is not defined', () => {
      const name = inputInterpreter.getNodeName({
        firstNode: {
          $: {
            id: node['firstNode'].$.id,
            name: undefined,
            'xmlns:archimate': node['firstNode'].$['xmlns:archimate'],
          },
        },
      });

      expect(name).to.equal(UNKNOWN);
    });
  });
});
