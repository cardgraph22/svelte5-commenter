import mongoose from "mongoose"
mongoose.set('strictQuery', false);

//import { MONGODB_URI } from process.env.MONGODB_URI;

let MONGODB_URI = process.env.MONGODB_URI;

export async function startMongo() {
  console.log('mongo.js, connect to db')
  //mongoose.connect(MONGODB_URL)

  try {
    await mongoose.connect(MONGODB_URI)
    //console.log('connected to mongoose')
  } catch(e) {
    console.log(e)
  }
}