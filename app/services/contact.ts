import { Contact } from '@prisma/client';
import database from '../../database';

interface CreateContact {
  first: Contact['first'];
  last: Contact['last'];
  email: Contact['email'];
}

interface UpdateContact {
  first: Contact['first'];
  last: Contact['last'];
  email: Contact['email'];
}

const list = () => database.contact.findMany();

const create = (contact: CreateContact) => database.contact.create({ data: contact });

const update = (id: number, contact: UpdateContact) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  database.contact.update({ where: { id }, data: contact });

const retrieve = (id: number) => database.contact.findUnique({ where: { id } });

const remove = (id: number) => database.contact.delete({ where: { id } });

const contactService = {
  list,
  create,
  update,
  retrieve,
  remove,
};
export default contactService;
