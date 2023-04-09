import { configurations } from './common';
import Server from './server';

const server = new Server(configurations);

server.start();
