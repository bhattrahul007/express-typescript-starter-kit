export type DatasourceConfiguration = {
    databaseUrl: string;
    databaseName?: string;
    username?: string;
    password?: string;
};

export interface DatabaseConnector {
    connect(): Promise<void>;
}
