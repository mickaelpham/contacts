import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime';
import express from 'express';
import contactService from '../services/contact';

const contactsRouter = express.Router();

contactsRouter.post('/', async (req, res, next) => {
  const { first, last, email } = req.body;

  try {
    const savedContact = await contactService.create({ first, last, email });
    res.status(201).json(savedContact);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(400).json({ error: error.code });
      return;
    }

    next(error);
  }
});

contactsRouter.get('/', async (_req, res, next) => {
  try {
    const contacts = await contactService.list();
    res.json({ contacts });
  } catch (error) {
    next(error);
  }
});

contactsRouter.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const contact = await contactService.retrieve(id);

    if (!contact) {
      res.status(404).json({ error: 'contact not found' });
      return;
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

contactsRouter.put('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  const { first, last, email } = req.body;

  try {
    const updatedContact = await contactService.update(id, {
      first,
      last,
      email,
    });

    res.json(updatedContact);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(400).json({ error: error.code });
      return;
    }

    if (error instanceof PrismaClientValidationError) {
      res.status(400).json({ error: 'invalid contact payload, fields cannot be null' });
      return;
    }

    next(error);
  }
});

contactsRouter.delete('/:id', async (req, res, next) => {
  const id = Number(req.params.id);

  try {
    await contactService.remove(id);
    res.sendStatus(204);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.sendStatus(204);
      return;
    }

    next(error);
  }
});

export default contactsRouter;
