import { Args, Query, Resolver } from "@nestjs/graphql";
import { AddressesModel } from "./models/addresses.model";
import { AddressSegmentsModel } from "./models/addressSegments.model";
import { GoogleMapsService } from "./services/places.service";

@Resolver()
export class GoogleResolver {
    constructor(
        private readonly googleMapsService: GoogleMapsService
    ) {}

    @Query(() => AddressSegmentsModel, { nullable: true })
    public async getAddressGeocode(@Args("query") query:string) : Promise<AddressSegmentsModel | null> {
        return await this.googleMapsService.getAddressGeocode(query);
    }

    @Query(() => [ AddressesModel ])
    public async getAddresses(@Args("query") query:string) : Promise<AddressesModel[]> {
        return await this.googleMapsService.getAddresses(query);
    }
}