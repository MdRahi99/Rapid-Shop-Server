import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  product: {
    type: Object,
    required: true
  }
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
