import { Document, model, models, Schema } from "mongoose";
import mongoose from "mongoose";
import Category from './category.model';

export interface IEvent extends Document {
    _id: string;
    title: string;
    desc? : string;
    createdAt :  Date;
    img:  string; 
    price? : string;
    isFree: Boolean;
    catSlug:string;
}
const ProductSchema = new Schema({
    _id: {type:mongoose.Schema.Types.ObjectId},
    title: {type:String, required:true},
    desc: {type:String},
    createdAt : {type:String, default:Date.now},
    img: {type:String},
    price :{type:String},
    options: {type:Array},
    isFeatured:{type:Boolean, default:false},
    catSlug : {type: String},
})

const Product = models.Product || model('Product', ProductSchema);

export default Product;