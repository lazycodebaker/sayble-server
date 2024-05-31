
// Third-party imports
import path from 'path';

// Custom imports

import { Settings } from '../types'

// dbpath : /Users/lazycodebaker/Documents/web/etoffe/server/src/database/database.sqlite3
// this file is in   /Users/lazycodebaker/Documents/web/etoffe/server/src/config/settings.ts

export const settings: Settings = {
      // General application settings
      appName: 'Cnoversa',

      password: "123",

      // Server settings
      server: {
            port: 8000,
            apiPrefix: '/api',
      },

      cors: {
            origin: '*',
            optionsSuccessStatus: 200,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
      },

      // Database settings
      database: {
            path: path.join(__dirname, '../database/database.sqlite3'),
            migrationsPath: path.join(__dirname, '../database/migrations'),
      },
};
