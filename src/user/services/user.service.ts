import { Injectable } from "@nestjs/common";
import { GoogleMapsService } from "src/gcp/services/places.service";
import { PropertiesRepository } from "src/properties/repositories/properties.repository";
import { SendgridService } from "src/sendgrid/services/sendgrid.service";
import { NewTenantRequestFormDTO } from "../dtos/newTenantRequestForm.dto";
import { IUser } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly placesService: GoogleMapsService,
        private readonly sendGridService: SendgridService,
        private readonly propertiesRepository: PropertiesRepository,
    ) {}

    async createNewTenantRequest(input:NewTenantRequestFormDTO) {
        const { firstName, lastName, email, phone, additionalInfo, requiredBy, address, propertyId, propertyAddress } = input;
        const [ matchedAddress ] = await this.placesService.getAddresses(address);
        let geocode = {};
        if (matchedAddress && matchedAddress.place_id) {
            geocode = await this.placesService.getAddressGeocode(matchedAddress.place_id);
        }
        
        const request = await this.userRepo.createTenantRequest({
            firstName, 
            lastName,
            email, 
            additionalInfo, 
            requiredBy: new Date(requiredBy), 
            phone: String(phone),
            address: {
                description: address,
                ...geocode
            },
            propertyId
        }).catch((e) => { console.log(e); return null; })

        if (request) {
            const [ photo ] = await this.propertiesRepository.getPropertyPhotosByPropertyId(propertyId, 1);
            await this.sendGridService.sendMeetFormConfirmation({ 
                to: email,
                address: propertyAddress,
                name: firstName,
                url: photo?.url || "",
            }).catch((e) => console.log(e));
        }

        return request; 
    }

    async getRentalRequests() {
        return await this.userRepo.getRentalRequests();
    }

    async create(doc:IUser) {
        return await this.userRepo.create({ ...doc });
    }

    async getAdmins() {
        return await this.userRepo.getAggregatedAdmins();
    }

    async findByEmail(email:string) {
        return await this.userRepo.findByEmail(email);
    }

    async updateById(_id:string, fields:IUser) {
        return await this.userRepo.updateById(_id, fields);
    }

    async getManagers() {
        return await this.userRepo.getManagers();
    }
}