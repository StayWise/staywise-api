import { IAddress } from "src/properties/interfaces/address.interface";

export interface ITenantRequest {
    address: IAddress,
    firstName: string; 
    lastName: string; 
    phone: string;
    requiredBy: Date,
    additionalInfo?: string; 
    email: string; 
    propertyId: string; 
}