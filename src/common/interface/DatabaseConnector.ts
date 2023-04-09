export type Datasource = {
    url: string;
    dbname?: string;
    username?: string;
    password?: string;
};

export type DatabaseConnector = {
    getDatabaseKey(): string;
    connect(datasource: Datasource): Promise<void>;
};
