import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const confirmEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (confirmEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashPassword,
      },
    });

    res.status(200).redirect("http://localhost:5173/login.html");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // envoi le token dans le header
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1800s",
      },
    );

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("AuthToken");
    res.status(200).redirect("http://localhost:5173/index.html");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { signup, login, logout };
