import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

// Get User by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ msg: "User not found" })
    res.json(user)
  } catch (err) {
    res.status(500).json({ msg: "Server error" })
  }
}

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ msg: "Server error" })
  }
}

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ msg: "User not found" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" })

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    res.json({
      msg: "Login successful!",
      token,
      isAdmin: user.isAdmin,
    })
  } catch (err) {
    console.error("Error in loginUser:", err.message)
    res.status(500).json({ msg: "Server error" })
  }
}

// Register User
export const registerUser = async (req, res) => {
  const { name, surname, email, password, address, phone } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      address,
      phone,
      isAdmin: false,
    })
    await user.save()

    res.status(201).json({ msg: "User registered successfully!" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: "Server error" })
  }
}

// Edit User
export const editUser = async (req, res) => {
  const { id } = req.params
  const { name, surname, email, address, phone, isAdmin } = req.body // Removed password from destructuring

  try {
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ msg: "User not found" })

    const updateData = {
      name: name || user.name,
      surname: surname || user.surname,
      email: email || user.email,
      address: address || user.address,
      phone: phone || user.phone,
      isAdmin: typeof isAdmin !== "undefined" ? isAdmin : user.isAdmin,
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    })
    res.json({ msg: "User updated successfully!", user: updatedUser })
  } catch (err) {
    console.error("Error in editUser:", err.message)
    res.status(500).json({ msg: "Server error" })
  }
}

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ msg: "User not found" })

    await user.deleteOne()
    res.json({ msg: "User deleted successfully!" })
  } catch (err) {
    res.status(500).json({ msg: "Server error" })
  }
}
