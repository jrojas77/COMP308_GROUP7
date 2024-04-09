import jwt from "jsonwebtoken";

const createToken = (userId, userType) => {
  //Issued At
  try {
    const iat = Math.floor(Date.now() / 1000);
    console.log("Token Created for User: ", userId);
    return jwt.sign({ userId, userType, iat }, process.env.JWT_SECRET, {
      expiresIn: "1y",
      algorithm: "HS256",
    });
  } catch (error) {
    console.error("Error creating token: ", error);
    throw new Error("Error creating token");
  }
};

const requireAuth =
  (resolver) =>
  async (_, args, context, ...rest) => {
    const { user } = context;
    if (!user) {
      throw new Error("You are not authenticated!");
    }
    return await resolver(...[_, args, context, ...rest]);
  };

export { createToken, requireAuth };
