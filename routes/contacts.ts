import express from "express";
import contactService from "../services/contact";

const contactsRouter = express.Router();

contactsRouter.post("/", async (req, res, next) => {
  const { first, last, email } = req.body;

  try {
    const savedContact = await contactService.create({ first, last, email });
    res.status(201).json(savedContact);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/", async (_req, res, next) => {
  try {
    const contacts = await contactService.list();
    res.json({ contacts });
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:id", async (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const contact = await contactService.retrieve(id);
    if (!contact) {
      return res.status(404).json({ error: "contact not found" });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

contactsRouter.put("/:id", async (req, res, next) => {
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
    next(error);
  }
});

contactsRouter.delete("/:id", async (req, res, next) => {
  const id = Number(req.params.id);

  try {
    await contactService.remove(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default contactsRouter;
