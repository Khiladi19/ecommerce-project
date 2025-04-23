import mongoose from "mongoose";

const { Schema } = mongoose;



const cartItemSchema = new Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        require:true,
    },

    title: { type: String, require: true },
    price: { type: Number, require: true },
    catagory: { type: String, require: true },
    qty: { type: Number, require: true },
    imgSrc: { type: String, require: true },

})

const cartSchema = new Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    items:[cartItemSchema]
});

export const Cart = mongoose.model("Cart", cartSchema);
