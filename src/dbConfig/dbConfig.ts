import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI ?? "default-mongo-uri");
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDb Connected succesfully');
    })

    connection.on('error', (err) => {
      console.log('MongoDB error pls make sure its running' +  err);
      process.exit();
    })

  } catch (error) {
    console.log('something went wrong!');
    console.log(error)
  }
}