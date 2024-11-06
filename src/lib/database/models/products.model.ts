import { Document, model, models, Schema } from "mongoose";
import mongoose from "mongoose";
import Category from './category.model';

export interface IEvent extends Document {
    _id:string;
    title: string;
    desc?: string;
    createdAt: Date;
    img: string; 
    price?: string;
    options?:string[];
    isFree: Boolean;
    catSlug: string;
}
const ProductSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    title: { type: String, required: true },
    desc: { type: String },
    createdAt: { type: Date, default: Date.now },
    img: { type: String },
    price: { type: Number, required: true },
    options: {type: Array},
    isFeatured: { type: Boolean, default: false },
    catSlug: { type: String },
}, {
    timestamps: true,
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;