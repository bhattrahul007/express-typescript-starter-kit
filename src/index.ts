import configurations from './common/settings';
import Server from './server';

const server = new Server(configurations);

server.start();
