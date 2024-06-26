import { Schema, model } from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new Schema({
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'products',
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    default: [],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

cartSchema.pre('find', function () {
  this.populate('products');
});

const cartModel = model(cartCollection, cartSchema);

export default cartModel;
