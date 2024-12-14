/**
 * @fileoverview API response wrapper for consistent response formatting.
 * Provides standardized structure for success, error, and info responses.
 */

/**
 * Wrapper class for API responses
 * @template D Type of the response data
 * @template M Type of the metadata
 */
export class ApiResponse<D, M> {
  success: boolean;
  data: D | null;
  meta: M | null;
  msg: string;

  /**
   * Creates a new API response
   * @param success - Whether the operation was successful
   * @param data - Response payload
   * @param msg - Response message
   * @param meta - Optional metadata
   */
  constructor(
    success: boolean,
    data: D | null,
    msg: string,
    meta: M | null = null
  ) {
    this.success = success;
    this.data = data;
    this.msg = msg;
    this.meta = meta;
  }

  /**
   * Creates a success response
   * @param data - Success response data
   * @param msg - Optional success message
   * @param meta - Optional metadata
   */
  static success<D, M>(data: D, msg = "Success", meta: M | null = null) {
    return new ApiResponse(true, data, msg, meta);
  }

  /**
   * Creates an error response
   * @param msg - Error message
   */
  static error(msg: string) {
    return new ApiResponse(false, null, msg);
  }

  /**
   * Creates an informational response
   * @param msg - Info message
   */
  static info(msg: string) {
    return new ApiResponse(true, null, msg);
  }
}
