export interface Landscape {
  id?: string;
  text: string;
  isDirectory: boolean;
  children?: Array<Landscape>;
}
