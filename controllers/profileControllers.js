import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getProfile = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);

  try {
     const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        gift: true,
        lastGift: true,
      },
    });
    console.log(user);

    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getProfile };
