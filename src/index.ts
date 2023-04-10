import AccountDispatcher from './account/AccountDispatcher';
import { configurations } from './common';
import Server from './server';

const server = new Server(configurations, { dispatchers: [new AccountDispatcher()] });

server.start();
