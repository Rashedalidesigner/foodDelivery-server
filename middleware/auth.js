import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    req.body = req.body || {};
    const{ token} = req.headers;
    if (!token) {
        return res.json({success:false, message: "Not Authorized Login Again" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        console.log(error);
        return res.json({success:false, message: "Token Expired Login Again" });
    }
}

export default authMiddleware;