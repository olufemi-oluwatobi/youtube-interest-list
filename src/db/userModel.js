import mongoose from "./index";

const { Schema } = mongoose;
const { String } = Schema.Types;
const schema = {
  name: { type: String, required: true },
  email: { type: String, required: true },
};

const collectionName = "user";
const userSchema = mongoose.Schema(schema);
const User = mongoose.model(collectionName, userSchema);

export default User;
