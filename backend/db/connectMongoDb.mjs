import Mongoose from "mongoose";

export const ConnectMongoDB = async () => {
    try {
        await Mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb connected");
    } catch (error) {
        console.log("Error while connecting", error);
    }
}

