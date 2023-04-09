import databaseSettings from './DatabaseSettings';
import jwtSettings from './JwtSettings';
import appSettings from './AppSettings';

export default {
    app: appSettings,
    jwt: jwtSettings,
    ...databaseSettings,
};
