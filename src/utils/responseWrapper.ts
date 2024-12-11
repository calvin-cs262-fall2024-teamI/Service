export class ApiResponse<D, M> {
  success: boolean;
  data: D | null;
  meta: M | null;
  msg: string;

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

  static success<D, M>(data: D, msg = "Success", meta: M | null = null) {
    return new ApiResponse(true, data, msg, meta);
  }

  static error(msg: string) {
    return new ApiResponse(false, null, msg);
  }

  static info(msg: string) {
    return new ApiResponse(true, null, msg);
  }
}
