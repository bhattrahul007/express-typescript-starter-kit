import databaseSettings from './DatabaseSettings';
import jwtSettings from './JwtSettings';
import appSettings from './AppSettings';

const configurations = {
    app: appSettings,
    jwt: jwtSettings,
    ...databaseSettings,
};

export type Configurations = typeof configurations;

export default configurations;
