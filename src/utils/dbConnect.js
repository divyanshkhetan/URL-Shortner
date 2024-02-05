import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        console.log("Already connected to the database");
        return;
    }

    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;

    if (connection.isConnected) {
        console.log("Successfully connected to the database");
    } else {
        console.log("Failed to connect to the database");
    }
}

export default dbConnect;