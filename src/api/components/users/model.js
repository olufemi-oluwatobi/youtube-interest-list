import { v1 as uuidv1 } from "uuid";
import mongoose from "../../../db";

const { Schema } = mongoose;
const { String } = Schema.Types;
const schema = new Schema({
  _id: {
    type: String,
    default: () => uuidv1(),
  },
  googleId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const collectionName = "user";
const userSchema = mongoose.Schema(schema);
const User = mongoose.model(collectionName, userSchema);

export default User;
