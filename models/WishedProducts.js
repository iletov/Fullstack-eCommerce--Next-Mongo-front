import { Schema, model, models } from "mongoose";
import { Product } from "@/models/Product";

const WishedProductsSchema = new Schema({
  userEmail: {type: String, required: true},
  product: {type: Schema.Types.ObjectId, ref: Product},
});

export const WishedProducts = models?.WishedProducts || model('WishedProducts', WishedProductsSchema);