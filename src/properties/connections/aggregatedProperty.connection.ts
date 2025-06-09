import { ObjectType } from "@nestjs/graphql";
import { Connection } from "src/graphql/Connection";
import { AggregatedPropertyModel } from "../models/aggregated-property.model";

@ObjectType()
export class AggregatedPropertyConnection extends Connection<AggregatedPropertyModel>(
  AggregatedPropertyModel
) {}
