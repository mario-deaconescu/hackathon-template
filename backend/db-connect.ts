import {connect} from "mongoose";
import * as process from "process";

const user = 'admin';
const password = process.env.DB_PASSWORD;

const url = () => `mongodb+srv://${user}:${process.env.DB_PASSWORD}@hackathondb.0qyqpic.mongodb.net/?retryWrites=true&w=majority`;

const dbConnect = async () => {
    await connect(url(), {
        ssl: true,
    })
};

export default dbConnect;
