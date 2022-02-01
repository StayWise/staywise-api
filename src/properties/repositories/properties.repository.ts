import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { propertiesAggregation } from "../aggregations/properties.aggregation";
import { propertiesByQueryAggregation } from "../aggregations/propertiesByQuery.aggregation";
import { propertiesGroupedByStateAggregation } from "../aggregations/propertiesGroupedByState.aggregation";
import { propertyPortfoliosAggregation } from "../aggregations/property-portfolios.aggregation";
import { propertyTypesAggregation } from "../aggregations/property-types.aggregation";
import { IProperty } from "../interfaces/properties.interface";
import { IPropertyPhoto } from "../interfaces/property-photos.interface";
import { IPropertyPortfolio } from "../interfaces/property-portfolio.interface";
import { IPropertyTypes } from "../interfaces/property-type.interface";

@Injectable()
export class PropertiesRepository {
    constructor(
        @InjectModel('property-portfolios')
        private readonly propertyPortfoliosModel: Model<IPropertyPortfolio>,
        @InjectModel('property-types')
        private readonly propertyTypesModel: Model<IPropertyTypes>,
        @InjectModel("properties")
        private readonly propertiesModel: Model<IProperty>,
        @InjectModel("property-photos")
        private readonly propertyPhotosModel: Model<IPropertyPhoto>
    ){}

    public async getPropertiesGroupedByState() {
        return await this.propertiesModel.aggregate(propertiesGroupedByStateAggregation(), { 
            allowDiskUse: true
        });
    }

    public async getPropertiesByQuery(query:string) {
        return await this.propertiesModel.aggregate(propertiesByQueryAggregation(query));
    }
        
    public async createPropertyPhotos(photos:IPropertyPhoto[]) {
        return await this.propertyPhotosModel.insertMany(photos);
    }

    public async getAggregatedProperties() {
        return await this.propertiesModel.aggregate(propertiesAggregation());
    }

    public async createProperty(doc:IProperty) {
        return await this.propertiesModel.create(doc);
    }

    public async createType(type:string) {
        return await this.propertyTypesModel.create({ name: type });
    }

    public async createPortfolio(portfolio:string){
        return await this.propertyPortfoliosModel.create({ name: portfolio })
    }

    public async findPortfolioByQuery(query:string) {
        return await this.propertyPortfoliosModel.findOne({ name: query }).collation({
            locale: "en", strength: 1,
        });
    }

    public async findTypeByQuery(query:string) {
        return await this.propertyTypesModel.findOne({ name: query }).collation({
            locale: "en", strength: 1,
        });
    }

    public async getPortfoliosByQuery(query:string) {
        return await this.propertyPortfoliosModel
            .aggregate(propertyPortfoliosAggregation(query))
            .catch(() => []);
    }

    public async getTypesByQuery(query:string) {
        return await this.propertyTypesModel
            .aggregate(propertyTypesAggregation(query))
            .catch(() => []);
    }
}