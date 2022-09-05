import { faker } from "@faker-js/faker";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import supertest from "supertest";
import app from "../../../app";
import { databaseMock } from "../../database-mock";

const api = supertest(app);

describe("GET /api/contacts", () => {
  describe("without any contacts", () => {
    beforeEach(() => {
      databaseMock.contact.findMany.mockResolvedValue([]);
    });

    it("returns an empty array", async () => {
      const response = await api
        .get("/api/contacts")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.contacts.length).toEqual(0);
    });
  });

  describe("with existing contacts", () => {
    const customers = [
      {
        id: 1,
        first: faker.name.firstName(),
        last: faker.name.lastName(),
        email: faker.internet.email(),
      },
      {
        id: 2,
        first: faker.name.firstName(),
        last: faker.name.lastName(),
        email: faker.internet.email(),
      },
      {
        id: 3,
        first: faker.name.firstName(),
        last: faker.name.lastName(),
        email: faker.internet.email(),
      },
    ];

    beforeEach(() => {
      databaseMock.contact.findMany.mockResolvedValue(customers);
    });

    it("returns all contacts", async () => {
      const response = await api
        .get("/api/contacts")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      customers.forEach((customer) =>
        expect(response.body.contacts).toContainEqual(customer)
      );
    });
  });
});

describe("POST /api/contacts", () => {
  it("creates a new contact when valid", async () => {
    const contactObject = {
      first: faker.name.firstName(),
      last: faker.name.lastName(),
      email: faker.internet.email(),
    };

    databaseMock.contact.create.mockResolvedValue({ ...contactObject, id: 1 });

    const response = await api
      .post("/api/contacts")
      .send(contactObject)
      .expect(201)
      .expect("content-type", /application\/json/);

    expect(response.body).toMatchObject({ ...contactObject, id: 1 });
  });
});

describe("DELETE /api/contacts/:id", () => {
  const RANDOM_ID_RANGE = 1_000;

  it("deletes the contacts when present", async () => {
    const contactToDelete = {
      id: Math.floor(Math.random() * RANDOM_ID_RANGE),
      first: faker.name.firstName(),
      last: faker.name.lastName(),
      email: faker.internet.email(),
    };

    databaseMock.contact.delete.mockResolvedValue(contactToDelete);

    await api.delete(`/api/contacts/${contactToDelete.id}`).expect(204);
  });

  it("returns 204 no content even if nothing was deleted", async () => {
    databaseMock.contact.delete.mockRejectedValue(
      new PrismaClientKnownRequestError(
        "contact not found",
        "prisma-code",
        "prisma-client-version"
      )
    );

    await api
      .delete(`/api/contacts/${Math.floor(Math.random() * RANDOM_ID_RANGE)}`)
      .expect(204);
  });
});
