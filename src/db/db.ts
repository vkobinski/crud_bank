import mongoose from 'mongoose';
import { connect } from 'mongoose';

const mongoURI = "mongodb://localhost:27017/graphql-demo";

const connectWithTimeout = async (mongoURI: string, timeoutMs: number) => {
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Connection timed out')), timeoutMs)
    );

    const connectionPromise = connect(mongoURI, {
        connectTimeoutMS: 0,
        socketTimeoutMS: 0,
    });

    try {
        const connection = await Promise.race([connectionPromise, timeoutPromise]);
        return connection;
    } catch (error) {

        if (error instanceof Error) {
            console.log(error.message);
        }

        process.exit(1);
    }
};

const db_connect = async () => {

    await connectWithTimeout(mongoURI, 100);

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });


}

export default db_connect;