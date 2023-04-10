export type TDataSourceConfiguration = {
    platformURI: string;
    platformName?: string;
    username?: string;
    password?: string;

    getConfiguredURI(): string;
};

export type TDataSourceConnector = {
    connect(datasource: TDataSourceConfiguration): Promise<void>;
};

export type TDataSourceManager = {
    connectToDataSources(): Promise<void[]>;
};
