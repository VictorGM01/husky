import request from "supertest";
import app from "../index";

describe("Temperature Conversion API", () => {
  describe("GET /", () => {
    test("should return welcome message", async () => {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
      expect(response.text).toBe("Temperature Conversion API");
    });
  });

  describe("GET /api/convert/ftoc/:temp", () => {
    test("should convert 32°F to 0°C", async () => {
      const response = await request(app).get("/api/convert/ftoc/32");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        fahrenheit: 32,
        celsius: 0,
        message: "32°F is equal to 0°C",
      });
    });

    test("should return 400 for invalid input", async () => {
      const response = await request(app).get("/api/convert/ftoc/invalid");
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("GET /api/convert/ctof/:temp", () => {
    test("should convert 100°C to 212°F", async () => {
      const response = await request(app).get("/api/convert/ctof/100");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        celsius: 100,
        fahrenheit: 212,
        message: "100°C is equal to 212°F",
      });
    });

    test("should return 400 for invalid input", async () => {
      const response = await request(app).get("/api/convert/ctof/invalid");
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });
});
