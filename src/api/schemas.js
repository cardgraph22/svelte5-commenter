import { Schema } from "mongoose"

export const userSchema = new Schema({
  userid: String,
  username: String,
  password: String,
  imagename: String
});

export const blogSchema = new Schema({
  userid: String,     //  user id of author
  username: String,   //  user name of author
  title: String,
  entry: String,
  likes: Number,
  dislikes: Number,
  replies: []
});
