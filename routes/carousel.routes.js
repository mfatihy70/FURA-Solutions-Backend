import express from "express"
import {
  getCarouselItems,
  getCarouselItemById,
  createCarouselItem,
  updateCarouselItem,
  deleteCarouselItemById,
} from "../controllers/carousel.controller.js"

const router = express.Router()

router.get("/", getCarouselItems)
router.get("/:id", getCarouselItemById)
router.post("/", createCarouselItem)
router.put("/:id", updateCarouselItem)
router.delete("/:id", deleteCarouselItemById)

export default router
