import { object, string } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

export type TJwtSettings = {
    secret: string;
    expiresIn: {
        refresh: number;
        access: number;
        verification: number;
        reset: number;
    };
};

const jwtEnvVarSchema = object({
    JWT_SECRET_KEY: string().optional(),

    JWT_REFRESH_EXPIRESIN: string()
        .optional()
        .default(`${12 * 30 * 24 * 3600}`),

    JWT_ACCESS_EXPIRESIN: string().optional().default('3600'),

    JWT_VERIFICATION_EXPIRESIN: string().optional().default('300'),

    JWT_RESET_EXPIRESIN: string().optional().default('300'),
});

let jwtEnvVar: { [key: string]: string } = undefined as any;

try {
    jwtEnvVar = jwtEnvVarSchema.parse(process.env);
} catch (error) {
    console.error(error);
    process.exit(1);
}

const jwtSettings: TJwtSettings = {
    secret: jwtEnvVar.JWT_SECRET_KEY,
    expiresIn: {
        refresh: Number(jwtEnvVar.JWT_REFRESH_EXPIRESIN),
        access: Number(jwtEnvVar.JWT_ACCESS_EXPIRESIN),
        verification: Number(jwtEnvVar.JWT_VERIFICATION_EXPIRESIN),
        reset: Number(jwtEnvVar.JWT_RESET_EXPIRESIN),
    },
};

export default jwtSettings;
