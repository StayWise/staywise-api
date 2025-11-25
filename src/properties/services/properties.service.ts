import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { FileUpload } from "graphql-upload/processRequest.mjs";
import { CloudinaryService } from "src/cloudinary/services/cloudinary.service";
import { ConnectionArguments } from "src/graphql/Connection";
import { CreatePropertyDTO } from "../dtos/create-property.dto";
import { EditPropertyDTO } from "../dtos/edit-property.dto";
import { UpdateUnitDTO } from "../dtos/update-unit.dto";
import { IPropertyPhoto } from "../interfaces/property-photos.interface";
import { PropertiesRepository } from "../repositories/properties.repository";

@Injectable()
export class PropertiesService {
  constructor(
    private readonly propertiesRepo: PropertiesRepository,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async create(files: FileUpload[], input: CreatePropertyDTO) {
    let type = await this.propertiesRepo.findTypeByQuery(input.type);
    if (!type) type = await this.propertiesRepo.createType(input.type);

    let portfolio = await this.propertiesRepo.findPortfolioByQuery(
      input.portfolio
    );
    if (!portfolio)
      portfolio = await this.propertiesRepo.createPortfolio(input.portfolio);

    const property = await this.propertiesRepo.createProperty({
      portfolioId: portfolio._id,
      typeId: type._id,
      address: input.address,
      units: input.units,
      managerIds: input.managerIds
    });

    await this.addPropertyPhotos(files, property._id.toString());

    return property;
  }

  async edit(input: EditPropertyDTO) {
    let type = await this.propertiesRepo.findTypeByQuery(input.type);
    if (!type) type = await this.propertiesRepo.createType(input.type);

    let portfolio = await this.propertiesRepo.findPortfolioByQuery(
      input.portfolio
    );
    if (!portfolio)
      portfolio = await this.propertiesRepo.createPortfolio(input.portfolio);

    const property = await this.propertiesRepo.editProperty(input.id, {
      portfolioId: portfolio._id,
      typeId: type._id,
      managerIds: input.managerIds
    });

    return property;
  }

  async deletePropertyPhotos(photoIds: string[], propertyId: string) {
    try {
      const photos = await this.propertiesRepo.getPropertyPhotosByPropertyId(
        propertyId
      );

      await Promise.all(
        photos.map(async (photo: any) => {
          if (photoIds.includes(photo._id.toString())) {
            await this.cloudinaryService
              .deleteFile(photo.publicId)
              .catch(() => null);
          }
        })
      );

      await this.propertiesRepo.deletePropertyPhotosById(photoIds, propertyId);
    } catch {
      throw new InternalServerErrorException("Failed to Delete Photos");
    }
  }

  async addPropertyPhotos(files: FileUpload[], propertyId: string) {
    const photosResponse = await Promise.all(
      files.map(async (file) => {
        const fileObject = await file;
        const upload = await this.cloudinaryService
          .uploadStream(fileObject, "properties")
          .catch((e) => {
            console.log(e);
            return null;
          });
        return upload;
      })
    );

    const photos = photosResponse
      .filter((e) => !!e)
      .map(
        (uploadObject): IPropertyPhoto => ({
          publicId: uploadObject.publicId,
          url: uploadObject.secureUrl,
          propertyId: propertyId
        })
      );

    await this.propertiesRepo.createPropertyPhotos(photos);
  }

  async getPropertiesConnection(args: ConnectionArguments) {
    return await this.propertiesRepo.getPropertiesConnection(args);
  }

  async getProperties() {
    return await this.propertiesRepo.getProperties();
  }

  async getUnits(propertyId: string) {
    return await this.propertiesRepo.getUnits(propertyId);
  }

  async updateUnit(input: UpdateUnitDTO) {
    return await this.propertiesRepo.updateUnit(input);
  }

  async getAggregatedPropertyById(id: string) {
    return await this.propertiesRepo.getAggregatedPropertyById(id);
  }

  async getAggregatedPropertiesByQuery(query: string) {
    return this.propertiesRepo.getAggregatedPropertiesByQuery(query);
  }

  async getPropertiesByQuery(query: string) {
    return await this.propertiesRepo.getPropertiesByQuery(query);
  }

  async getPropertiesGroupedByState() {
    return await this.propertiesRepo.getPropertiesGroupedByState();
  }

  async getAggregatedProperties() {
    return this.propertiesRepo.getAggregatedProperties();
  }

  async getPropertyPortfolios(query: string) {
    return this.propertiesRepo.getPortfoliosByQuery(query);
  }

  async getPropertyTypes(query: string) {
    return this.propertiesRepo.getTypesByQuery(query);
  }
}
