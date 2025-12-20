import mongoose from "mongoose";
import User from "./model/user.model.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const createAdminUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MongoDBURI);
        console.log("Connected to MongoDB");

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: "admin@bookstore.com" });
        
        if (existingAdmin) {
            console.log("❌ Admin user already exists!");
            console.log("Email: admin@bookstore.com");
            console.log("Use this account or update it manually.");
            process.exit(0);
        }

        // Create admin user
        const hashPassword = await bcryptjs.hash("admin123", 10);
        const adminUser = new User({
            fullname: "Admin User",
            email: "admin@bookstore.com",
            password: hashPassword,
            isAdmin: true,
        });

        await adminUser.save();

        console.log("✅ Admin user created successfully!");
        console.log("=================================");
        console.log("Email: admin@bookstore.com");
        console.log("Password: admin123");
        console.log("=================================");
        console.log("You can now login and access the Admin Dashboard");
        
        process.exit(0);
    } catch (error) {
        console.error("Error creating admin user:", error);
        process.exit(1);
    }
};

createAdminUser();
