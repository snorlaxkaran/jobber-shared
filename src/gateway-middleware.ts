import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "./error-handler";

const tokens: string[] = [
  "auth",
  "sellet",
  "gig",
  "search",
  "buyer",
  "message",
  "order",
  "review",
];

interface IJWTPayload {
  id: string;
  iat: number;
}

export const verifyGatewayRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token: string = req.headers?.gatewayToken as string;
  if (!token) {
    throw new NotAuthorizedError(
      "Not authorized",
      "verifyGatewayRequest() method: Request not coming from api gateway"
    );
  }
  try {
    const payload: IJWTPayload = JWT.verify(token, "secret") as IJWTPayload;
    if (!token.includes(payload.id)) {
      throw new NotAuthorizedError(
        "Not authorized",
        "verifyGatewayRequest() method: Request payload is invalid"
      );
    }
  } catch (error) {
    throw new NotAuthorizedError(
      "Not authorized",
      "verifyGatewayRequest() method: Request not coming from api gateway"
    );
  }
};
