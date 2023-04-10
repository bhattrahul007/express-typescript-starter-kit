import { object, string, enum as zenum } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

export type NODE_ENV = 'production' | 'development' | 'test';

export type TAppSettings = {
    env: NODE_ENV;
    port: number;
};

const appEnvVarSchema = object({
    APP_NODE_ENV: zenum(['development', 'production', 'test']).optional().default('development'),
    APP_PORT: string().optional().default('6001'),
});

let appEnvVar: { [key: string]: string } = undefined as any;

try {
    appEnvVar = appEnvVarSchema.parse(process.env);
} catch (error) {
    console.error(error);
    process.exit(1);
}

const appSettings: TAppSettings = {
    env: appEnvVar.APP_NODE_ENV as NODE_ENV,
    port: Number(appEnvVar.APP_PORT),
};

export default appSettings;
