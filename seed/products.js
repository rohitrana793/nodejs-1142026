import mongoose from "mongoose";
import Product from "../model/Product.js";
import User from "../model/User.js";
import dotenv from "dotenv";

dotenv.config();

const seedProducts = async () => {
  try {
    // Connect to the same database used by the main application
    await mongoose.connect(`${process.env.MONGODB_URI}/product`);

    // Find users
    const users = await User.find();

    // Check if a user exists
    if (users.length === 0) {
      console.log("No user found. Create a user first.");
      process.exit(1);
    }

    // Use the first user
    const user = users[0];

    // Dummy products
    const products = [
      {
        name: "iPhone 15",
        brand: "Apple",
        category: "Mobile",
        price: 999,
        createdBy: user._id,
      },
      {
        name: "Galaxy S24",
        brand: "Samsung",
        category: "Mobile",
        price: 899,
        createdBy: user._id,
      },
      {
        name: "MacBook Air M3",
        brand: "Apple",
        category: "Laptop",
        price: 1299,
        createdBy: user._id,
      },
      {
        name: "ThinkPad E14",
        brand: "Lenovo",
        category: "Laptop",
        price: 850,
        createdBy: user._id,
      },
      {
        name: "Wireless Mouse",
        brand: "Logitech",
        category: "Accessories",
        price: 35,
        createdBy: user._id,
      },
      {
        name: "Mechanical Keyboard",
        brand: "Keychron",
        category: "Accessories",
        price: 95,
        createdBy: user._id,
      },
      {
        name: "Dell 24 Monitor",
        brand: "Dell",
        category: "Monitor",
        price: 220,
        createdBy: user._id,
      },
      {
        name: "27-inch 4K Monitor",
        brand: "LG",
        category: "Monitor",
        price: 399,
        createdBy: user._id,
      },
      {
        name: "iPad Air",
        brand: "Apple",
        category: "Tablet",
        price: 599,
        createdBy: user._id,
      },
      {
        name: "Galaxy Tab S9",
        brand: "Samsung",
        category: "Tablet",
        price: 699,
        createdBy: user._id,
      },
      {
        name: "Sony WH-1000XM5",
        brand: "Sony",
        category: "Audio",
        price: 349,
        createdBy: user._id,
      },
      {
        name: "AirPods Pro",
        brand: "Apple",
        category: "Audio",
        price: 249,
        createdBy: user._id,
      },
      {
        name: "USB-C Hub",
        brand: "Anker",
        category: "Accessories",
        price: 45,
        createdBy: user._id,
      },
      {
        name: "Power Bank 20000mAh",
        brand: "Anker",
        category: "Accessories",
        price: 60,
        createdBy: user._id,
      },
      {
        name: "Canon EOS R50",
        brand: "Canon",
        category: "Camera",
        price: 799,
        createdBy: user._id,
      },
    ];

    // Remove existing products
    await Product.deleteMany({});

    console.log("Existing products deleted");

    // Insert products
    await Product.insertMany(products);

    console.log("15 products inserted successfully");

    // Close connection
    await mongoose.connection.close();

    console.log("MongoDB connection closed");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);

    // Close connection on error
    await mongoose.connection.close();

    process.exit(1);
  }
};

seedProducts();
