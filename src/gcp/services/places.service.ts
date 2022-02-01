import { Injectable } from "@nestjs/common";
import config from "../../config";
import axios from "axios";
import { AddressesModel } from "../models/addresses.model";
import { getAddressObject } from "../utils/parse-address-components";

const placesAPIBaseURL = config?.google?.placesAPI?.baseURL; 
const placesAPIapiKey = config?.google?.placesAPI?.apiKey; 

const geocodeAPIBaseURL = config?.google?.geocodeAPI?.baseURL; 
const geocodeAPIapiKey = config?.google?.geocodeAPI?.apiKey; 

@Injectable()
export class GoogleMapsService {
    constructor() {}

    /** Get City, State, Country, Home Number, and Street by Place ID.
     * 
     * @param placeId address google place_id
     * @returns Address Object of type AddressSegmentsModel
     */

    public async getAddressGeocode(placeId:string) {
        const url = `${geocodeAPIBaseURL}/json?place_id=${placeId}&key=${geocodeAPIapiKey}`;

        const results:any =  await axios.get(url).catch(e => {
            console.log(e);
            return null;
        });

        if (!results) return null;

        const components = results?.data?.results[0]?.address_components;
        const addressObject = getAddressObject(components);
        return addressObject;
    }

    /** Autocompletes Addresses From Search Query
     *  @param query Address Search Query
     *  @returns Array of Addresses of type AddressesModel (Max 10)
     */

    public async getAddresses(query:string) : Promise<AddressesModel[]> {
        const url = `${placesAPIBaseURL}/autocomplete/json?key=${placesAPIapiKey}&input=${query}&types=address`;

        const results:any =  await axios.get(url).catch(e => {
            console.log(e);
            return {};
        });
        const addresses = results?.data?.predictions || [];
        return addresses; 
    }
}
