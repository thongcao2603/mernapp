import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
      console.log("Connected db successfully!!!");
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
