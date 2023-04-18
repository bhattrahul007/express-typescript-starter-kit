import { Router } from 'express';

export type AppConfigurationOptions = {
  env: 'test' | 'development' | 'production';
  port: number;
  controllers: Controller[];
};

export type Controller = {
  router: Router;
  path: string;
};
