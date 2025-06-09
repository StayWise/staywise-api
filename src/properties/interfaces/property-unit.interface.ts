import { EUnitStatus } from "../enums/unit-status.enum";

export interface IPropertyUnit {
  bathrooms: number;
  bedrooms: number;
  propertyId: string;
  status: EUnitStatus;
  unitNumber: number;
}
