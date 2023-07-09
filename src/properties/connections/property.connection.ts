import { ObjectType } from '@nestjs/graphql';
import { Connection } from 'src/graphql/Connection';
import { PropertyModel } from '../models/property.model';

@ObjectType()
export class PropertyConnection extends Connection<PropertyModel>(
  PropertyModel,
) {}
