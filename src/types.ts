/* eslint-disable @typescript-eslint/no-namespace */
export interface JwtPayloadRaw {
  id: number;
  emailAddress: string;
}

export interface JwtPayload extends JwtPayloadRaw {
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};
