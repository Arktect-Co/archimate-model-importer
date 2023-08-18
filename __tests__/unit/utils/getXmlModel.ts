import fs from 'fs';
import { parseXml } from '@lib/common/utils/parseXml';

export const getXmlModel = async <T>(filePath: string): Promise<T> => {
  const fileString = fs.readFileSync(filePath);

  return <T>await parseXml(fileString);
};
