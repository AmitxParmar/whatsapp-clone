import getPrismaInstance from "../utils/PrismaClient.js";

export const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({ msg: "Email is required.", status: false });
    }
    console.log(email, "email check");
    const prisma = getPrismaInstance();

    const user = await prisma.user.findUnique({ where: { email } });
    console.log("user check prisma", user);

    if (!user) {
      console.log("user not found");
      return res.json({ msg: "User not found", status: false });
    } else {
      console.log("user Found!!!!!!!!");
      return res.json({ msg: "User found", status: true, data: user });
    }
  } catch (err) {
    next(err);
    console.log(err);
    throw new Error(err);
  }
};

/* export const updatePfp = async() => {
  console.log("updating pfp");
  const prisma = getPrismaInstance()
  const updatedPfp = await prisma.user.update({
    where: { email: "amitparmar901@gmail.com" },
    data: {
      profilePicture:
        "https://lh3.googleusercontent.com/a/AAcHTteCNgEcE8KDiE1NyR869xPoIJthKtBMOioTM-pOQvn49nQ=s96-c",
    },
  });
  console.log('pfpupdated!!!!!',updatedPfp)
};
updatePfp(); */

export const onBoardUser = async (req, res, next) => {
  try {
    const { email, name, about, image: profilePicture } = req.body;

    if (!email || !name || !profilePicture) {
      return res.send("Email, name and Image are required.");
    }
    const prisma = getPrismaInstance();

    await prisma.user.create({
      data: { email, name, about, profilePicture },
    });
    console.log("successfully added user to the database!!");
    return res.json({ msg: "Success", status: true });
  } catch (err) {
    console.log(err);
  }
};
