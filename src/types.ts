/* eslint-disable @typescript-eslint/no-namespace */
/**
 * @fileoverview Type definitions for JWT payloads and Express request augmentation.
 * Defines interfaces for authentication and request handling.
 */

/**
 * Raw JWT payload before token creation
 */
export interface JwtPayloadRaw {
  /** User's unique identifier */
  id: number;
  /** User's email address */
  emailAddress: string;
}

/**
 * Complete JWT payload including timestamp fields
 * Extends JwtPayloadRaw with standard JWT fields
 */
export interface JwtPayload extends JwtPayloadRaw {
  /** Token issued at timestamp */
  iat: number;
  /** Token expiration timestamp */
  exp: number;
}

/**
 * Global type augmentation for Express Request
 * Adds user property to Express requests for authenticated routes
 */
declare global {
  namespace Express {
    interface Request {
      /** Authenticated user information from JWT */
      user?: JwtPayload;
    }
  }
}

export {};
