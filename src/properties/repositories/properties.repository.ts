import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { propertiesByQueryAggregation } from '../aggregations/propertiesByQuery.aggregation';
import { propertiesSearchQueryAggregation } from '../aggregations/propertiesSearchQuery.aggregation';
import { propertiesGroupedByStateAggregation } from '../aggregations/propertiesGroupedByState.aggregation';
import { propertyPortfoliosAggregation } from '../aggregations/property-portfolios.aggregation';
import { propertyTypesAggregation } from '../aggregations/property-types.aggregation';
import { IProperty } from '../interfaces/properties.interface';
import { IPropertyPhoto } from '../interfaces/property-photos.interface';
import { IPropertyPortfolio } from '../interfaces/property-portfolio.interface';
import { IPropertyTypes } from '../interfaces/property-type.interface';
import { IPropertyUnit } from '../interfaces/property-unit.interface';
import * as mongoose from 'mongoose';
import { getPropertiesAggregation } from '../aggregations/properties.aggregation';
import { RelayRepositry } from 'src/graphql/relay.repository';
import { ConnectionArguments } from 'src/graphql/Connection';

@Injectable()
export class PropertiesRepository extends RelayRepositry<IProperty> {
  constructor(
    @InjectModel('property-portfolios')
    private readonly propertyPortfoliosModel: Model<IPropertyPortfolio>,
    @InjectModel('property-types')
    private readonly propertyTypesModel: Model<IPropertyTypes>,
    @InjectModel('properties')
    private readonly propertiesModel: Model<IProperty>,
    @InjectModel('property-photos')
    private readonly propertyPhotosModel: Model<IPropertyPhoto>,
    @InjectModel('property-units')
    private readonly propertyUnits: Model<IPropertyUnit>,
  ) {
    super(propertiesModel);
  }

  public async findByIdWithManagersEmails(_id: mongoose.Types.ObjectId) {
    const [response] = await this.propertiesModel.aggregate([
      {
        $match: { _id },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'managerIds',
          foreignField: '_id',
          as: 'managers',
        },
      },
    ]);
    return response;
  }

  public async getPropertiesGroupedByState() {
    return await this.propertiesModel.aggregate(
      propertiesGroupedByStateAggregation(),
      {
        allowDiskUse: true,
      },
    );
  }

  public async getUnits(propertyId: string) {
    return await this.propertyUnits.aggregate([
      { $match: { propertyId: new mongoose.Types.ObjectId(propertyId) } },
    ]);
  }

  public async updateUnit({ unitNumber, ...doc }: IPropertyUnit) {
    return await this.propertyUnits.updateOne(
      { unitNumber },
      { ...doc },
      { upsert: true },
    );
  }

  public async deletePropertyPhotosByKey(keys: string[], propertyId) {
    return await this.propertyPhotosModel.deleteMany({
      key: { $in: keys },
      propertyId,
    });
  }

  public async getPropertyPhotosByPropertyId(
    propertyId: string,
    limit?: number,
  ) {
    return await this.propertyPhotosModel
      .find({ propertyId })
      .limit(limit || 1);
  }

  public async getPropertyPhotoKeys(photoIds: string[], propertyId: string) {
    const [response] = await this.propertyPhotosModel.aggregate([
      {
        $match: {
          _id: { $in: photoIds.map((id) => new mongoose.Types.ObjectId(id)) },
          propertyId: new mongoose.Types.ObjectId(propertyId),
        },
      },
      {
        $group: {
          _id: null,
          keys: {
            $addToSet: '$key',
          },
        },
      },
    ]);
    return response;
  }

  public async getAggregatedPropertyById(id: string) {
    const properties = await this.propertiesModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      ...getPropertiesAggregation({ images: true, unitDetails: true }),
    ]);
    return properties.length ? properties[0] : null;
  }

  public async getAggregatedPropertiesByQuery(query: string) {
    return await this.propertiesModel.aggregate(
      propertiesByQueryAggregation({ query, images: true, unitDetails: true }),
    );
  }

  public async getAggregatedPropertiesByQueryConnection(
    args: ConnectionArguments,
    query: string,
  ) {
    return await this.findAll(
      args,
      propertiesByQueryAggregation({ query, images: true, unitDetails: true }),
    );
  }

  public async getPropertiesConnection(_args: ConnectionArguments) {
    return await this.propertiesModel.find().exec();
  }

  public async getProperties() {
    return await this.propertiesModel.find().exec();
  }

  public async getPropertiesByQuery(query: string) {
    return await this.propertiesModel.aggregate(
      propertiesSearchQueryAggregation(query),
    );
  }

  public async createPropertyPhotos(photos: IPropertyPhoto[]) {
    return await this.propertyPhotosModel.insertMany(photos);
  }

  public async getAggregatedProperties() {
    return await this.propertiesModel.aggregate(
      propertiesByQueryAggregation({ images: true }),
    );
  }

  public async editProperty(
    id: string,
    {
      portfolioId,
      typeId,
      managerIds,
    }: { portfolioId: string; typeId: string; managerIds: string[] },
  ) {
    return await this.propertiesModel.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        $set: { portfolioId, typeId, managerIds },
      },
    );
  }

  public async createProperty(doc: IProperty) {
    return await this.propertiesModel.create(doc);
  }

  public async createType(type: string) {
    return await this.propertyTypesModel.create({ name: type });
  }

  public async createPortfolio(portfolio: string) {
    return await this.propertyPortfoliosModel.create({ name: portfolio });
  }

  public async findPortfolioByQuery(query: string) {
    return await this.propertyPortfoliosModel
      .findOne({ name: query })
      .collation({
        locale: 'en',
        strength: 1,
      });
  }

  public async findTypeByQuery(query: string) {
    return await this.propertyTypesModel.findOne({ name: query }).collation({
      locale: 'en',
      strength: 1,
    });
  }

  public async getPortfoliosByQuery(query: string) {
    return await this.propertyPortfoliosModel
      .aggregate(propertyPortfoliosAggregation(query))
      .catch(() => []);
  }

  public async getTypesByQuery(query: string) {
    return await this.propertyTypesModel
      .aggregate(propertyTypesAggregation(query))
      .catch(() => []);
  }
}
