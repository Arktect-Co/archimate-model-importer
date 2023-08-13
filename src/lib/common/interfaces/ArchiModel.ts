interface ArchiXmlModel {
  'xmlns:xsi': string;
  'xmlns:archimate': string;
  name: string;
  id: string;
  version: string;
}

export interface ArchiModel {
  'archimate:model': {
    $: ArchiXmlModel;
  };
}
