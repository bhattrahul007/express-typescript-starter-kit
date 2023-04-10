import { TDataSourceConfiguration } from '../interface';

class DataSourceConfiguration implements TDataSourceConfiguration {
    platformURI: string;
    platformName?: string | undefined;
    username?: string | undefined;
    password?: string | undefined;

    constructor(config: { platformURI: string; platformName?: string; username?: string; password?: string }) {
        this.platformURI = config.platformURI;
        this.platformName = config.platformName;
        this.username = config.username;
        this.password = config.password;
    }

    getConfiguredURI(): string {
        return this.platformURI
            .replace('<dbname>', this.platformName || '')
            .replace('<username>', this.username || '')
            .replace('<password>', this.password || '');
    }
}

export default DataSourceConfiguration;
