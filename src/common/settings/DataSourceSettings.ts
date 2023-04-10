import { object, string } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

export type TDataSourceSettings = {
    mongodb?: {
        url: string;
        dbname?: string;
        username?: string;
        password?: string;
    };
};

const datasourceEnvVarSchema = object({
    MONGODB_URL: string().optional(),
    MONGODB_DATABASE_NAME: string().optional(),
    MONGODB_USERNAME: string().optional(),
    MONGODB_PASSWORD: string().optional(),
});

let datasourceEnvVar: { [key: string]: string } = undefined as any;

try {
    datasourceEnvVar = datasourceEnvVarSchema.parse(process.env);
} catch (error) {
    console.error(error);
    process.exit(1);
}

const datasouceSettings: TDataSourceSettings = {
    ...(datasourceEnvVar.MONGODB_URL && {
        mongodb: {
            url: datasourceEnvVar.MONGODB_URL,
            dbname: datasourceEnvVar.MONGODB_DATABASE_NAME,
            username: datasourceEnvVar.MONGODB_USERNAME,
            password: datasourceEnvVar.MONGODB_PASSWORD,
        },
    }),
};

export default datasouceSettings;
