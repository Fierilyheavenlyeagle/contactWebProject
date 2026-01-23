import { Router } from 'express';
import contactsController from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', contactsController.getAll);

router.get('/contacts/:id', contactsController.getSingle);

router.post('/contacts', contactsController.createContact);

router.put('/contacts/:id', contactsController.updateContact);

router.delete('/contacts/:id', contactsController.deleteContact);


export default router;  