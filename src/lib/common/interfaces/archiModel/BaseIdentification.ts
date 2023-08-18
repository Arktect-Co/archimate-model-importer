export interface IdentificationModel {
  'xsi:type'?: string;
  id: string;
  name?: string;
  type: string;
  source?: string;
  target?: string;
  accessType: string;
  directed?: string | boolean;
  archimateElement?: string;
  archimateRelationship?: string;
}
