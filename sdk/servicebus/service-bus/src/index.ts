// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="es2015" />
/// <reference lib="esnext.asynciterable" />

export { delay, MessagingError, RetryOptions, TokenType, WebSocketOptions } from "@azure/core-amqp";
export { TokenCredential } from "@azure/core-auth";
export { OperationOptions } from "@azure/core-http";
export { Delivery, WebSocketImpl } from "rhea-promise";
export { ServiceBusClientOptions } from "./constructorHelpers";
export {
  CreateMessageBatchOptions,
  GetMessageIteratorOptions,
  MessageHandlers,
  PeekMessagesOptions,
  ProcessErrorArgs,
  ReceiveMessagesOptions,
  SubscribeOptions,
  ServiceBusReceiverOptions,
  ServiceBusSessionReceiverOptions
} from "./models";
export { OperationOptionsBase, TryAddOptions } from "./modelsToBeSharedWithEventHubs";
export { ServiceBusReceiver } from "./receivers/receiver";
export { ServiceBusSessionReceiver } from "./receivers/sessionReceiver";
export { ServiceBusSender } from "./sender";
export { NamespaceProperties } from "./serializers/namespaceResourceSerializer";
export {
  CreateQueueOptions,
  QueueProperties,
  QueueRuntimeProperties
} from "./serializers/queueResourceSerializer";
export {
  CorrelationRuleFilter,
  RuleProperties,
  SqlRuleAction,
  SqlRuleFilter,
  ISO8601Duration
} from "./serializers/ruleResourceSerializer";
export {
  CreateSubscriptionOptions,
  SubscriptionProperties,
  SubscriptionRuntimeProperties
} from "./serializers/subscriptionResourceSerializer";
export {
  CreateTopicOptions,
  TopicProperties,
  TopicRuntimeProperties
} from "./serializers/topicResourceSerializer";
export {
  EntitiesResponse,
  ServiceBusAdministrationClient,
  WithResponse
} from "./serviceBusAtomManagementClient";
export { ServiceBusClient } from "./serviceBusClient";
export { isServiceBusError, ServiceBusError, ServiceBusErrorCode } from "./serviceBusError";
export {
  DeadLetterOptions,
  ServiceBusMessage,
  ServiceBusReceivedMessage
} from "./serviceBusMessage";
export { ServiceBusMessageBatch } from "./serviceBusMessageBatch";
export {
  parseServiceBusConnectionString,
  ServiceBusConnectionStringProperties
} from "./util/connectionStringUtils";
export { AuthorizationRule, EntityAvailabilityStatus, EntityStatus } from "./util/utils";
