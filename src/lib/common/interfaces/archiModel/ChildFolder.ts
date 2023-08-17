import { IdentificationModel } from '@lib/common/interfaces/archiModel/BaseIdentification';
import { ChildElement } from '@lib/common/interfaces/archiModel/ChildElement';

export interface ChildFolder {
  $: IdentificationModel;
  element: Array<ChildElement>;
}
