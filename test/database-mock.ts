import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import database from '../app/database';

jest.mock('../app/database', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

const databaseMock = database as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(databaseMock);
});

export default databaseMock;
