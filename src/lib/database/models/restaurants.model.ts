import { Document, model, models, ObjectId, Schema } from "mongoose";
import mongoose from "mongoose";
import Category from './category.model';

export interface IEvent extends Document {
    _id: ObjectId;
    name: string;
    createdAt: Date;
    img: string; 
    lowestprice: number;
    highestPrice: number;
    products: any[];
}

const RestaurantSchema = new Schema({
    _id: { type: Schema.Types.ObjectId }, 
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    img: { type: String },
    lowestPrice: { type: Number, required: true },
    products: {type: Array, ref: 'Product'},
    highestPrice:{type: Number},
}, {
    timestamps: true, /// <reference path="Product" />
    
});

const Restaurant = models.Restaurants || model('Restaurants', RestaurantSchema);

export default Restaurant;