import express, {Application, json, urlencoded} from 'express';
import dotenv from 'dotenv';
import {RegisterRoutes} from "./src/routes/routes";
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import * as process from "process";
import dbConnect from "./db-connect";
import cookieParser from 'cookie-parser';
import {createServer} from "https";
import * as fs from "fs";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors({
    credentials: true,
    origin: "https://localhost:5173",
}));
app.use(cookieParser());

app.use(
    urlencoded({
        extended: true,
    })
);
app.use(json());

RegisterRoutes(app);

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

dbConnect().then(() => {

    const httpServer = createServer({
        key: fs.readFileSync(process.env.SSL_KEY as string),
        cert: fs.readFileSync(process.env.SSL_CERT as string),
    }, app);
    httpServer.listen(port, () => {
        console.log(`Server is Fire at https://localhost:${port}`);
    });
});
