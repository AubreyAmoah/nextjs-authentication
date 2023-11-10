import jwt from "jsonwebtoken";

export const getDataFromToken = (req) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded.id;
  } catch (error) {
    throw new Error(error.message);
  }
};
