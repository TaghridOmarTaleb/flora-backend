import jwt from "jsonwebtoken";

export function authorization(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided!");

  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (exception) {
    res.status(400).send("Invalid token!");
  }
  // next();
}

export default authorization;
