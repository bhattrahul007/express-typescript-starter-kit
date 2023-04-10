import datasouceSettings from './DataSourceSettings';
import jwtSettings from './JwtSettings';
import appSettings from './AppSettings';

const configurations = {
    app: appSettings,
    jwt: jwtSettings,
    datasource: {
        ...datasouceSettings,
    },
};

export type TConfigurations = typeof configurations;

export default configurations;
