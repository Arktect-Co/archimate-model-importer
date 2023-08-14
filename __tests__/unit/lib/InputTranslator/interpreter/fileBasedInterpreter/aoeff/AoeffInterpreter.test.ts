import fs from 'fs';
import path from 'path';
import { AoeffInterpreter } from '@lib/processors/InputTranslator/interpreter/fileBasedInterpreter/aoeff/AoeffInterpreter';
import { parseXml } from '@lib/common/utils/parseXml';
import { AoeffModel } from '@lib/common/interfaces/aoeffModel';
import { expect } from 'chai';
import { before } from 'mocha';

const getAoeffModel = async (filePath: string): Promise<AoeffModel> => {
  const fileString = fs.readFileSync(filePath);

  return <AoeffModel>await parseXml(fileString);
};

describe('AoeffInterpreter', async () => {
  let inputInterpreter: AoeffInterpreter;

  before(async () => {
    const rootPath = __dirname.split('\\').slice(0, -5).join('\\');
    const filePath = path.join(rootPath, '/models/aoeff_3_1.xml');
    const model = await getAoeffModel(filePath);
    inputInterpreter = new AoeffInterpreter(model);
  });

  describe('getModelId', () => {
    it('should return a model Id', () => {
      const id = inputInterpreter.getModelId();

      expect(id).to.equal('id-799298e6-cefa-47aa-986f-1ab9d5c10d21');
    });
  });
});
