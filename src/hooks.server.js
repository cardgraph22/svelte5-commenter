import mongoose from "mongoose"
import { startMongo } from "$api/mongo";
import { blogSchema, userSchema } from "$api/schemas";

startMongo().then(()=>{
  console.log('hooks.server,js - mongoose started')
})

export let Blog = mongoose.model('Blog', blogSchema)
export let User = mongoose.model('User', userSchema)
