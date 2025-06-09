import { Model, PipelineStage } from "mongoose";
import { Injectable } from "@nestjs/common";
import { ConnectionArguments } from "./Connection";

@Injectable()
export abstract class RelayRepositry<T> {
  constructor(private readonly modelService: Model<T>) {}

  protected async findAll(
    { limit, skip }: ConnectionArguments,
    pipeline: PipelineStage[]
  ) {
    const matchPipeline = pipeline.filter((p) => {
      return p["$search"] || p["$match"];
    });
    const [count] = await this.modelService
      .aggregate(matchPipeline)
      .count("edgesCount");
    if (typeof limit === "number") {
      return {
        edges: await this.modelService
          .aggregate(pipeline)
          .skip(skip)
          .limit(limit),
        count: count.edgesCount
      };
    }
    return {
      edges: await this.modelService.aggregate(pipeline).skip(skip),
      count: count.edgesCount
    };
  }
}
