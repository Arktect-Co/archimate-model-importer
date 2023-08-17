import { NameModel } from '@lib/common/interfaces/aoeffModel/NameModel';
import { RelationshipModel } from '@lib/common/interfaces/aoeffModel/RelationshipModel';
import { ElementModel } from '@lib/common/interfaces/aoeffModel/ElementModel';
import { ItemModel } from '@lib/common/interfaces/aoeffModel/ItemModel';
import { ViewModel } from '@lib/common/interfaces/aoeffModel/ViewModel';

interface ModelSettings {
  identifier: string;
  xmlns: string;
  'xmlns:xsi': string;
  'xsi:schemaLocation': string;
}

type Relationships = Array<{ relationship: Array<RelationshipModel> }>;
type Elements = Array<{ element: Array<ElementModel> }>;
type Organizations = Array<{ item: Array<ItemModel> }>;
type Views = Array<{ diagrams: Array<{ view: Array<ViewModel> }> }>;

export interface Model {
  $: ModelSettings;
  name: NameModel;
  relationships: Relationships;
  elements: Elements;
  organizations: Organizations;
  views: Views;
}

export interface AoeffModel {
  model: Model;
}
