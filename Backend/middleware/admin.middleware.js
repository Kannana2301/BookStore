import User from "../model/user.model.js";
import { verifyToken } from "../utils/jwt.util.js";

export const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = verifyToken(token);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.isAdmin) {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
