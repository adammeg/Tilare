const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema(
    {
        shopName: {
            type: String,
            required: true,
        },
        shopLocation: {
            lat: {
                type: Number,
                required: true
            },
            lng: {
                type: Number,
                required: true
            }
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now(),
        },
        verified: {
            type: Boolean,
            enum: [true, false],
            default: false,
        },
        payed: {
            type: Boolean,
            enum: [true, false],
            default: false,
        },
        product: [{ type: mongoose.SchemaTypes.ObjectId, ref: "product" }],
    }
);

module.exports = mongoose.model("Shop",ShopSchema);