interface AoeffXmlModel {
  identifier: string;
  xmlns: string;
  'xmlns:xsi': string;
  'xsi:schemaLocation': string;
}

export interface AoeffModel {
  model: {
    $: AoeffXmlModel;
  };
}
