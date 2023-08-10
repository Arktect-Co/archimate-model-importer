import xml2js from 'xml2js';
import { AoeffModel } from '@lib/interfaces/AoeffModel';
import { ArchiModel } from '@lib/interfaces/ArchiModel';

/**
 * Returns a json xml template from the xml file buffer
 * @param fileString File buffer
 */
export async function parseXml(fileString: Buffer) {
  return new Promise<AoeffModel | ArchiModel>((resolve, reject): void => {
    let parser = new xml2js.Parser({ explicitArray: true });

    parser.parseString(fileString, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}
