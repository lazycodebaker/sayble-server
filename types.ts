
import { Request, Response } from 'express';
import { CorsOptions } from 'cors';
import { EntityManager, SqlEntityManager, SqliteDriver } from '@mikro-orm/sqlite';
import { SqliteMikroORM } from '@mikro-orm/sqlite/SqliteMikroORM';

export type ContextType = {
      request: Request
      response: Response
};

export type Settings = {
      appName: string;
      password: string;
      server: {
            port: number;
            apiPrefix: string;
      };
      cors: CorsOptions,
      database: {
            path: string;
            migrationsPath: string;
      };
};

export type User = {
      id: string;
      firstName: string; 
      lastName: string;
      username : string;
      email: string;
      password: string;
      createdAt: Date;
      updatedAt: Date;
};

export type APIContextType = {
      request: Request
      response: Response
      em: SqlEntityManager<SqliteDriver> & EntityManager<any>
};

export type Options = {
      orm : SqliteMikroORM,
      testConnection: () => Promise<void>;
      syncModels: () => Promise<void>;
      createTables: () => Promise<void>;
}