import { Type } from "@nestjs/common";
import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { Connection as RelayConnection, Edge as RelayEdge, PageInfo as RelayPageInfo } from "graphql-relay";

export function Connection<GraphQLObject>(GenericClass?: Type<GraphQLObject>) : any {
    @ObjectType(`${GenericClass.name}Edge`, { isAbstract: true })
    abstract class Edge<GraphQLObject> implements RelayEdge<GraphQLObject> {
        @Field(() => GenericClass, { nullable: false })
        node: GraphQLObject
    
        @Field(() => String, { nullable: true })
        cursor: string | null
    }

    @ObjectType(`${GenericClass.name}PageInfo`, { isAbstract: true })
    class PageInfo {
        @Field(() => Number, { nullable: false })
        skip: number;

        @Field(() => Number, { nullable: true })
        limit: number | null;

        @Field(() => Number, { nullable: false })
        count: number;
    }

    @ObjectType({ isAbstract: true })
    abstract class IConnection implements Omit<RelayConnection<GraphQLObject>, "pageInfo"> {
        @Field(() => [ Edge ], { nullable: false })
        edges: Array<RelayEdge<GraphQLObject>>

        @Field(() => PageInfo, { nullable: false })
        page: PageInfo;
    }

  return IConnection;
}

@ArgsType()
export class ConnectionArguments {
    @Field(() => Number, { nullable: true })
    limit?: number | null;
    @Field(() => Number, { nullable: true, defaultValue: 0 })
    skip: number;
}