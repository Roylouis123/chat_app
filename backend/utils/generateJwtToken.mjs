import jwt from "jsonwebtoken";

export const generateJwtToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};