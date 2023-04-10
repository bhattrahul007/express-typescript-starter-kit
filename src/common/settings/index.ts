import datasouceSettings, { TDataSourceSettings } from './DataSourceSettings';
import jwtSettings, { TJwtSettings } from './JwtSettings';
import appSettings, { TAppSettings } from './AppSettings';

const configurations = {
    app: appSettings,
    jwt: jwtSettings,
    datasource: {
        ...datasouceSettings,
    },
};

type TConfigurations = typeof configurations;

export type { TAppSettings, TDataSourceSettings, TJwtSettings, TConfigurations };
export default configurations;
