import { faker } from '@faker-js/faker';
import contactService from '../../../app/services/contact';
import databaseMock from '../../database-mock';

test('create new contact', async () => {
  const contactObject = {
    first: faker.name.firstName(),
    last: faker.name.lastName(),
    email: faker.internet.email(),
  };

  databaseMock.contact.create.mockResolvedValue({ ...contactObject, id: 1 });

  await expect(contactService.create(contactObject)).resolves.toMatchObject({
    ...contactObject,
    id: 1,
  });
});

test('update a contact email', async () => {
  const contactObject = {
    first: faker.name.firstName(),
    last: faker.name.lastName(),
    email: faker.internet.email(),
  };

  databaseMock.contact.update.mockResolvedValue({ ...contactObject, id: 1 });

  await expect(contactService.update(1, contactObject)).resolves.toMatchObject({
    ...contactObject,
    id: 1,
  });
});

test('delete fails if contact does not exist', async () => {
  databaseMock.contact.delete.mockRejectedValue(new Error('contact does not exist'));

  await expect(contactService.remove(1)).rejects.toEqual(new Error('contact does not exist'));
});
