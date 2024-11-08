export class ApiResponse<T> {
  code: number;
  data: T | null;
  msg: string;

  constructor(code: number, data: T | null, msg: string) {
    this.code = code;
    this.data = data;
    this.msg = msg;
  }

  static success<T>(data: T, msg: string = "Success") {
    return new ApiResponse(0, data, msg);
  }

  static error(msg: string, code: number = -1) {
    return new ApiResponse(code, null, msg);
  }
}
