import request from "supertest";

process.env.DB_NAME = "swolemate_test";
process.env.SQL_LOGGING = "false";

import app from "@/app";
import { sequelize } from "@/config/database";

describe("Test app.ts", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  }, 10000);

  afterAll(async () => {
    await sequelize.close();
  });

  test("/", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
  });

  // test("/users", async () => {
  //   const res = await request(app).post("/api/users").send({
  //     emailAddress: "test@test.com",
  //     username: "test",
  //     passwordHash: "password",
  //   });
  //   expect(res.status).toBe(201);
  //   console.log(res.body);
  // });
});
