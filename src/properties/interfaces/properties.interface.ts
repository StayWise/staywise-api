import { IAddress } from "./address.interface";

export interface IProperty {
    portfolioId: string,
    typeId: string,
    units: number; 
    address: IAddress,
    managerIds: string[],
}