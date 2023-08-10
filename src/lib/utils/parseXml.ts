import xml2js from 'xml2js';

interface ArchimateXmlModel {
  'xmlns:xsi': string;
  'xmlns:archimate': string;
  name: string;
  id: string;
  version: string;
}

interface AoffXmlModel {
  identifier: string;
  xmlns: string;
  'xmlns:xsi': string;
  'xsi:schemaLocation': string;
}

export interface ArchimateModel {
  'archimate:model': {
    $: ArchimateXmlModel;
  };
}

export interface AoffModel {
  model: {
    $: AoffXmlModel;
  };
}

/**
 * Returns a json xml template from the xml file buffer
 * @param fileString File buffer
 */
export async function parseXml(fileString: Buffer) {
  return new Promise<AoffModel | ArchimateModel>((resolve, reject): void => {
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
