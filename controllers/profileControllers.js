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

    // Calculer le temps restant avant le prochain cadeau qui est tiré toutes les 24h
    const currentTime = new Date();
    const lastGiftTime = new Date(user.lastGift);
    const nextGiftTime = new Date(lastGiftTime.getTime() + 24 * 60 * 60 * 1000); // Ajoute 24 heures
    const timeUntilNextGift = nextGiftTime - currentTime;

    // Convertir le temps restant en heures et minutes

    const hoursUntilNextGift = Math.floor(
      (timeUntilNextGift / (1000 * 60 * 60)) % 24,
    );
    const minutesUntilNextGift = Math.floor(
      (timeUntilNextGift / (1000 * 60)) % 60,
    );

    // Envoyer la réponse avec les données de l'utilisateur et le temps restant jusqu'au prochain cadeau
    res.status(200).json({
      user,
      nextGiftTime: {
        hours: hoursUntilNextGift,
        minutes: minutesUntilNextGift,
      },
    });
  } catch (error) {
    console.error("Error getting profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getProfile };
