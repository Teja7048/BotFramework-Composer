// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export enum BotProjectDeployLoggerType {
  // Logger Type for Provision
  PROVISION_INFO = 'PROVISION_INFO',
  PROVISION_ERROR = 'PROVISION_ERROR',
  PROVISION_WARNING = 'PROVISION_WARNING',
  PROVISION_SUCCESS = 'PROVISION_SUCCESS',

  // Logger Type for Deploy
  DEPLOY_INFO = 'DEPLOY_INFO',
  DEPLOY_ERROR = 'DEPLOY_ERROR',
  DEPLOY_WARNING = 'DEPLOY_WARNING',
  DEPLOY_SUCCESS = 'DEPLOY_SUCCESS',
}