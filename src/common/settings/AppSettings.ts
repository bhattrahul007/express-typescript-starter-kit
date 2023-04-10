import { object, string, enum as zenum } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

export type NODE_ENV = 'production' | 'development' | 'test';

export type TAppSettings = {
    env: NODE_ENV;
    port: number;

    accounts: {
        name: {
            minLength: number;
            maxLength: number;
        };
        password: {
            minLength: number;
            saltRounds: number;
            regexp: string;
            regexpInvalid: string;
        };
    };
};

const appEnvVarSchema = object({
    APP_NODE_ENV: zenum(['development', 'production', 'test']).optional().default('development'),
    APP_PORT: string().optional().default('6001'),

    ACCOUNT_NAME_MINLENGTH: string().optional().default('1'),
    ACCOUNT_NAME_MAXLENGTH: string().optional().default('50'),
    ACCOUNT_PASSWORD_MINLENGTH: string().optional().default('8'),
    ACCOUNT_PASSWORD_SALTROUNDS: string().optional().default('10'),
    ACCOUNT_PASSWORD_REGEXP: string()
        .optional()
        .default('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]$'),
    ACCOUNT_PASSWORD_REGEXP_INVALID: string()
        .optional()
        .default('must contain mix of lowercase, uppercase, number & special character(s).'),
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

    accounts: {
        name: {
            minLength: Number(appEnvVar.ACCOUNT_NAME_MINLENGTH),
            maxLength: Number(appEnvVar.ACCOUNT_NAME_MAXLENGTH),
        },
        password: {
            minLength: Number(appEnvVar.ACCOUNT_PASSWORD_MINLENGTH),
            saltRounds: Number(appEnvVar.ACCOUNT_PASSWORD_SALTROUNDS),
            regexp: appEnvVar.ACCOUNT_PASSWORD_REGEXP,
            regexpInvalid: appEnvVar.ACCOUNT_PASSWORD_REGEXP_INVALID,
        },
    },
};

export default appSettings;
