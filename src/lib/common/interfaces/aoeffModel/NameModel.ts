interface LanguageModel {
  'xml:lang': string;
  identifierRef?: string;
}
export interface NameModel {
  _: string;
  $: LanguageModel;
}
