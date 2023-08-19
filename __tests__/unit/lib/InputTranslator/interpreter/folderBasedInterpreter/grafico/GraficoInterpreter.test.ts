import { GraficoInterpreter } from '@lib/processors/InputTranslator/interpreter/folderBasedInterpreter/grafico/GraficoInterpreter';
import { Node } from '@lib/common/interfaces/graficoModel';
import path from 'path';
import { expect } from 'chai';

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
});
