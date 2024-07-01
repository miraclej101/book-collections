import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const protect = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token || !token.startsWith("Bearer")) {
        return res.status(401).json({
            "message": "Token has invalid format"
        });
    }

    const tokenWithoutBearer = token.split(" ")[1];

    jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                "message": "Invalid token"
            });
        }

        req.user = decoded;
        next();
    });

}