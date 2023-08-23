import xml2js from 'xml2js';
import { AoeffModel } from '@lib/common/interfaces/aoeffModel';
import { ArchiModel } from '@lib/common/interfaces/archiModel/ArchiModel';

/**
 * Returns a json xml template from the xml file buffer
 * @param fileString File buffer
 */
export function parseXml(fileString: Buffer) {
  return new Promise<AoeffModel | ArchiModel>((resolve, reject): void => {
    const parser = new xml2js.Parser({ explicitArray: true });

    parser.parseString(fileString, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}
