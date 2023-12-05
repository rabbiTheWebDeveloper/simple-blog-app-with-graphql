import jwt from "jsonwebtoken";
export const jwtHelper = async (payload: { userId: number }) => {
  const secret = jwt.sign(payload, "shhhhh");
};
