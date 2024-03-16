import jwt from "jsonwebtoken";

const createToken = (userId, userType) => {
    //Issued At
    const iat = Math.floor(Date.now() / 1000);
    return jwt.sign({ userId, userType, iat }, process.env.JWT_SECRET, { expiresIn: '1y', algorithm: 'HS256' });
}

const requireAuth = (resolver) => async (_, args, context, ...rest) => {
    const { user } = context;
    if (!user) {
        throw new Error('You are not authenticated!')
    }
    return await resolver(...[_, args, context, ...rest]);
}


export { createToken, requireAuth }
