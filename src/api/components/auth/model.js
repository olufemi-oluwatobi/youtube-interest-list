import { v1 as uuidv1 } from "uuid";
import mongoose from "../../../db";

const { Schema } = mongoose;
const { String, Number } = Schema.Types;
const schema = new Schema({
  _id: {
    type: String,
    default: () => uuidv1(),
  },
  access_token: { type: String, required: true },
  id_token: { type: String, required: true, unique: true, required: true },
  expiry_date: { type: Number, required: true, required: true },
  user_id: {
    type: String,
    unique: true,
    required: true,
  },
});

const collectionName = "accessToken";
const accessTokenSchema = mongoose.Schema(schema);
const AccessToken = mongoose.model(collectionName, accessTokenSchema);

export default AccessToken;
