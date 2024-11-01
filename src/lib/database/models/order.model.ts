import { Schema, model, models, Document } from 'mongoose'

export interface IOrder extends Document {
  createdAt: Date
  intentId: string
  totalAmount: string
  products: {
    _id: string
    title: string
  }
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
  products: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
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