const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

const serviceSchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
    serviceName: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      default: 1,
    }
    //productImage: {
      //type: String,
    //},
    //quantity: {
      //type: Number,
      //default: 1,
    //}
  },
  { timestamps: true } //to include createdAt and updatedAt
);
serviceSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Service", serviceSchema);
