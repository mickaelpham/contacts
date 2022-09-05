import supertest from "supertest";
import app from "../../../app";
import { databaseMock } from "../../database-mock";

const api = supertest(app);

describe("GET /api/contact", () => {
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
});
