import mongoose from 'mongoose'
import { Schema, model, models, Document } from 'mongoose'

export interface IOrder extends Document {
  createdAt: Date
  intentId: string
  totalAmount: string
  products: {
    _id:string
    title: string
    price: number
    quantity: number
    optionTitle: string
  }[]
  user: {
    _id: string
    firstName: string
    lastName: string
  }
}

export type IOrderItem = {
  _id: string
  totalAmount: string
  createdAt: Date
  productTitle: string
  productId: string
  userEmail: string
  status: string
}

const OrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  intentId: {
    type: String,
    required: true,
    unique: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  products: [{
    _id: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    optionTitle: { type: String, required: true }
  }],
  userEmail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  
})

const Order = models.Order || model('Order', OrderSchema)

export default Order