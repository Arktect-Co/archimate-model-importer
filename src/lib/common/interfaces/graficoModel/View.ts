import { ViewNode } from '@lib/common/interfaces/graficoModel/ViewNode';

interface ViewSetting {
  'xmlns:xsi': string;
  'xmlns:archimate': string;
  name: string;
  id: string;
}

export interface View {
  $: ViewSetting;
  children: Array<ViewNode>;
}
