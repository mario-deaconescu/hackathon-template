import express, {Application, json, urlencoded} from 'express';
import dotenv from 'dotenv';
import {RegisterRoutes} from "./src/routes/routes";
import cors from 'cors';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.use(
    urlencoded({
        extended: true,
    })
);
app.use(json());

RegisterRoutes(app);

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
