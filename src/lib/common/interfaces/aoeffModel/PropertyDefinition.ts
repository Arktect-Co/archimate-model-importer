interface PropertyDefinitionIdentification {
  identifier: string;
  type: string;
}

export interface PropertyDefinition {
  $: PropertyDefinitionIdentification;
  name: Array<string>;
}
