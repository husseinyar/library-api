import request from "supertest";
import express from "express";
import apiRoutes from "../src/routes/api";

// Setup testserver
const app = express();
app.use(express.json());
app.use(apiRoutes);

describe("Library API", () => {
  it("GET /v1/books should return list of books", async () => {
    const res = await request(app).get("/v1/books");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("isbn");
    expect(res.body[0]).toHaveProperty("availableCopies");
  });

  it("GET /v1/books/:bookId should return a specific book", async () => {
    const res = await request(app).get("/v1/books/978-0452284234");
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("1984");
  });

  it("POST /v1/books/:bookId/rent should rent a book", async () => {
    const res = await request(app)
      .post("/v1/books/978-0452284234/rent")
      .send({ userId: "test-user" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("rentalId");
  });
});

let rentalId: string;

it("should rent a book and then return it", async () => {
  // Steg 1: Låna boken
  const rentRes = await request(app)
    .post("/v1/books/978-0452284234/rent")
    .send({ userId: "test-user" });
  
  expect(rentRes.statusCode).toBe(201);
  expect(rentRes.body).toHaveProperty("rentalId");

  rentalId = rentRes.body.rentalId;

  // Steg 2: Returnera boken
  const returnRes = await request(app)
    .post(`/v1/rentals/${rentalId}/return`);
  
  expect(returnRes.statusCode).toBe(200);
});

it("should not allow returning the same book twice", async () => {
  const res = await request(app)
    .post(`/v1/rentals/${rentalId}/return`);
  
  expect(res.statusCode).toBe(400);
});