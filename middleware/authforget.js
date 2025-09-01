import jwt from "jsonwebtoken";

const authMiddlewareforget = (req, res, next) => {
  try {
    req.body = req.body || {};
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id
    next();
  } catch (err) {
    console.error("AuthForget error:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddlewareforget;
