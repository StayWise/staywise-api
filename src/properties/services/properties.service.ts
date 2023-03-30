import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { FileUpload } from "graphql-upload";
import config from "../../config";
import { ES3Buckets } from "src/aws/enums/s3Buckets.enum";
import { S3Service } from "src/aws/services/s3.service";
import { CreatePropertyDTO } from "../dtos/create-property.dto";
import { PropertiesRepository } from "../repositories/properties.repository";
import { IPropertyPhoto } from "../interfaces/property-photos.interface";
import * as Sharp from "sharp";
import { UpdateUnitDTO } from "../dtos/update-unit.dto";
import { ConnectionArguments } from "src/graphql/Connection";

@Injectable()
export class PropertiesService {
    constructor(
        private readonly propertiesRepo: PropertiesRepository,
        private readonly s3Service: S3Service
    ){}

    async create(files:FileUpload[], input:CreatePropertyDTO) {
        let type = await this.propertiesRepo.findTypeByQuery(input.type);
        if (!type) type = await this.propertiesRepo.createType(input.type);
       
        let portfolio = await this.propertiesRepo.findPortfolioByQuery(input.portfolio);
        if (!portfolio) portfolio = await this.propertiesRepo.createPortfolio(input.portfolio);

        const property = await this.propertiesRepo.createProperty({
            portfolioId: portfolio._id,
            typeId: type._id,
            address: input.address,
            units: input.units,
            managerIds: input.managerIds,
        })

        await this.addPropertyPhotos(files, property._id.toString());
        
        return property;
    }

    async deletePropertyPhotos(photoIds:string[], propertyId:string) {
        try {
            const { keys = [] } = await this.propertiesRepo.getPropertyPhotoKeys(photoIds, propertyId);
            const bucket = config.aws.s3.buckets[ES3Buckets.PROPERTY_PHOTOS];
            let deletedKeys = await Promise.all(keys.map(async (key:string) => {
                const response = await this.s3Service.deleteObject(bucket, key).catch(() => null);
                return !!response ? key : null; 
            }));
            deletedKeys = deletedKeys.filter((key) => !!key);
            await this.propertiesRepo.deletePropertyPhotosByKey(deletedKeys, propertyId);
        } catch {
            throw new InternalServerErrorException("Failed to Delete Photos");
        }
    }

    async addPropertyPhotos(files:FileUpload[], propertyId:string) {
        const bucket = config.aws.s3.buckets[ES3Buckets.PROPERTY_PHOTOS];
        const photosResponse = await Promise.all(files.map(async (file) => {
            const fileObject = await file; 
            const stream = fileObject.createReadStream();
            const sharpGraphicProccessor = Sharp();
            stream.pipe(sharpGraphicProccessor);
            const { writeStream, promise } = this.s3Service.uploadStreamAsPublicObject(bucket, fileObject);
            sharpGraphicProccessor.webp().pipe(writeStream);
            const upload = await promise.catch((e) => { console.log(e); return null; });
            if (!upload) return null; 
            return upload; 
        }))

        const photos = photosResponse.filter(e => !!e).map((uploadObject) : IPropertyPhoto => ({
            eTag: uploadObject.ETag,
            url: uploadObject.Location,
            key: uploadObject.Key,
            bucket: uploadObject.Bucket,
            propertyId: propertyId,
        }));
        
        await this.propertiesRepo.createPropertyPhotos(photos);
    }

    async getPropertiesConnection(args: ConnectionArguments) {
        return await this.propertiesRepo.getPropertiesConnection(args);
    }

    async getProperties() {
        return await this.propertiesRepo.getProperties();
    }

    async getUnits(propertyId:string) {
        return await this.propertiesRepo.getUnits(propertyId);
    }

    async updateUnit(input:UpdateUnitDTO) {
        return await this.propertiesRepo.updateUnit(input);
    }

    async getAggregatedPropertyById(id:string) {
        return await this.propertiesRepo.getAggregatedPropertyById(id)
    }   

    async getAggregatedPropertiesByQuery(query:string) {
        return this.propertiesRepo.getAggregatedPropertiesByQuery(query);
    }

    async getPropertiesByQuery(query:string) {
        return await this.propertiesRepo.getPropertiesByQuery(query);
    }

    async getPropertiesGroupedByState() {
        return await this.propertiesRepo.getPropertiesGroupedByState();
    }

    async getAggregatedProperties() {
        return this.propertiesRepo.getAggregatedProperties();
    }

    async getPropertyPortfolios(query:string) {
        return this.propertiesRepo.getPortfoliosByQuery(query);
    }

    async getPropertyTypes(query:string) {
        return this.propertiesRepo.getTypesByQuery(query);
    }
}