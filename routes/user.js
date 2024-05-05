const express = require('express');

const app = express();
const router = express.Router();
const cors = require('cors');
const { addContact, getContacts, getContact, updateContact, deleteContact } = require('../controllers/userController');
const { auth } = require('../middleware/authentication');


app.use(cors());

router.post('/create-contact', auth, addContact);

router.get('/get-all-contacts', auth, getContacts);

router.get('/get-contact/:contactId', auth, getContact);

router.put('/update-contact', auth, updateContact);

router.delete('/delete-contact/:contactId', auth, deleteContact);




module.exports = router;

