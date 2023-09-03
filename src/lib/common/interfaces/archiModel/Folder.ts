import { IdentificationModel } from '@lib/common/interfaces/archiModel/BaseIdentification';
import { Element } from '@lib/common/interfaces/archiModel/Element';
import { ChildFolder } from '@lib/common/interfaces/archiModel/ChildFolder';

export interface Folder {
  $: IdentificationModel;
  folder?: Array<ChildFolder>;
  element?: Array<Element>;
}
