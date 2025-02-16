import mongoose from "mongoose"

const partnerSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  link: { type: String, required: true },
})

export default mongoose.model("Partner", partnerSchema)
