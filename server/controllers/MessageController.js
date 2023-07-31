import getPrismaInstance from "../utils/PrismaClient.js";

export const addMessage = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const { message, from, to } = req.body;
    const getuser = onlineUsers.get(to);
    if (message && from && to) {
      const newMessage = await prisma.messages.create({
        date: {
          message,
          sender: {
            connect: { id: parseInt(from) },
          },
          reciever: {
            connect: { id: parseInt(to) },
          },
          messageStatus: getUser ? "delivered" : "sent",
        },
        include: { sender: true, receiver: true },
      });
      return res.status(201).send({ message: newMessage });
      }
      return res.status(400).send('From,to and Message is required.')
  } catch (err) {
    next(err);
  }
};
