import { NameModel } from '@lib/common/interfaces/aoeffModel/NameModel';

interface PropertyDefinition {
  propertyDefinitionRef: string;
}

export interface Property {
  $: PropertyDefinition;
  value: NameModel;
}

interface ElementIdentification {
  identifier: string;
  'xsi:type': string;
}

type properties = Array<{ property: Array<Property> }>;

export interface ElementModel {
  $: ElementIdentification;
  name: Array<string | NameModel>;
  documentation?: Array<NameModel>;
  properties?: properties;
}
