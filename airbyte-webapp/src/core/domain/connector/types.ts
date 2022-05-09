import { SourceDiscoverSchemaRead } from "core/domain/catalog";
import { DestinationDefinitionReadWithLatestTag } from "services/connector/DestinationDefinitionService";
import { SourceDefinitionReadWithLatestTag } from "services/connector/SourceDefinitionService";

import {
  DestinationDefinitionSpecificationRead,
  DestinationRead,
  SourceDefinitionSpecificationRead,
  SourceRead,
} from "../../request/AirbyteClient";
import { JobInfo } from "../job";

export type ConnectorDefinition = SourceDefinitionReadWithLatestTag | DestinationDefinitionReadWithLatestTag;

export type ConnectorDefinitionSpecification =
  | DestinationDefinitionSpecificationRead
  | SourceDefinitionSpecificationRead;

export type ConnectorT = DestinationRead | SourceRead;

export interface Scheduler {
  status: string;
  message: string;
  jobInfo?: JobInfo;
}

export interface Schema extends SourceDiscoverSchemaRead {
  // TODO: probably this could be removed. Legacy proper that was used in rest-hooks
  id: string;
}
