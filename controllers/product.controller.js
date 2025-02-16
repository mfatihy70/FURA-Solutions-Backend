import mongoose from "mongoose"
import Product from "../models/product.model.js"

// GET all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
  } catch (error) {
    console.log("error in fetching products:", error.msg)
    res.status(500).json({ msg: "Server Error" })
  }
}

// POST new product
export const createProduct = async (req, res) => {
  const product = req.body

  if (
    !product.name ||
    product.price === undefined ||
    product.price === null ||
    !product.imageUrl
  ) {
    return res.status(400).json({ msg: "Please provide all fields" })
  }

  const newProduct = new Product(product)

  try {
    await newProduct.save()
    res.status(201).json(newProduct)
  } catch (error) {
    console.error("Error in Create product:", error.msg)
    res.status(500).json({ msg: "Server Error" })
  }
}

// PUT update product
export const updateProduct = async (req, res) => {
  const { id } = req.params
  const product = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Invalid Product Id" })
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    })
    res.status(200).json({ data: updatedProduct })
  } catch (error) {
    res.status(500).json({ msg: "Server Error" })
  }
}

// DELETE product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Invalid Product Id" })
  }

  try {
    await Product.findByIdAndDelete(id)
    res.status(200).json({ msg: "Product deleted" })
  } catch (error) {
    console.log("error in deleting product:", error.msg)
    res.status(500).json({ msg: "Server Error" })
  }
}
