import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    Name: String,
    Price: Number,
    ImageUrl: String,
    Description: String,
    Category: String,
    Rating: Number
});

const Products = mongoose.model('Products', ProductsSchema);
export default Products;