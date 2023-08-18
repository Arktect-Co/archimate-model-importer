import { IdentificationModel } from '@lib/common/interfaces/archiModel/BaseIdentification';

interface PropertySetting {
  key: string;
  value: string;
}

export interface Property {
  $: PropertySetting;
}

export interface Element {
  $: IdentificationModel;
  documentation: Array<string>;
  property: Array<Property>;
}
