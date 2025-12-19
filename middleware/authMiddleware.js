import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // ❌ No token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // ✅ Extract token
    const token = authHeader.split(" ")[1];

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user id to request
    req.userId = decoded.id;

    next(); // go to controller
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export default authMiddleware;
