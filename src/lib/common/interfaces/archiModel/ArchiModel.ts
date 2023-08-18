import { Folder } from '@lib/common/interfaces/archiModel/Folder';

interface ArchiXmlModel {
  'xmlns:xsi': string;
  'xmlns:archimate': string;
  name: string;
  id: string;
  version: string;
}

export interface Model {
  $: ArchiXmlModel;
  folder: Array<Folder>;
}

export interface ArchiModel {
  'archimate:model': Model;
}
