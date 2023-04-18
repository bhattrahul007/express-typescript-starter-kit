import { IServerConfiguration, IServerConfigurationOptions, NodeEnv } from './types';

class ServerConfiguration implements IServerConfiguration {
  private env: NodeEnv;

  private host: string;

  private port: number;

  constructor(opt: IServerConfigurationOptions) {
    this.env = opt.env;
    this.host = opt.host;
    this.port = opt.port;
  }

  getAppEnv(): NodeEnv {
    return this.env;
  }

  getPort(): number {
    return this.port;
  }

  getHost(): string {
    return this.host;
  }
}

export default ServerConfiguration;
