import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // console.log(`Local Database Connected Successfully...`.bgCyan);
    console.log(`Remote  Database (Atlas) Connected Successfully...`.bgCyan);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
