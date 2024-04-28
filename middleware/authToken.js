import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
  // Récupération du token depuis l'en-tête "Authorization"
  const authHeader = req.headers["authorization"];
  console.log("authHeader", authHeader);

  const token = authHeader && authHeader.split(" ")[1];

  console.log("token", token);

  if (!token || token === "null" || token === "undefined") {
    return res.redirect("http://localhost:5173/login.html"); // Redirection vers la page de connexion si le token est manquant
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
