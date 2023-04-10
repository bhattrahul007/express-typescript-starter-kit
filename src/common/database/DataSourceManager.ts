import DataSourceConfiguration from '../configuration/DataSourceConfiguration';
import { TDataSourceSettings } from '../settings/DataSourceSettings';
import { TDataSourceConnector } from '../interface/DataSource';
import MongoDBConnector from './MongoDBConnector';

const TDataSourcePlatformDriver = {
    MONGODB: 'mongodb',
    MYSQL: 'mysql',
};

class DataSourceManager {
    private config: TDataSourceSettings;
    private connectors: { [x: string]: TDataSourceConnector } = {};

    constructor(config: TDataSourceSettings) {
        this.config = config;
        Object.keys(this.config)
            .map((key) => ({ [key]: this.dataSourceConnectorOnDriverType(key) }))
            .forEach((obj) => {
                this.connectors = { ...this.connectors, ...obj };
            });
    }

    public async connectToDataSources(): Promise<void[]> {
        const promiseConnectors = [];
        for (let key in this.connectors) {
            const datasourceSettingKey = key as keyof TDataSourceSettings;
            const indvidualDbConfig = this.config[datasourceSettingKey];
            if (indvidualDbConfig) {
                console.log(this.connectors[key], indvidualDbConfig);
                const connectorCls = this.connectors[key].connect(
                    new DataSourceConfiguration({
                        platformURI: indvidualDbConfig.url,
                        platformName: indvidualDbConfig.dbname,
                        username: indvidualDbConfig.username,
                        password: indvidualDbConfig.password,
                    })
                );
                promiseConnectors.push(connectorCls);
            }
        }
        return Promise.all(promiseConnectors);
    }

    private dataSourceConnectorOnDriverType(driver: string): TDataSourceConnector {
        switch (driver) {
            case TDataSourcePlatformDriver.MONGODB:
                return new MongoDBConnector();
            default:
                return new MongoDBConnector();
        }
    }
}

export default DataSourceManager;
