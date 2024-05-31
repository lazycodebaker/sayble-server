// Author : Anshuman Tiwari ( lazycodebaker )

// Third-party imports
import express, { Express } from 'express';

// Custom imports
import { applyCors } from './middlewares/cors';

// Create an express application
const app: Express = express();

// Configure CORS
applyCors(app);

// Configure express application
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
