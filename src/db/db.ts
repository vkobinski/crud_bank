import mongoose from 'mongoose';

const mongoURI = "mongodb://localhost:27017/graphql-demo";

const db_connect = async () => {
    await mongoose.connect(mongoURI);

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });


}

export default db_connect;