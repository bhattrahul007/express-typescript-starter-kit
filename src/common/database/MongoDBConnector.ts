import { TDataSourceConfiguration, TDataSourceConnector } from '../interface/DataSource';
import mongoose from 'mongoose';

class MongoDBConnector implements TDataSourceConnector {
    async connect(datasource: TDataSourceConfiguration): Promise<void> {
        try {
            // logger.info()
            console.log(`Trying to connect with mongodb server(${datasource.getConfiguredURI()}).`);
            await mongoose.connect(datasource.getConfiguredURI());
            console.log(`Successfully connected with mongodb server(${datasource.getConfiguredURI()}).`);
        } catch (error) {
            // logger.error(error);
            console.error(error);
            process.exitCode = 1;
        }
    }
}

export default MongoDBConnector;
