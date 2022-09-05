import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import database from "../database";

jest.mock("../database", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(databaseMock);
});

export const databaseMock = database as unknown as DeepMockProxy<PrismaClient>;
