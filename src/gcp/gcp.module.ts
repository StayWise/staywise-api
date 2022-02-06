import { Module } from "@nestjs/common";
import { GoogleResolver } from "./google.resolver";
import { GoogleMapsService } from "./services/places.service";

@Module({
    providers: [ GoogleMapsService, GoogleResolver ],
    exports: [ GoogleMapsService ]
})
export class GCPModule {};