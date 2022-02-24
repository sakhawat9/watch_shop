import mongoose from "mongoose";

const watchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    shortDesc: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    bannerImage: { type: String, default: ""},
    price: { type: Number, required: true },
    delPrice: { type: Number, required: true },
    rating: { type: Number, required: true, default: 4 },
    countInStock: { type: Number, required: true, default: 20 },
    description: { type: String, required: true },
    prichard: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const Watch = mongoose.models.Watch || mongoose.model("Watch", watchSchema);
export default Watch;
