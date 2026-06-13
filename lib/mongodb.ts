import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGO_URI as string
        );

        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        if (error instanceof Error) {
            console.error("MongoDB connection error:", error.message);
        } else {
            console.error("MongoDB connection error:", error);
        }

        process.exit(1);
    }
};

// Connection events
mongoose.connection.on("connected", () => {
    console.log("Mongoose connected");
});

mongoose.connection.on("error", (err: Error) => {
    console.log("Mongoose error:", err.message);
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
});

export default connectDB;