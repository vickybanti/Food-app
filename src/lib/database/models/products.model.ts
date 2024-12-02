import { Document, model, models, ObjectId, Schema } from "mongoose";
import mongoose from "mongoose";
import Category from './category.model';

export interface IEvent extends Document {
    _id: ObjectId;
    restaurantId: ObjectId;
    title: string;
    desc?: string;
    createdAt: Date;
    img: string; 
    price?: string;
    options?: string[];
    isFree: Boolean;
    catSlug: string;
}

const ProductSchema = new Schema({
    _id: { type: Schema.Types.ObjectId }, 
    restaurantId: { type: Schema.Types.ObjectId, ref:'Restaurants'},
    title: { type: String, required: true },
    desc: { type: String },
    createdAt: { type: Date, default: Date.now },
    img: { type: String },
    price: { type: Number, required: true },
    options: { type: Array },
    isFeatured: { type: Boolean, default: false },
    discount:{type: Boolean, default: false},
    discountPrice:{type: Number},
    location:{type:String},
    catSlug: { type: String },
}, {
    timestamps: true,
});

const Product = models.Product || model('Product', ProductSchema);
export default Product;