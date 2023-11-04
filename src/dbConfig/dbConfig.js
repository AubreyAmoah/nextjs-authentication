import mongoose from "mongoose";

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected succesfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong");
  }
};

export default connect;
