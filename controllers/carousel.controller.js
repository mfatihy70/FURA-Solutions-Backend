import Carousel from "../models/carousel.model.js" // Adjust the path as necessary

// Get all carousel items
export const getCarouselItems = async (req, res) => {
  try {
    const carousels = await Carousel.find()
    res.status(200).json(carousels)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get carousel item by ID
export const getCarouselItemById = async (req, res) => {
  try {
    const carousel = await Carousel.findById(req.params.id)
    if (!carousel)
      return res.status(404).json({ message: "Carousel item not found" })
    res.status(200).json(carousel)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create a new carousel item
export const createCarouselItem = async (req, res) => {
  const { title, imageUrl, subtitle } = req.body
  const newCarousel = new Carousel({ title, imageUrl, subtitle })

  try {
    await newCarousel.save()
    res.status(201).json(newCarousel)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Update a carousel item
export const updateCarouselItem = async (req, res) => {
  const { id } = req.params
  const { title, imageUrl, subtitle } = req.body

  try {
    const updatedCarousel = await Carousel.findByIdAndUpdate(
      id,
      { title, imageUrl, subtitle },
      { new: true }
    )
    if (!updatedCarousel)
      return res.status(404).json({ message: "Carousel item not found" })
    res.status(200).json(updatedCarousel)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Delete a carousel item by ID
export const deleteCarouselItemById = async (req, res) => {
  try {
    const deletedCarousel = await Carousel.findByIdAndDelete(req.params.id)
    if (!deletedCarousel)
      return res.status(404).json({ message: "Carousel item not found" })
    res.status(200).json({ message: "Carousel item deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
