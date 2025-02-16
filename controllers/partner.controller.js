import Partner from "../models/partner.model.js"

// Get all partners
export const getPartners = async (req, res) => {
  try {
    const partners = await Partner.find()
    res.status(200).json(partners)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get partner by ID
export const getPartnerById = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id)
    if (!partner) {
      return res.status(404).json({ message: "Partner not found" })
    }
    res.status(200).json(partner)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create a new partner
export const createPartner = async (req, res) => {
  const { imageUrl, link } = req.body
  const newPartner = new Partner({ imageUrl, link })

  try {
    const savedPartner = await newPartner.save()
    res.status(201).json(savedPartner)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Update a partner
export const updatePartner = async (req, res) => {
  const { id } = req.params
  const { imageUrl, link } = req.body

  try {
    const updatedPartner = await Partner.findByIdAndUpdate(
      id,
      { imageUrl, link },
      { new: true }
    )
    if (!updatedPartner) {
      return res.status(404).json({ message: "Partner not found" })
    }
    res.status(200).json(updatedPartner)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Delete a partner
export const deletePartner = async (req, res) => {
  try {
    const deletedPartner = await Partner.findByIdAndDelete(req.params.id)
    if (!deletedPartner) {
      return res.status(404).json({ message: "Partner not found" })
    }
    res.status(200).json({ message: "Partner deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
