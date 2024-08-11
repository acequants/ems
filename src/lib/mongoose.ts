import mongoose from 'mongoose';

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGO_DB_URL) return console.log('MONGO_DB_URL not found');
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_DB_URL);

    isConnected = true;

    console.log('Database connection established');
  } catch (exception) {
    console.log(exception);
  }
};
