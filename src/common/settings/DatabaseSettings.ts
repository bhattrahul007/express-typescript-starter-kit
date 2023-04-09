import { object, string } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

export type DatabaseSettings = {
    mongodb?: {
        databaseUrl: string;
        databaseName?: string;
        username?: string;
        password?: string;
    };
};

const databaseEnvVarSchema = object({
    MONGODB_URL: string().optional(),
    MONGODB_DATABASE_NAME: string().optional(),
    MONGODB_USERNAME: string().optional(),
    MONGODB_PASSWORD: string().optional(),
});

let databaseEnvVar: { [key: string]: string } = undefined as any;

try {
    databaseEnvVar = databaseEnvVarSchema.parse(process.env);
} catch (error) {
    console.error(error);
    process.exit(1);
}

const databaseSettings: DatabaseSettings = {
    ...(databaseEnvVar.MONGODB_URL && {
        mongodb: {
            databaseUrl: databaseEnvVar.MONGODB_URL,
            databaseName: databaseEnvVar.MONGODB_DATABASE_NAME,
            username: databaseEnvVar.MONGODB_USERNAME,
            password: databaseEnvVar.MONGODB_PASSWORD,
        },
    }),
};

export default databaseSettings;
