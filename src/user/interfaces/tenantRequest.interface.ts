import { IAddress } from 'src/properties/interfaces/address.interface';
import { EMeetFormStatus } from '../enums/meet-form-status.enum';

export interface ITenantRequest {
  address: IAddress;
  firstName: string;
  lastName: string;
  phone: string;
  requiredBy: Date;
  additionalInfo?: string;
  email: string;
  propertyId: string;
  status: EMeetFormStatus;
}
