import { TDispatcher, TDeleteRequest, TGetRequest, TPostRequest, TPutRequest } from './interface/Dispatcher';
import { TDataSourceConnector, TDataSourceConfiguration, TDataSourceManager } from './interface/DataSource';
import configurations, { TConfigurations } from './settings';
import MongoDBConnector from './database/MongoDBConnector';
import DataSourceManager from './database/DataSourceManager';

export type {
    TDataSourceConnector,
    TDispatcher,
    TConfigurations,
    TDeleteRequest,
    TGetRequest,
    TPostRequest,
    TPutRequest,
    TDataSourceConfiguration,
    TDataSourceManager,
};

export { MongoDBConnector, configurations, DataSourceManager };
