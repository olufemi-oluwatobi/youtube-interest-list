import { v1 as uuidv1 } from "uuid";
import mongoose from "../../../db";

const { Schema } = mongoose;
const { String } = Schema.Types;
const schema = new Schema({
  _id: {
    type: String,
    default: () => uuidv1(),
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
  updatedAt: {
    type: String,
    default: Date.now(),
  },
  title: {
    type: String,
    required: true,
  },
  videos: [{ link: String, title: String, _id: String }],
});

const collectionName = "list";
const listSchema = mongoose.Schema(schema);
const List = mongoose.model(collectionName, listSchema);

export default List;
