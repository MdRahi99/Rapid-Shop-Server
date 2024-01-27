import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    Name: String,
    Price: Number,
    ImageUrl: String,
    Rating: Number,
    Description: String,
});

const Products = mongoose.model('Products', ProductsSchema);
export default Products;