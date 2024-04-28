import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("token", token);

  if (!token) {
    return res.status(401).redirect("http://localhost:5173/login.html");
  }

  console.log("checking token");

  // Vérification du token
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    // Vérification du token avec la clé secrète qui a servi à le créer
    if (err) {
      console.log("token invalide", err);
      return res.redirect("http://localhost:5173/login.html");
    }

    console.log("token valide");
    req.user = decodedToken;
    console.log("decoded token", decodedToken);
    console.log("decoded token user", req.user.id);

    next();
  });
};

export { authenticateToken };
