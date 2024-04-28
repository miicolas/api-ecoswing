import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addScore = async (req, res) => {
    
    const { score, user_id } = req.body;
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: user_id,
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await prisma.game.create({
            data: {
                score: score,
                user_id: user_id,
            },
        });

        res.status(200).json({ message: "Score added" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getScore = async (req, res) => {

    try {
        // display best score
        const scores = await prisma.game.findMany({
            orderBy: {
                score: "desc",
            },
            take: 5,
            select : {
                score: true,
            },
        });

        res.status(200).json(scores);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}


export { addScore, getScore};
