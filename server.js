import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import userRoutes from "./routes/user.routes.js"
import productRoutes from "./routes/product.routes.js"
import carouselRoutes from "./routes/carousel.routes.js"
import partnerRoutes from "./routes/partner.routes.js"

dotenv.config()
connectDB()
const app = express()

// Middleware
app.use(express.json()) // Parse JSON bodies
app.use(cors())

// Routes
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/carousel", carouselRoutes)
app.use("/api/partners", partnerRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Running" })
})

// Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
)
