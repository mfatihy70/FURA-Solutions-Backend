import mongoose from "mongoose"

const carouselSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  subtitle: { type: String },
})

export default mongoose.model("Carousel", carouselSchema)
