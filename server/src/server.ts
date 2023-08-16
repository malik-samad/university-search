import Express from 'express';
import cors from 'cors'

import { logInfo } from './services/logger';

// API Router
import apiRouter from './api/Index';

const server = Express();

// Hide the framework details from attacker
server.disable('x-powered-by');

// Middleware
server.use(cors({
    origin: '*'
}))
server.use(Express.json());
server.use(Express.text());
server.use(Express.urlencoded());

// Add api routs
server.use("/api", apiRouter);

server.use("*", (req, res) => {
    res.status(501).send("Not Implemented!")
})

export default server;