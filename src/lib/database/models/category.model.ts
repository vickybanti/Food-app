import { Document, model, models, Schema } from "mongoose";


export interface ICategory extends Document {
    _id: string,
    title: string,
    img?: string,
    desc?:string,
    slug:string,
}

const categorySchema = new Schema({
    title: {type:String, required:true, unique:true},
    slug: {type:String},
    img: {type:String},
    desc: {type:String},
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now},
    products: [{type:Schema.Types.ObjectId, ref:'Product'}]
})

const Category = models.Category || model('Category', categorySchema)

export default Category